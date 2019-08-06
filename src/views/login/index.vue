<template>
  <div>
    <div id="zjzw_guide_wrap">

      <div class="show_wrap">
        <div class='show_title'>
          <span class='word'>
            柯桥区基层财政管理一体化平台
          </span>
        </div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="60px" class="login-box">
          <h3 class="login-title">欢迎登录</h3>
          <el-form-item label="账号" prop="username">
            <el-input type="text" placeholder="请输入账号" v-model="form.username" style="width: 90%" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="form.password"
              style="width: 90%"
            />
          </el-form-item>
          <div class="do_wrap">
            <div class="box1 clearfix">
              <span
                class="lf"
                style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 20px;"
              >忘记密码？</span>
              <div class="rt" style=" text-align: right">
                <el-checkbox v-model="checked" style="color:#a0a0a0;">一周内自动登录</el-checkbox>
              </div>
            </div>
          </div>
          <el-button
            type="primary"
            v-on:click="onSubmit('loginForm')"
            :loading="isFlag"
            style="width: 90%; margin-left: 10px;"
          >登录</el-button>
        </el-form>
        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
          <span>请输入账号和密码</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class='footer_content'>
         版权所有 ©2014-2019 艾迪软件
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user";
import { setTimeout } from "timers";
//md5 加密
import md5 from "js-md5";
export default {
  data() {
    return {
      isFlag: false,
      // 对话框显示和隐藏
      dialogVisible: false,
      checked: "",
      form: {
        username: "",
        password: ""
      }, // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {
            required: true,
            message: "账号不可为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不可为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //设置缓存
    setToken(name, value) {
      localStorage.setItem(name, value);
    },
    onSubmit(formName) {
      this.isFlag = true;
      let password = md5(this.form.password);
      login({
        CUSERNAME: this.form.username,
        CPASSWORD: password
      })
        .then(response => {
          if (response.code) {
            let result = response.dataList[0];
            setTimeout(() => {
              this.isFlag = false;
            }, 1000);
            this.setToken("CBMUNITID", result.CBMUNITID);
            this.setToken("CBMUNITNAME", result.CBMUNITNAME);
            this.setToken("CHECKUSER", result.CHECKUSER);
            this.setToken("CMEMO", result.CMEMO);
            this.setToken("CO_CODE", result.CO_CODE);
            this.setToken("CO_NAME", result.CO_NAME);
            this.setToken("CPASSWORD", result.CPASSWORD);
            this.setToken("CPOSTGUID", result.CPOSTGUID);
            this.setToken("CUSERID", result.CUSERID);
            this.setToken("CUSERNAME", result.CUSERNAME);
            this.setToken("FINANCELEADER", result.FINANCELEADER);
            this.setToken("GOVCO_CODE", result.GOVCO_CODE);
            this.setToken("GOVCO_NAME", result.GOVCO_NAME);
            this.setToken("ISDISABLE", result.ISDISABLE);
            this.setToken("ISTEST", result.ISTEST);
            this.setToken("NICKNAME", result.NICKNAME);
            this.setToken("OPERATORGUID", result.OPERATORGUID);
            this.setToken("POWER", result.POWER);
            this.setToken("SHORTER", result.SHORTER);
            this.setToken("SHORTNAME1", result.SHORTNAME1);
            this.setToken("SHORTNAME2", result.SHORTNAME2);
            this.setToken("SID", result.SID);
            this.setToken("SOURCE", result.SOURCE);
            this.setToken("URL", result.URL);
            this.setToken("URL_NAME", result.URL_NAME);
            this.setToken("URL_PWD", result.URL_PWD);
             this.$router.push({ path: '/' });
          }
        })
        .catch(err => {
          setTimeout(() => {
            this.isFlag = false;
          }, 1500);
        });
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.footer_content{
      margin-top: 5rem;
    text-align: center;
    color: gray;
    font-size: 1rem;
}
.show_title{
  margin-top: 1rem;
   margin-bottom: 1rem;
  .word{
        font-size: 1.9rem;
    color: white;
    font-weight: 500;
    letter-spacing: 5px;
  }
}
.login-box {
      border: 1px solid #909399;
    width:calc(100vw/3);
    margin: 30px auto;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 25px #909399;
    box-shadow: 0 0 25px #909399;
    background: #fff;
    padding: 10px 30px 45px;
}

.login-title {
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
  font-size: 22px;
}
.show_wrap {
  background: url("../../assets/img/bg.jpg") center center / 100% 100%
    no-repeat;
  width: 100%;
  padding: 10px;
  text-align: center;
  margin-top: 120px;
}

.lf {
  float: left;
}
.box1 {
  margin-bottom: 10px;
  margin-top: 30px;
 
}
.rf {
  float: right;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}

#footer {
  margin-top: 20px;
  text-align: center;
  /* border-top: 1px solid #ddd; */
  padding-top: 20px;
  clear: both;
  margin: 10px auto;
  color: #a4a4a4;
  font-size: 14px;
}
</style>