(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f5127b8"],{"45f9":function(t,e,a){"use strict";var n=a("6c92"),l=a.n(n);l.a},"6c92":function(t,e,a){},9275:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{directives:[{name:"loadmore",rawName:"v-loadmore",value:t.handelLoadmore,expression:"handelLoadmore"}],staticStyle:{width:"100%"},attrs:{border:"",data:t.filteredData,height:"300","data-size":t.tableData.length}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{label:"日期",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.date))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"日期",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.date))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"日期",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.date))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"日期",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.date))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"姓名",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[t._v("姓名: "+t._s(e.row.name))]),t._v(" "),a("p",[t._v("住址: "+t._s(e.row.address))]),t._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.name))])],1)])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])],1)]}}])})],1)],1)},l=[],r={name:"test",components:{},data:function(){return{tableData:[],currentStartIndex:0,currentEndIndex:20}},created:function(){this.getTableData()},computed:{filteredData:function(){var t=this;return this.tableData.filter(function(e,a){return!(a<t.currentStartIndex)&&!(a>t.currentEndIndex)})}},methods:{handleEdit:function(){console.log("dfdfg")},handelLoadmore:function(t,e){this.currentStartIndex=t,this.currentEndIndex=e},getTableData:function(){var t=this,e=0,a=[];while(e<3e4){e+=1;var n={date:e,name:"王小虎"+e,address:"上海市普陀区金沙江路 cont 弄"};a.push(n)}setTimeout(function(){t.tableData=a},2e3)}},watch:{}},i=r,s=(a("45f9"),a("2877")),o=Object(s["a"])(i,n,l,!1,null,"1c8ecf76",null);e["default"]=o.exports}}]);