webpackJsonp([1],{"7/0V":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("VCXJ"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var n=a("Mw9A")({name:"app"},s,!1,function(e){a("e22J")},null,null).exports,r=a("zO6J"),l={data:function(){var e=[{key:"bjx",val:"北京西"},{key:"jnx",val:"济南西"},{key:"njx",val:"南京西"},{key:"shhq",val:"上海虹桥"}],t=108;return{defualtTicket:t,remainder:t,salesHeader:[{title:"出发站",key:"leave",width:70,render:function(t,a){var i=e.findIndex(function(e,t,i){if(e.key==a.row.leave)return t>-1});return e[i].val}},{title:"到达站",key:"arrive",width:70,render:function(t,a){var i=e.findIndex(function(e,t,i){if(e.key==a.row.arrive)return t>-1});return e[i].val}},{title:"人次",key:"numSheets",width:40}],sales:[],stoNames:e,arriveStoNames:[],leave:"",arrive:"",numSheets:"",ttsHeader:[{title:"站名",key:"stoName",width:80},{title:"出发(次)",key:"leave",width:50},{title:"到达(次)",key:"arrive",width:50}],ttsData:[{stoName:"北京西",leave:0,arrive:0},{stoName:"济南西",leave:0,arrive:0},{stoName:"南京西",leave:0,arrive:0},{stoName:"上海虹桥",leave:0,arrive:0}],sheetsHeader:[{title:"站名",key:"stoName",width:80},{title:"总票",key:"totalTicket",width:50},{title:"余票",key:"ticket",width:50}],sheetsData:[{stoName:"北京西",totalTicket:"",ticket:""},{stoName:"济南西",totalTicket:t,ticket:t},{stoName:"南京西",totalTicket:t,ticket:t},{stoName:"上海虹桥",totalTicket:t,ticket:t}]}},watch:{leave:function(e){var t=this.stoNames.findIndex(function(t,a,i){if(t.key==e)return a>-1});this.arriveStoNames=this.stoNames.slice(t+1)}},methods:{getIndexByInitials:function(e){return this.stoNames.findIndex(function(t,a,i){if(t.key==e)return a>-1})},calcLeaveOrPassing:function(e){var t=this;return this.sales.filter(function(a){var i=t.getIndexByInitials(a.leave),s=t.getIndexByInitials(a.arrive);return e>i&&!(e>s)}).reduce(function(e,t){return e+Number(t.numSheets)},0)},handlerTicket:function(){var e=this;if(0!=this.remainder)if(""!=this.leave)if(""!=this.arrive)if(""!=this.numSheets){var t=this.getIndexByInitials(this.leave);this.ttsData[t].leave+=Number(this.numSheets);var a=this.getIndexByInitials(this.arrive);this.ttsData[a].arrive+=Number(this.numSheets),this.sales.push({leave:this.leave,arrive:this.arrive,numSheets:this.numSheets}),this.sheetsData.forEach(function(t,a){t.ticket=e.defualtTicket-e.calcLeaveOrPassing(a)});var i=this.getIndexByInitials(this.arrive);this.remainder=this.sheetsData[i].ticket,this.numSheets=this.numSheets>this.remainder?this.remainder:this.numSheets}else this.$Message.info("输入购票数量");else this.$Message.info("请选择到达站");else this.$Message.info("请选择出发站");else this.$Message.info("当前车次您选择的行程票已售完,<br/>请选择其他车次或其他交通方式!")}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",[a("div",{staticClass:"tTitle"},[e._v("G7")]),e._v(" "),a("Table",{attrs:{width:"181",border:!0,columns:e.ttsHeader,data:e.ttsData}}),e._v(" "),a("div",{staticClass:"tTitle"},[e._v("\n      余票\n    ")]),e._v(" "),a("Table",{attrs:{width:"181",border:!0,columns:e.sheetsHeader,data:e.sheetsData}})],1),e._v(" "),a("div",[a("div",{staticClass:"ticket"},[a("Select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择出发站"},model:{value:e.leave,callback:function(t){e.leave=t},expression:"leave"}},e._l(e.stoNames,function(t,i){return a("Option",{key:i,attrs:{disabled:i==e.stoNames.length-1,value:t.key}},[e._v(e._s(t.val))])})),e._v(" "),a("span",{staticClass:"center"},[e._v("--\x3e")]),e._v(" "),a("Select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择到达站"},model:{value:e.arrive,callback:function(t){e.arrive=t},expression:"arrive"}},e._l(e.arriveStoNames,function(t,i){return a("Option",{key:i,attrs:{value:t.key}},[e._v(e._s(t.val))])})),e._v(" "),a("div",{staticClass:"num-sheets ivu-input-wrapper ivu-input-type",staticStyle:{width:"60px"},attrs:{min:"1",max:"108"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.numSheets,expression:"numSheets"}],staticClass:"ivu-input",attrs:{autocomplete:"off",spellcheck:"false",type:"Number",min:"1",max:e.remainder,placeholder:"张数"},domProps:{value:e.numSheets},on:{input:function(t){t.target.composing||(e.numSheets=t.target.value)}}})]),e._v(" "),a("Button",{on:{click:e.handlerTicket}},[e._v("买票")])],1),e._v(" "),a("div",{staticClass:"sale-list"},[a("Table",{attrs:{width:"181",border:!0,columns:e.salesHeader,data:e.sales}})],1)])])},staticRenderFns:[]};var v=a("Mw9A")(l,u,!1,function(e){a("aYql")},null,null).exports;i.default.use(r.a);var o=new r.a({routes:[{path:"/",name:"Index",component:v}]}),c=a("S0kX"),h=a.n(c);a("7/0V");i.default.use(h.a),i.default.config.productionTip=!1,new i.default({el:"#app",router:o,template:"<App/>",components:{App:n}})},aYql:function(e,t){},e22J:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.f56c58c752d9d17f333e.js.map