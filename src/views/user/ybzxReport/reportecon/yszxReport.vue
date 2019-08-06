<template >
  <div>
    <div class='content_show'>
      <div class="choose_wrap">
        <span class="date_title">报表时间：</span>
        <el-date-picker
          v-model="date"
          size="medium"
          type="month"
          clearable
          format="yyyy-MM"
          value-format="yyyy-MM"
        ></el-date-picker>
     <span class='down_wrap' @click="downTable">
         <svg-icon icon-class="down" /> 
          </span>
        <span style='margin-left: 25px;' >
          <el-button size="medium" @click="isExistTable" type="danger">生成报表</el-button>
          <el-dialog
  title="操作提示"
  :visible.sync="dialogVisible"
  width="28%"
  >
  <span>该报表已存在,是否重新生成?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="makeSure">确 定</el-button>
  </span>
</el-dialog>
        </span>
        <span style='margin-left: 10px;'>
          <el-button type="primary" size="medium"   @click="lookTable">查看</el-button>
        </span>
       
      </div>
      <div class="date_wrap">
       
       <div class='showTable'>
             <v-dynamicTables ref="getTable"  ></v-dynamicTables>
       </div>

      </div>
    </div>
  </div>
</template>
<script>

import dynamicTables from "../../../../components/dynamicTables/dynamicTables";
import { isExist } from "@/api/town/reportecon";
export default {
  data() {
    return {
       date: "2019-07",
       dialogVisible:false,
       year:"",
      month:"",
      co_code:""
    };
  },
  // //组件注册
  components: {
    "v-dynamicTables": dynamicTables,
  },
  methods: {
    //确定重新生成
    makeSure(){
       
       var _this=this;
      //调用子级的方法
        this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
        _this.$refs.getTable.getTableSource(this.year,this.month,true)
          this.dialogVisible=false;
    },
  isExistTable(){
    
    isExist({
    FISCAL: this.year,
    CO_CODE:this.co_code,
    FIS_PERD: this.month,
 })
        .then(response => {
          
       var _this=this;
      //调用子级的方法
        this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
        _this.$refs.getTable.getTableSource(this.year,this.month,true)
        })
        .catch(err => {
          console.log(err)
          this.dialogVisible=true;
        });
  },
         //下载
    downTable() {
       //调用子级的方法
     
        var _this=this;
          this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
        _this.$refs.getTable.downTable(this.year,this.month)
    },
      
 //创建表格(查看)
    lookTable() {
   
       var _this=this;
      //调用子级的方法
        this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
        _this.$refs.getTable.getTableSource(this.year,this.month,false)
    },
       GetDateStr() {
var dd = new Date();
var y = dd.getFullYear();
var m = dd.getMonth()+1;//获取当前月份的日期

return y+"-"+m;
}
  },
  created() {
     this.co_code=localStorage.getItem("CO_CODE")
     this.date=this.GetDateStr();
    let a=this.date.split("-");
    console.log(a)
    this.year=a[0];
    this.month=a[1];
  }
};
</script>
<style lang='scss' >


.date_title {
  font-size: 0.9rem;
}
.date_wrap {
  margin-top: 1rem!important;
  .button_wrap {
    text-align: right;
    margin-bottom: 0.3rem;
  }
}

</style>