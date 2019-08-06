<template>
  <div>
    <div class="header_all">
      <span>柯桥区基层财政管理一体化平台</span>
      <span style="float:right">
        <el-dropdown
          class="avatar-container"
          trigger="click"
          style="vertical-align: text-bottom;margin-left:10px"
        >
          <div class="avatar-wrapper">
            <span style="font-size:1rem;color:white">xxx</span>
            <i class="el-icon-caret-bottom" style="color:white" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>我的消息</el-dropdown-item>
            </router-link>
            <a target="_blank" href>
              <el-dropdown-item>设置</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <div class="content_wrap">
      <div class="left_wrap">
        <div class="title">首页</div>
        <div class='shape_wrap'>
            <div class='shape'  v-for="(item, index) in shapeList" :key="index" @click="goto(index)">
                <div class='shape_style' v-bind:style="{ backgroundColor: item.backgroundColor,border:item.borderStyle}" >
                  <svg-icon :icon-class="item.icon" style='font-size: 2.5rem;'/> 
                </div>
             <div>{{item.name}}</div>
            </div>
             
        </div>
      </div>
      <div class="right_wrap"></div>
    </div>
    <div class='footer_wrap'>
版权所有 ©2014-2019 艾迪软件
    </div>

  </div>
</template>
<<script>
export default {
     data () {
    return {
     shapeList:[{
        backgroundColor:"#4c9ffb",
        borderStyle :"5px solid rgb(235, 245, 255)",
         icon:"show",
         name:"数据展示"
     },{
           backgroundColor:"#fad032",
        borderStyle :"5px solid rgb(255, 236, 164)",
         icon:"whiteku",
         name:"预算项目滚动库"
     },
     {
         backgroundColor:"#f97a8f",
        borderStyle :"5px solid #ffc4ce",
         icon:"whitexiang",
         name:"上级资金项目库"
     },
      {
         backgroundColor:"#7fd589",
        borderStyle :"5px solid #d5fdda",
         icon:"whitegong",
         name:"公示公告"
     },
      {
         backgroundColor:"#9687f0",
        borderStyle :"5px solid #cbc2ff",
         icon:"whitebo",
         name:"拨款管理"
     },
      {
       backgroundColor:"#6fe0cc",
        borderStyle :"5px solid #d3fbf4",
         icon:"whitesafe",
         name:"资金监管"
     },
     {
         backgroundColor:"#ffda6e",
        borderStyle :"5px solid #ffebb0",
         icon:"whitedui",
         name:"区级资金对账单"
     },
     {
         backgroundColor:"#41ccef",
        borderStyle :"5px solid #b8f1ff",
         icon:"whiter",
         name:"日记账"
     },
     {
          backgroundColor:"#f781a9",
        borderStyle :"5px solid #fdc7d9",
         icon:"whiteyue",
         name:"月报中心"
     },
      {
       
          backgroundColor:"#fcb049",
        borderStyle :"5px solid #ffd59d",
         icon:"whitezi",
         name:"自定义报表"
     },
     {
        backgroundColor:"#c59792",
        borderStyle :"5px solid #efc6c2",
         icon:"whitehe",
         name:"会计核算"
     },
     {
         backgroundColor:"#7ea1fd",
        borderStyle :"5px solid #b9c7ec",
         icon:"whitepei",
         name:"系统配置"
     }

     ]
    };
  },
  methods: {
       //清除浏览器所有缓存
    removeToken(){
window.localStorage.clear()
    },
     logout() {
       this.removeToken();
      this.$router.push('/login')
    },
    goto(e){
        if(e==0){
              this.$router.push('/dashboard')
        } else if(e==1)  {
           this.$router.push('/yusuanxiangmu')
        }
        else if(e==2)  {
           //this.$router.push('/yusuanxiangmu')
        }
         else if(e==3)  {
           //this.$router.push('/yusuanxiangmu')
        }
         else if(e==4)  {
           this.$router.push('/bkglReport')
        }
        else if(e==5)  {
          // this.$router.push('/bkglReport')
        }
         else if(e==6)  {
           this.$router.push('/duizhangdan')
        }
        else if(e==7)  {
           //this.$router.push('/duizhangdan')
        }
         else if(e==8)  {
            this.$router.push('/ybzxReport')
        }
         else if(e==9)  {
          // this.$router.push('/ybzxReport')
        }
         else if(e==10)  {
           //this.$router.push('/ybzxReport')
        }
         else if(e==11)  {
           //this.$router.push('/ybzxReport')
        }
        
        
       
    }
  },
 created() {
   console.log(process.env.VUE_APP_BASE_API)
 },
    
}
</script>
<style lang="scss" scoped>
.header_all {
  height: 55px;
  padding: 0 50px;
  line-height: 55px;
  background: #4ea9ff;
  text-align: left;
  border-bottom: 1px solid #dedede;
  font-size: 1.4rem;
  color: white;
  font-weight: bold;
}
.content_wrap {
  display: flex;
  margin-top: 2rem;
  padding: 0 50px;

  .left_wrap {
    flex: 4;
    .title {
      border-bottom: 0.5px solid #cecaca;
      font-size: 1.3rem;
      padding: 15px 10px;
      font-family: "Times New Roman", Times, serif;
    }
   
    .shape_wrap{
    display: flex;
    margin-top: 1rem;
    flex-wrap: wrap; 
       margin-left: 15px;
       cursor: pointer;
        .shape:hover{
        border:1px solid #36a0e2;
    }
        .shape{
      width: calc(100%/4.6);
    text-align: center;
    height: 150px;
    /* background-color: red; */
    margin-right: 25px;
    /* margin-left: 12px; */
    text-align: center;
    margin-bottom: 25px;
    border: 1px solid #b5b5b5;
    border-radius: 10px;
    margin-top: 20px;
    -webkit-box-shadow: 9px 10px 5px #9a9999;
    box-shadow: 9px 10px 5px #b1b1b1;
    .shape_style{
           
    display: inline-block;
    margin-top: 1.3rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    padding: 10px;
    }
        }
    }
  }
  .right_wrap {
    flex: 1.5;
  }
}
.footer_wrap{
      width:100%;
      background: #f1f8ff;
      height: 40px;
      position: fixed;
      bottom: 0px;
      text-align: center;
     line-height: 40px;
}
</style>
