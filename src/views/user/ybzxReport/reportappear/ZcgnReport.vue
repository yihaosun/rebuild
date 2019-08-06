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
        <span @click="downTable" class='down_wrap'>
         <svg-icon icon-class="down" /> 
          </span>
        <span style='    margin-left: 25px;'>
          <el-button size="medium" @click="createTable" type="danger">生成报表</el-button>
        </span>
        <span style='    margin-left: 10px;'>
          <el-button type="primary" size="medium" @click="lookTable" >查看</el-button>
        </span>
        <span style='    display: inline-block;
    line-height: 37px;
    margin-left: 10px;' v-if="showStatus">报表状态:{{ status| getStatus }}</span>
      </div>
      <div class="date_wrap">
        <div class="button_wrap" v-if="showButton">
          <el-button type="primary" size="medium" @click="changeEdit">{{showEdit?"保存":"编辑"}}</el-button>
          <el-button type="primary" size="medium" @click="commitTable">确认上报</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="ID"
          border
          v-loading="loading"
          show-summary
          max-height="700"
          :summary-method="getSummaries"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
        >
          <el-table-column prop="B_ACC_CODE" label="功能科目编码"></el-table-column>
          <el-table-column prop="B_ACC_NAME" label="功能科目名称"></el-table-column>
          <el-table-column prop="MONEY" label="累计金额" width="300">
            <template slot-scope="scope">
              <div v-if="showEdit">
                <el-input
                  v-model="scope.row.MONEY"
                  :disabled="true"
                  v-if="scope.row.IS_LOWEST=='N'"
                ></el-input>
                <el-input
                  @input="handleClick(scope.$index,scope.row)"
                  v-model="scope.row.MONEY"
                  v-if="scope.row.IS_LOWEST!='N'"
                  type="number"
                  clearable
                ></el-input>
              </div>
              <div v-if="!showEdit" style="text-align:right">{{scope.row.MONEY}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getPayList } from "@/api/town/reportappear";
import { lookPayList } from "@/api/town/reportappear";
import { savePayList } from "@/api/town/reportappear";
import { downPayList } from "@/api/town/reportappear";
import { commitpayList } from "@/api/town/reportappear";
import { filter } from "minimatch";
import { setTimeout, setInterval } from "timers";
export default {
  data() {
    return {
      showButton: false,
      loading: false,
      showEdit: false,
      tableData: [],
      date: "",
      status: "0",
      showStatus: false,
      co_code:"",
      shortname:"",
      cpostguid:"",
      year:"",
      month:""
      
    };
  },
  //vue 管道
  filters: {
    getStatus: value => {
      switch (value) {
        case "1":
          return "未上报";
          break;
        case "3":
          return "已上报";
          break;
        case "5":
          return "已确认";
          break;
        default:
          break;
      }
    }
  },
  methods: {
    //下载
    downTable() {
       this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      downPayList({
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
          downloadElement.download = `${this.shortname+this.year+"年"+this.month+"月"}一般公共预算支出功能科目月报.xls`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {

        });
    },

    //确认上报
    commitTable() {
     
      this.loading = true;
      commitpayList(
        {
          list:this.tableData,
          CO_CODE:this.co_code,
          FISCAL:this.year,
          FIS_PERD:this.month,
          STATUS:'3'
        }
      )
        .then(response => {
          this.loading = false;
          this.status = "3";
          this.showButton = false;
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        });
    },
    //创建(生成报表)
    createTable() {
       this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      this.loading = true;
      this.getDataSource(this.year, this.month, true);
    },
    //查看报表
    lookTable() {
     this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      this.loading = true;
       this.getDataSource(this.year, this.month, false);
    },

    getSummaries(param) {

        const { columns, data } = param;
      const sums = [];
      
     
 columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        switch (column.property) {
          case "MONEY":
           let allSum=0;
            this.tableData.map(o => {
              if (o.MONEY != null) {
                allSum += Number(o.MONEY);
              }
            });
              sums[index] = allSum.toFixed(2) + "元";
              break;
            default:
            sums[index] = "--";
            break;
        }
      });
      return sums;
   
     
    },
    //编辑
    changeEdit() {
      //保存的时候
      if (this.showEdit) {
        this.loading = true;
        this.updateDataSource();
      }
      this.showEdit = !this.showEdit;
    },
    getDataSource(year, month, flag) {
      //生成报表
      if (flag) {
        getPayList({
          CO_CODE: this.co_code,
          FISCAL: year,
          FIS_PERD: month
        })
          .then(response => {
            this.loading = false;
            this.tableData = response.dataList;
            this.status = response.dataList[0].SETID;
            this.showStatus = true;
            if (this.status == "1") {
              this.showButton = true;
            } else {
              this.showButton = false;
            }
          })
          .catch(err => {
            setTimeout(() => {
              this.loading = false;
              this.showButton = false;
              this.tableData = [];
              this.showStatus = false;
            }, 1500);
          });
      } else {
        //查看
        lookPayList({
          CO_CODE: this.co_code,
          FISCAL: year,
          FIS_PERD: month,
          STATUS: "1",
          CPOSTGUID: this.cpostguid
        })
          .then(response => {
            this.loading = false;
            this.tableData = response.dataList;
            this.status = response.dataList[0].SETID;
            this.showStatus = true;
            if (this.status == "1") {
              this.showButton = true;
            } else {
              this.showButton = false;
            }
          })
          .catch(err => {
            setTimeout(() => {
              this.loading = false;
              this.showButton = false;
              this.tableData = [];
              this.showStatus = false;
            }, 1500);
          });
      }
    },
    //保存
    updateDataSource() {
      savePayList({
        list:this.tableData,
        STATUS:"1"
      }).then(response => {
        if (response) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      });
    },
    handleClick(e, e1) {
      let q = e1.B_ACC_CODE;
      let a = this.tableData.filter(o => {
        if (q.substring(0, 3) == o.B_ACC_CODE) {
          return o;
        }
      });
      if (a[0].children.length != 0) {
        if (q.length > 6) {
          let b = a[0].children.filter(o => {
            if (q.substring(0, 5) == o.B_ACC_CODE) {
              return o;
            }
          });
          let subSum = 0;
          let c = b[0].children.map(o => {
            if (o.MONEY != null) {
              subSum += Number(o.MONEY);
            }
          });
          b[0].MONEY = subSum.toFixed(2);
          let sum = 0;
          a[0].children.map(o => {
            if (o.MONEY != null) {
              sum += Number(o.MONEY);
            }
          });
          a[0].MONEY = sum.toFixed(2);
        } else {
          let sum = 0;
          a[0].children.map(o => {
            if (o.MONEY != null) {
              sum += Number(o.MONEY);
            }
          });
          a[0].MONEY = sum.toFixed(2);
        }
      }
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



</style>