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
        <span class="down_wrap" @click="downTable">
          <svg-icon icon-class="down" />
        </span>
        <span style="margin-left: 25px;">
          <el-button size="medium" @click="createTable" type="danger">生成报表</el-button>
        </span>
      </div>
      <div class="date_wrap">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          border
           
          v-loading="loading"
         
          :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
        >
          <el-table-column label="项目" prop="ACC_NAME">
               <template slot-scope="scope">
              <div >   {{scope.row.ACC_NAME}}</div>

            </template>
          </el-table-column>
          <el-table-column label="专户收入">
            <el-table-column  label="本月"></el-table-column>
          <el-table-column prop="MONEY2" label="累计"></el-table-column>
          </el-table-column>
           <el-table-column label="专户支出">
             <el-table-column  label="本月"></el-table-column>
          <el-table-column prop="MONEY4" label="累计"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getZhszList } from "@/api/town/reportecon";
import { downZhszList } from "@/api/town/reportecon";
export default {
  data() {
    return {
      loading: false,

      tableData: [],
      date: "2019-07",
        co_code:"",
      shortname:"",
      cpostguid:"",
      year:"",
      month:""
    };
  },

  methods: {
    //下载
    downTable() {
       this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      downZhszList({
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
       downloadElement.download = `${this.shortname+this.year+"年"+this.month+"月"}专户收支月报.xls`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});
    },

    //创建表格(生成报表)
    createTable() {
       this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      this.loading = true;
      this.getDataSource(this.year, this.month);
    },

    getDataSource(year, month) {
      getZhszList({
        CO_CODE: this.co_code,
        FISCAL: year,
        FIS_PERD: month,
        STATUS:"1"
      })
        .then(response => {
          this.loading = false;
          this.tableData = response.dataList;
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false;
            this.showButton = false;
            this.tableData = [];
           
          }, 1500);
        });
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
<style lang='scss' >

.date_title {
  font-size: 0.9rem;
}

</style>