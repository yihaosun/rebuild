<template >
  <div>
    <div class='content_show'>
      <div class="choose_wrap">
        <span class="date_title">报表时间(教育收支)：</span>
        <el-date-picker
          v-model="date"
          size="medium"
          type="month"
          clearable
          format="yyyy-MM"
          value-format="yyyy-MM"
        ></el-date-picker>
        <span class="down_wrap" @click="downTable">
          <svg-icon icon-class="down" />
        </span>
        <span style="margin-left: 25px;">
          <el-button size="medium" @click="isExistTable" type="danger">生成报表</el-button>
          <el-dialog title="操作提示" :visible.sync="dialogVisible" width="28%">
            <span>该报表已存在,是否重新生成?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="makeSure">确 定</el-button>
            </span>
          </el-dialog>
        </span>
        <span style="margin-left: 10px;">
          <el-button type="primary" size="medium" @click="lookTable">查看</el-button>
        </span>
      </div>
      <div
        style="    text-align: right;
         margin-bottom: 5px;
            padding-right: 5px;"
        v-if="showButton"
      >
        <el-button type="primary" size="medium" @click="changeEdit">{{isEditor?"保存":"编辑"}}</el-button>
      </div>
      <div class="date_wrap" v-loading="loading">
        <div class="showTable">
            

          <el-table
            class="showTable"
          :data="tableData"
            border
            height="600"
            style="width: 100%"
          
            :header-cell-style="{
    'background-color': '#409eff',
     'color':' #fff',
      'border-bottom': '1px solid #fff',
       'text-align': 'center',
       'height':'30px!important'
       
}"

          >
            <el-table-column prop="ACC_NAME" label="项 目" width="280" ></el-table-column>
            <el-table-column prop="MONEY1" label="本年累计发生额(万元)" width="230" >
                  <template slot-scope="scope">
              <div v-if="isEditor">
                <el-input
                  v-model="scope.row.MONEY1"
                  :disabled="true"
                ></el-input>
              </div>
              <div v-if="!isEditor" style="text-align:right">{{scope.row.MONEY1}}</div>
            </template>
                </el-table-column>      
           	 <el-table-column prop="MONEY2" label="本年累计发生额合计(元)" width="230" >
    <template slot-scope="scope">
              <div v-if="isEditor">
                <el-input
                  v-model="scope.row.MONEY2"
                  :disabled="true"
                  v-if='scope.row.ISDISABLED=="true"'
                ></el-input>
                 <el-input
                  v-model="scope.row.MONEY2"
                  type='number'
                   clearable
                  v-if='scope.row.ISDISABLED!="true"'
                   @input="handleClick(scope.$index,scope.row)"
                ></el-input>
              </div>
              <div v-if="!isEditor" style="text-align:right">{{scope.row.MONEY2}}</div>
            </template>


                </el-table-column>
            <el-table-column prop="MONEY3" label="县级(元)" width="230" ></el-table-column>
             <el-table-column prop="MONEY4" label="镇级(元)" width="230" >

                   <template slot-scope="scope">
              <div v-if="isEditor">
                <el-input
                  v-model="scope.row.MONEY4"
                  :disabled="true"
                ></el-input>
              </div>
              <div v-if="!isEditor" style="text-align:right">{{scope.row.MONEY4}}</div>
            </template>
             </el-table-column>

          </el-table>
          <!-- <v-treeTables ref="getTable" ></v-treeTables> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getJyszList } from "@/api/town/reportecon";
import { isJyszExist } from "@/api/town/reportecon";
import { updateJyszList } from "@/api/town/reportecon";
import { lookJyszExist } from "@/api/town/reportecon";
import { downJyszList } from "@/api/town/reportecon";

export default {
  data() {
    return {
      date: "2019-07",
      dialogVisible: false,
      tableData: [],
      loading: false,
      isEditor: false,
      showButton: false,
       co_code:"",
      shortname:"",
      cpostguid:"",
      year:"",
      month:""
    };
  },
  methods: {
handleClick(e,e1){
    e1.MONEY1=(Number(e1.MONEY2)/10000).toFixed(2)
     e1.MONEY4=e1.MONEY2;
     let sum=0;
      let q = e1.ACC_CODE.substring(0,1);
      console.log(q)
    let a=  this.tableData.filter(o=>{
          if(o.ACC_CODE.substring(0,1)==q){
              return o;
          }
      })
      for(let i=1;i<a.length;i++){
          if(a[i].MONEY2==null){

          }else{
          sum+=Number(a[i].MONEY2);
          }
      }
       a[0].MONEY2=sum;
       a[0].MONEY4=sum;
       a[0].MONEY1=(Number(sum)/10000).toFixed(2);
    
},
    //确定重新生成
    makeSure() {
       this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      this.getTableSource(this.year,this.month, true);
      this.dialogVisible = false;
    },
    getTableSource(year, month, flag) {
      this.loading = true;
      if (flag) {
        getJyszList({
          CO_CODE: this.co_code,
        FISCAL: year,
        FIS_PERD: month,
        })
          .then(response => {
            this.tableData = response.dataList;
            this.loading = false;
            this.showButton = true;
          })
          .catch(err => {
            this.loading = false;
            this.tableData = [];
          });
      } else {
        lookJyszExist({
          CO_CODE: this.co_code,
        FISCAL: year,
        FIS_PERD: month,
          STATUS: "1"
        })
          .then(response => {
            this.tableData = response.dataList;
            this.loading = false;
            this.showButton = true;
          })
          .catch(err => {
            this.loading = false;
            this.tableData = [];
          });
      }
    },
    isExistTable() {
      this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      isJyszExist({
       CO_CODE: this.co_code,
        FISCAL: this.year,
        FIS_PERD: this.month,
      })
        .then(response => {
        
          this.getTableSource(this.year,this.month, true);
        })
        .catch(err => {
          console.log(err);
          this.dialogVisible = true;
        });
    },
    //编辑
    changeEdit() {
      //保存的时候
      if (this.isEditor) {
        this.updateDataSource();
            this.isEditor = false
      } else {
          console.log("dfdf")
         this.isEditor = true
      }
  
    },

//保存
 updateDataSource() {
      this.loading = true;
      updateJyszList(this.tableData).then(response => {
        if (response) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      });
    },
   downTable() {
       this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      downJyszList({
        CO_CODE: this.co_code,
        FISCAL: this.year,
        FIS_PERD:this.month,
        STATUS: "2",
       CPOSTGUID: this.cpostguid,
        SHORTNAME: this.shortname
      })
        .then(response => {
          var blob = new Blob([response], {
            type: "application/vnd.ms-excel;charset=utf-8"
          }); //指定格式为vnd.ms-excel
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = `${this.shortname+this.year+"年"+this.month+"月"}教育收支表.xls`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {

        });
    },
    //创建表格(查看)
    lookTable() {
     
     this.getTableSource(this.year,this.month, false);
     
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
    this.shortname=localStorage.getItem("SHORTNAME1")
    this.cpostguid=localStorage.getItem("CPOSTGUID")
    this.date=this.GetDateStr();
    let a=this.date.split("-");
    console.log(a)
    this.year=a[0];
    this.month=a[1];
  }
};
</script>
<style lang='scss' scope >


</style>