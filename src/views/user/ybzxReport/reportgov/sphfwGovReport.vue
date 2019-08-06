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
          <el-table-column prop="B_ACC_CODE" label="科目编码" width="100" fixed></el-table-column>
          <el-table-column prop="B_ACC_NAME" label="科目名称" width="100" fixed></el-table-column>
          <el-table-column prop="ALLMONEY" label="合计" width="100" fixed></el-table-column>
          <el-table-column prop="MONEY1" label="办公费" width="100"></el-table-column>
          <el-table-column prop="MONEY2" label="印刷费" width="100"></el-table-column>
          <el-table-column prop="MONEY3" label="咨询费" width="100"></el-table-column>
          <el-table-column prop="MONEY4" label="手续费" width="100"></el-table-column>
          <el-table-column prop="MONEY5" label="水费" width="100"></el-table-column>
          <el-table-column prop="MONEY6" label="电费" width="100"></el-table-column>
          <el-table-column prop="MONEY7" label="邮电费" width="100"></el-table-column>
          <el-table-column prop="MONEY8" label="取暖费" width="100"></el-table-column>
          <el-table-column prop="MONEY9" label="物业管理费" width="100"></el-table-column>
          <el-table-column prop="MONEY10" label="差旅费" width="100"></el-table-column>
          <el-table-column prop="MONEY11" label="因公出国费用" width="100"></el-table-column>
          <el-table-column prop="MONEY12" label="维修费" width="100"></el-table-column>
          <el-table-column prop="MONEY13" label="租赁费" width="100"></el-table-column>
          <el-table-column prop="MONEY14" label="会议费" width="100"></el-table-column>
          <el-table-column prop="MONEY15" label="培训费" width="100"></el-table-column>
          <el-table-column prop="MONEY16" label="公务接待费" width="100"></el-table-column>
          <el-table-column prop="MONEY17" label="专用材料费" width="100"></el-table-column>
          <el-table-column prop="MONEY18" label="被装购置费" width="100"></el-table-column>
          <el-table-column prop="MONEY19" label="专用燃料费" width="100"></el-table-column>
          <el-table-column prop="MONEY20" label="劳务费" width="100"></el-table-column>
          <el-table-column prop="MONEY21" label="委托业务费" width="100"></el-table-column>
          <el-table-column prop="MONEY22" label="工会经费" width="100"></el-table-column>
          <el-table-column prop="MONEY23" label="福利费" width="100"></el-table-column>
          <el-table-column prop="MONEY24" label="公务用车运行维护费" width="100"></el-table-column>
          <el-table-column prop="MONEY25" label="其他交通费用" width="100"></el-table-column>
          <el-table-column prop="MONEY26" label="税金及附加费用" width="100"></el-table-column>
          <el-table-column prop="MONEY27" label="其他商品和服务支出" width="100"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getSphfwList } from "@/api/town/reportgov";
import { downSphfwList } from "@/api/town/reportgov";
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
      downSphfwList({
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
         downloadElement.download = `${this.shortname+this.year+"年"+this.month+"月"}商品和服务支出表月报.xls`; //下载后文件名
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
      this.getDataSource(this.year, this.month, true);
    },

    getDataSource(year, month) {
      getSphfwList({
        CO_CODE: this.co_code,
        FISCAL: year,
        FIS_PERD: month,
        STATUS: "1"
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
<style lang='scss'  >

.date_title {
  font-size: 0.9rem;
}

</style>