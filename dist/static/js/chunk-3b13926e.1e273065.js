(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b13926e"],{"021f":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content_show"},[a("div",{staticClass:"tab_wrap"},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"全部",name:"0"}},[a("div",{staticClass:"table_wrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData.slice((e.currpage-1)*e.pageSize,e.currpage*e.pageSize),border:"","cell-style":{"text-align":"center","font-size":" 15px"},"header-cell-style":{"background-color":"#409eff",color:" #fff","border-bottom":"1px solid #fff","text-align":"center"}}},[a("el-table-column",{attrs:{prop:"ID",label:"序号",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FILENO",label:"文号",width:"400"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FILENAME",label:" 文件列表",width:"480"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{color:"rgb(0, 122, 217)","font-weight":"500","font-size":"15px",cursor:"pointer"}},[e._v(e._s(t.row.FILENAME))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.FILENAME?a("div",[a("el-button",{attrs:{type:"text",size:"middle"},on:{click:function(a){return e.handleUpDownClick(t.row)}}},[e._v("选择下载")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"middle"},on:{click:function(a){return e.handleDeleteClick(t.row)}}},[e._v("删除")])],1):e._e(),e._v(" "),t.row.FILENAME?e._e():a("div",[a("el-button",{attrs:{type:"text",size:"middle"},on:{click:function(a){return e.handleUploadClick(t.row)}}},[e._v("上传")])],1)]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination_wrap",staticStyle:{"margin-top":"2rem"}},[a("el-pagination",{attrs:{"current-page":0,total:e.tableData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"已上传",name:"1"}},[a("div",{staticClass:"table_wrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData1.slice((e.currpage1-1)*e.pageSize1,e.currpage1*e.pageSize1),border:"","cell-style":{"text-align":"center","font-size":" 15px"},"header-cell-style":{"background-color":"#409eff",color:" #fff","border-bottom":"1px solid #fff","text-align":"center"}}},[a("el-table-column",{attrs:{prop:"ID",label:"序号",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FILENO",label:"文号",width:"400"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FILENAME",label:" 文件列表",width:"480"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{color:"rgb(0, 122, 217)","font-weight":"500","font-size":"15px",cursor:"pointer"}},[e._v(e._s(t.row.FILENAME))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-button",{attrs:{type:"text",size:"middle"},on:{click:function(a){return e.handleUpDownClick(t.row)}}},[e._v("选择下载")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"middle"},on:{click:function(a){return e.handleDeleteClick(t.row)}}},[e._v("删除")])],1)]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination_wrap",staticStyle:{"margin-top":"2rem"}},[a("el-pagination",{attrs:{"current-page":0,total:e.tableData1.length},on:{"size-change":e.handleSizeChange1,"current-change":e.handleCurrentChange1}})],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"未上传",name:"2"}},[a("div",{staticClass:"table_wrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData2.slice((e.currpage2-1)*e.pageSize2,e.currpage2*e.pageSize2),border:"","cell-style":{"text-align":"center","font-size":" 15px"},"header-cell-style":{"background-color":"#409eff",color:" #fff","border-bottom":"1px solid #fff","text-align":"center"}}},[a("el-table-column",{attrs:{prop:"ID",label:"序号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FILENO",label:"文号",width:"300"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:" 文件列表",width:"300"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"400"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"middle"},on:{click:function(a){return e.handleUploadClick(t.row)}}},[e._v("上传")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination_wrap",staticStyle:{"margin-top":"2rem"}},[a("el-pagination",{attrs:{"current-page":0,total:e.tableData2.length},on:{"size-change":e.handleSizeChange2,"current-change":e.handleCurrentChange2}})],1)])],1),e._v(" "),a("div",{staticStyle:{position:"absolute",top:"-5px",right:"0px"}},[a("el-date-picker",{staticStyle:{width:"150px"},attrs:{type:"year",placeholder:"选择年","value-format":"yyyy"},on:{change:e.changeYear},model:{value:e.year,callback:function(t){e.year=t},expression:"year"}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"选择上传的文件",visible:e.dialogVisible,"before-close":e.clearBack,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"123","http-request":e.uploadSectionFile,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,limit:10,"on-exceed":e.handleExceed,"auto-upload":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[a("i",{staticClass:"el-icon-upload el-icon--right"}),e._v("选取文件\n          ")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("一次性只能上传10个文件,只能上传.doc,.docx,.xls,.xlsx")])],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",loading:e.loadingFlag},on:{click:e.submitUpload}},[e._v("确认上传")]),e._v(" "),a("el-button",{on:{click:e.clearBack}},[e._v("返回")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"下载列表",visible:e.dialogVisible2,width:"30%"},on:{"update:visible":function(t){e.dialogVisible2=t}}},[a("div",[a("span",[e._v("文件列表:")]),e._v(" "),a("div",[a("el-select",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{placeholder:"请选择"},model:{value:e.fileList1,callback:function(t){e.fileList1=t},expression:"fileList1"}},e._l(e.options,function(e){return a("el-option",{key:e.PNO,attrs:{label:e.FILENAME,value:e.PNO}})}),1)],1)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible2=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.makeSure()}}},[e._v("确 定")])],1)])],1)},n=[],l=(a("7f7f"),a("28a5"),a("7514"),a("b775"));function o(e){return Object(l["a"])({url:"fileno/getList",method:"post",data:e})}function r(e){return Object(l["a"])({url:"/fileno/xz/getFile",method:"post",data:e})}function c(e){return Object(l["a"])({url:"/fileno/down1",method:"post",data:e,responseType:"blob"})}function s(e){return Object(l["a"])({url:"/fileno/deletefile",method:"post",data:e})}var u=a("bc3a"),d=a.n(u),p=a("5c96"),f={data:function(){return{activeName:"0",year:"2019",tableData:[],tableData2:[],tableData1:[],loading:!1,currpage:1,pageSize:10,currpage2:1,pageSize2:10,currpage1:1,pageSize1:10,dialogVisible:!1,dialogVisible2:!1,fileNo:"",fileList:[],fileList1:"",options:[],loadingFlag:!1}},methods:{changeYear:function(){this.getDataSource(this.year,this.activeName)},clearBack:function(){this.dialogVisible=!1,this.$refs.upload.clearFiles(),this.getDataSource(this.year,this.activeName)},handleDeleteClick:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s({FILENO:e.FILENO}).then(function(e){t.getDataSource(t.year,t.activeName)})}).catch(function(){})},handleUpDownClick:function(e){var t=this;r({FILENO:e.FILENO}).then(function(e){t.dialogVisible2=!0,t.options=e.dataList})},makeSure:function(){var e=this;this.dialogVisible2=!1,""==this.fileList1?Object(p["Message"])({message:"请选择文件列表",type:"error"}):c({PNO:this.fileList1}).then(function(t){console.log(t);var a=e.options.find(function(t){if(t.PNO==e.fileList1)return t}),i="",n=a.FILENAME.split(".")[1],l=a.FILENAME.split(".")[0];i="application/msword;charset=UTF-8",console.log(i);var o=new Blob([t],{type:i}),r=document.createElement("a"),c=window.URL.createObjectURL(o);r.href=c,r.download="".concat(l,".").concat(n),document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(c)}).catch(function(e){})},handleUploadClick:function(e){this.dialogVisible=!0,this.fileNo=e.FILENO},handleExceed:function(e,t){this.$message.warning("当前限制选择 10 个文件；")},submitUpload:function(){this.$refs.upload.submit()},uploadSectionFile:function(e){var t=this;this.loadingFlag=!0;var a=e.file,i=(a.type,a.size),n=a.name.lastIndexOf("."),l=(a.name.substring(0,n),a.name.substring(n+1),i/1024/1024<2);if(l){var o=new FormData;o.append("upfile",a),o.append("OPERATOR","lixiaowei"),o.append("FILENO",this.fileNo);var r={headers:{"Content-Type":"multipart/form-data"}};d.a.request({url:"".concat("/prod-api","/fileno/uplode"),method:"post",data:o,config:r,onUploadProgress:function(t){var a=t.loaded/t.total*100|0;e.onProgress({percent:a})}}).then(function(a){setTimeout(function(){e.onSuccess(),t.loadingFlag=!1},3e3),console.log("上传成功")}).catch(function(a){console.log("上传失败"),e.onError(),t.loadingFlag=!1})}else this.$message.error("只能上传文件大小小于2M")},handleRemove:function(e,t){console.log(e,t)},handlePreview:function(e){console.log(e)},handleSizeChange2:function(e){console.log("每页 ".concat(e," 条")),this.pageSize2=e},handleCurrentChange2:function(e){console.log("当前页: ".concat(e)),this.currpage2=e},handleSizeChange1:function(e){console.log("每页 ".concat(e," 条")),this.pageSize1=e},handleCurrentChange1:function(e){console.log("当前页: ".concat(e)),this.currpage1=e},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.pageSize=e},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.currpage=e},handleClick:function(e,t){console.log(e.name),e.name==this.activeName&&this.getDataSource(this.year,e.name)},getDataSource:function(e,t){var a=this;this.loading=!0,console.log(e),o({IYEAR:e,STATUS:t}).then(function(e){e&&("2"==t?a.tableData2=e.dataList:"1"==t?a.tableData1=e.dataList:"0"==t&&(a.tableData=e.dataList),setTimeout(function(){a.loading=!1},1e3))})}},created:function(){this.getDataSource(this.year,this.activeName)}},g=f,h=(a("7e89"),a("2877")),v=Object(h["a"])(g,i,n,!1,null,null,null);t["default"]=v.exports},"28a5":function(e,t,a){"use strict";var i=a("aae3"),n=a("cb7c"),l=a("ebd6"),o=a("0390"),r=a("9def"),c=a("5f1b"),s=a("520a"),u=a("79e5"),d=Math.min,p=[].push,f="split",g="length",h="lastIndex",v=4294967295,b=!u(function(){RegExp(v,"y")});a("214f")("split",2,function(e,t,a,u){var m;return m="c"=="abbc"[f](/(b)*/)[1]||4!="test"[f](/(?:)/,-1)[g]||2!="ab"[f](/(?:ab)*/)[g]||4!="."[f](/(.?)(.?)/)[g]||"."[f](/()()/)[g]>1||""[f](/.?/)[g]?function(e,t){var n=String(this);if(void 0===e&&0===t)return[];if(!i(e))return a.call(n,e,t);var l,o,r,c=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,f=void 0===t?v:t>>>0,b=new RegExp(e.source,u+"g");while(l=s.call(b,n)){if(o=b[h],o>d&&(c.push(n.slice(d,l.index)),l[g]>1&&l.index<n[g]&&p.apply(c,l.slice(1)),r=l[0][g],d=o,c[g]>=f))break;b[h]===l.index&&b[h]++}return d===n[g]?!r&&b.test("")||c.push(""):c.push(n.slice(d)),c[g]>f?c.slice(0,f):c}:"0"[f](void 0,0)[g]?function(e,t){return void 0===e&&0===t?[]:a.call(this,e,t)}:a,[function(a,i){var n=e(this),l=void 0==a?void 0:a[t];return void 0!==l?l.call(a,n,i):m.call(String(n),a,i)},function(e,t){var i=u(m,e,this,t,m!==a);if(i.done)return i.value;var s=n(e),p=String(this),f=l(s,RegExp),g=s.unicode,h=(s.ignoreCase?"i":"")+(s.multiline?"m":"")+(s.unicode?"u":"")+(b?"y":"g"),w=new f(b?s:"^(?:"+s.source+")",h),y=void 0===t?v:t>>>0;if(0===y)return[];if(0===p.length)return null===c(w,p)?[p]:[];var _=0,x=0,S=[];while(x<p.length){w.lastIndex=b?x:0;var k,C=c(w,b?p:p.slice(x));if(null===C||(k=d(r(w.lastIndex+(b?0:x)),p.length))===_)x=o(p,x,g);else{if(S.push(p.slice(_,x)),S.length===y)return S;for(var E=1;E<=C.length-1;E++)if(S.push(C[E]),S.length===y)return S;x=_=k}}return S.push(p.slice(_)),S}]})},4586:function(e,t,a){},7514:function(e,t,a){"use strict";var i=a("5ca1"),n=a("0a49")(5),l="find",o=!0;l in[]&&Array(1)[l](function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(l)},"7e89":function(e,t,a){"use strict";var i=a("4586"),n=a.n(i);n.a}}]);