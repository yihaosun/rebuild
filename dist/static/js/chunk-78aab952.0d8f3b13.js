(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78aab952"],{"9ed6":function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{attrs:{id:"zjzw_guide_wrap"}},[s("div",{staticClass:"show_wrap"},[e._m(0),e._v(" "),s("el-form",{ref:"loginForm",staticClass:"login-box",attrs:{model:e.form,rules:e.rules,"label-width":"60px"}},[s("h3",{staticClass:"login-title"},[e._v("欢迎登录")]),e._v(" "),s("el-form-item",{attrs:{label:"账号",prop:"username"}},[s("el-input",{staticStyle:{width:"90%"},attrs:{type:"text",placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password"}},[s("el-input",{staticStyle:{width:"90%"},attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),s("div",{staticClass:"do_wrap"},[s("div",{staticClass:"box1 clearfix"},[s("span",{staticClass:"lf",staticStyle:{cursor:"pointer",color:"#f19149","font-size":"0.75rem","margin-left":"20px"}},[e._v("忘记密码？")]),e._v(" "),s("div",{staticClass:"rt",staticStyle:{"text-align":"right"}},[s("el-checkbox",{staticStyle:{color:"#a0a0a0"},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("一周内自动登录")])],1)])]),e._v(" "),s("el-button",{staticStyle:{width:"90%","margin-left":"10px"},attrs:{type:"primary",loading:e.isFlag},on:{click:function(t){return e.onSubmit("loginForm")}}},[e._v("登录")])],1),e._v(" "),s("el-dialog",{attrs:{title:"温馨提示",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("span",[e._v("请输入账号和密码")]),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1),e._v(" "),s("div",{staticClass:"footer_content"},[e._v("\n       版权所有 ©2014-2019 艾迪软件\n    ")])])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"show_title"},[s("span",{staticClass:"word"},[e._v("\n          柯桥区基层财政管理一体化平台\n        ")])])}],i=s("c24f"),n=s("5118"),r=s("8237"),l=s.n(r),c={data:function(){return{isFlag:!1,dialogVisible:!1,checked:"",form:{username:"",password:""},rules:{username:[{required:!0,message:"账号不可为空",trigger:"blur"}],password:[{required:!0,message:"密码不可为空",trigger:"blur"}]}}},methods:{setToken:function(e,t){localStorage.setItem(e,t)},onSubmit:function(e){var t=this;this.isFlag=!0;var s=l()(this.form.password);Object(i["a"])({CUSERNAME:this.form.username,CPASSWORD:s}).then(function(e){if(e.code){var s=e.dataList[0];Object(n["setTimeout"])(function(){t.isFlag=!1},1e3),t.setToken("CBMUNITID",s.CBMUNITID),t.setToken("CBMUNITNAME",s.CBMUNITNAME),t.setToken("CHECKUSER",s.CHECKUSER),t.setToken("CMEMO",s.CMEMO),t.setToken("CO_CODE",s.CO_CODE),t.setToken("CO_NAME",s.CO_NAME),t.setToken("CPASSWORD",s.CPASSWORD),t.setToken("CPOSTGUID",s.CPOSTGUID),t.setToken("CUSERID",s.CUSERID),t.setToken("CUSERNAME",s.CUSERNAME),t.setToken("FINANCELEADER",s.FINANCELEADER),t.setToken("GOVCO_CODE",s.GOVCO_CODE),t.setToken("GOVCO_NAME",s.GOVCO_NAME),t.setToken("ISDISABLE",s.ISDISABLE),t.setToken("ISTEST",s.ISTEST),t.setToken("NICKNAME",s.NICKNAME),t.setToken("OPERATORGUID",s.OPERATORGUID),t.setToken("POWER",s.POWER),t.setToken("SHORTER",s.SHORTER),t.setToken("SHORTNAME1",s.SHORTNAME1),t.setToken("SHORTNAME2",s.SHORTNAME2),t.setToken("SID",s.SID),t.setToken("SOURCE",s.SOURCE),t.setToken("URL",s.URL),t.setToken("URL_NAME",s.URL_NAME),t.setToken("URL_PWD",s.URL_PWD),t.$router.push({path:"/"})}}).catch(function(e){Object(n["setTimeout"])(function(){t.isFlag=!1},1500)})}},created:function(){}},u=c,d=(s("a2f0"),s("2877")),f=Object(d["a"])(u,o,a,!1,null,"749a8fa3",null);t["default"]=f.exports},a2f0:function(e,t,s){"use strict";var o=s("bbdf"),a=s.n(o);a.a},bbdf:function(e,t,s){}}]);