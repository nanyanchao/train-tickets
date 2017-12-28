<template>
  <div class="page">
    <div>
      <div class="tTitle">G7</div>
      <Table  width="181" :border="true" :columns="ttsHeader" :data="ttsData"></Table>
      <div class="tTitle">
        余票
      </div>
      <Table width ="181" :border="true" :columns="sheetsHeader" :data="sheetsData"></Table>
    </div>
    <div>
      <div class="ticket">
        <Select placeholder="请选择出发站" v-model="leave" style="width:120px">
            <Option v-for="(item,index) in stoNames" :disabled="index == stoNames.length -1" :value="item.key" :key="index">{{ item.val }}</Option>
        </Select>
        <span class="center">--></span>
        <Select placeholder="请选择到达站" v-model="arrive" style="width:120px">
            <Option v-for="(item,index) in arriveStoNames" :value="item.key" :key="index">{{ item.val }}</Option>
        </Select>
        <div class="num-sheets ivu-input-wrapper ivu-input-type" min="1" max="108" style="width: 60px;">
          <input autocomplete="off" spellcheck="false" type="Number" min="1" :max="remainder" placeholder="张数" v-model="numSheets" class="ivu-input">
        </div>
        <Button @click="handlerTicket">买票</Button>
      </div>
      <div class="sale-list">
        <Table width ="181" :border="true" :columns="salesHeader" :data="sales"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    //G7列车所进过站
    let stoList = [
      { key: "bjx", val: "北京西" },
      { key: "jnx", val: "济南西" },
      { key: "njx", val: "南京西" },
      { key: "shhq", val: "上海虹桥" }
    ];
    //默认值设置
    let defaultObj = {
      ticket: 108 //最多可售车票
    };
    return {
      //设置默认值最多售车票
      defualtTicket: defaultObj.ticket,
      //当前最多可售票
      remainder: defaultObj.ticket,
      //已售车票头信息
      salesHeader: [
        {
          title: "出发站",
          key: "leave",
          width: 70,
          render(h, params) {
            let valIndex = stoList.findIndex(function(value, index, arr) {
              if (value.key == params.row.leave) {
                return index > -1;
              }
            });
            return stoList[valIndex].val;
          }
        },
        {
          title: "到达站",
          key: "arrive",
          width: 70,
          render(h, params) {
            let valIndex = stoList.findIndex(function(value, index, arr) {
              if (value.key == params.row.arrive) {
                return index > -1;
              }
            });
            return stoList[valIndex].val;
          }
        },
        {
          title: "人次",
          key: "numSheets",
          width: 40
        }
      ],
      //存储已售车票信息
      sales: [],
      //可选出发站列表
      stoNames: stoList,
      //可选到达站列表
      arriveStoNames: [],
      //出发站
      leave: "",
      //到达站
      arrive: "",
      //购买张数
      numSheets: "",
      //已售车票统计头信息
      ttsHeader: [
        {
          title: "站名",
          key: "stoName",
          width: 80
        },
        {
          title: "出发(次)",
          key: "leave",
          width: 50
        },
        {
          title: "到达(次)",
          key: "arrive",
          width: 50
        }
      ],
      //已售车票统计
      ttsData: [
        {
          stoName: "北京西",
          leave: 0,
          arrive: 0
        },
        {
          stoName: "济南西",
          leave: 0,
          arrive: 0
        },
        {
          stoName: "南京西",
          leave: 0,
          arrive: 0
        },
        {
          stoName: "上海虹桥",
          leave: 0,
          arrive: 0
        }
      ],
      //余票统计头部信息
      sheetsHeader: [
        {
          title: "站名",
          key: "stoName",
          width: 80
        },
        {
          title: "总票",
          key: "totalTicket",
          width: 50
        },
        {
          title: "余票",
          key: "ticket",
          width: 50
        }
      ],
      //余票统计信息
      sheetsData: [
        {
          stoName: "北京西",
          totalTicket: "",
          ticket: ""
        },
        {
          stoName: "济南西",
          totalTicket: defaultObj.ticket,
          ticket: defaultObj.ticket
        },
        {
          stoName: "南京西",
          totalTicket: defaultObj.ticket,
          ticket: defaultObj.ticket
        },
        {
          stoName: "上海虹桥",
          totalTicket: defaultObj.ticket,
          ticket: defaultObj.ticket
        }
      ]
    };
  },
  watch: {
    //出发站更改后调整对应的到达站
    leave(val) {
      let valIndex = this.stoNames.findIndex(function(value, index, arr) {
        if (value.key == val) {
          return index > -1;
        }
      });
      this.arriveStoNames = this.stoNames.slice(valIndex + 1);
    }
  },
  methods: {
    //根据首字母获取站点在本线路中的坐标
    getIndexByInitials(val) {
      return this.stoNames.findIndex((value, index, arr) => {
        if (value.key == val) {
          return index > -1;
        }
      });
    },
    //计算当到达前站和路过当前站车次
    calcLeaveOrPassing(index) {
      return (
        this.sales
          //获取到达站和过路站是当前站点的订单
          .filter(item => {
            let lIndex = this.getIndexByInitials(item.leave);
            let aIndex = this.getIndexByInitials(item.arrive);
            return index > lIndex && !(index > aIndex);
          })
          //统计订单的票数
          .reduce((acc, cur) => {
            return acc + Number(cur.numSheets);
          }, 0)
      );
    },
    handlerTicket() {
      if (this.remainder == 0) {
        this.$Message.info("当前车次您选择的行程票已售完,<br/>请选择其他车次或其他交通方式!");
        return;
      }
      if (this.leave == "") {
        this.$Message.info("请选择出发站");
        return;
      }
      if (this.arrive == "") {
        this.$Message.info("请选择到达站");
        return;
      }
      if (this.numSheets == "") {
        this.$Message.info("输入购票数量");
        return;
      }

      //获取本次出发站在本线路中的坐标
      let leaveIndex = this.getIndexByInitials(this.leave);
      //出发站统计
      this.ttsData[leaveIndex].leave += Number(this.numSheets);

      //获取本次到达站在本线路中的坐标
      let arriveIndex = this.getIndexByInitials(this.arrive);
      //到达站统计
      this.ttsData[arriveIndex].arrive += Number(this.numSheets);

      //添加本次购买记录
      this.sales.push({
        leave: this.leave,
        arrive: this.arrive,
        numSheets: this.numSheets
      });

      //计算剩余票数
      this.sheetsData.forEach((item, index) => {
        item.ticket = this.defualtTicket - this.calcLeaveOrPassing(index);
      });

      //计算最多还可出售票数
      let index = this.getIndexByInitials(this.arrive);
      this.remainder = this.sheetsData[index].ticket;
      this.numSheets =
        this.numSheets > this.remainder ? this.remainder : this.numSheets;
    }
  }
};
</script>

<style>
.center {
  display: flex;
  align-items: center;
}
.ivu-table-header th {
  height: 20px;
}
.ivu-table-row td {
  height: 20px;
}
.ivu-table-cell {
  padding: 0;
  font-size: 9px;
}
.page {
  display: flex;
  font-size: 9px;
  margin: 20px;
}
.tTitle {
  font-size: 13px;
}
.ticket {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
}
.sale-list {
  margin-left: 20px;
  margin-top: 20px;
}
.num-sheets {
  margin: 0 10px;
}
</style>


