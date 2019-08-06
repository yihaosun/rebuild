<template >
  <div>
    <div class="content_show">
      <div class="choose_wrap">
        <span class="date_title">报表时间(预算支出)：</span>
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
      <div class="date_wrap" v-loading="loading" style='margin-top:2rem'>
        <div class="showTable">
          <!-- v-loadmore="handelLoadmore" -->

          <vbt-table
            
         style="width: 100%"
            border
          max-height="650"
            row-key="ID"
            size="middle"
            isBigData
            isTreeTable
            highlight-hover-row
            :data="tableData"
             show-summary
              :summary-method="getSummaries"
            :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center',
    'font-size':'0.9rem'
}"
          >
            <!--  表格   -->
            <vbt-table-column prop="B_ACC_CODE" label="编码" width="140" fixed></vbt-table-column>
            <vbt-table-column prop="B_ACC_NAME" label="支出科目" width="120" fixed></vbt-table-column>
            <vbt-table-column label="公共财政预算支出">
              <vbt-table-column label="支出预算计划" width="140">
                <vbt-table-column prop="MONEY1" label="年初预算" width="140">
                  <template slot-scope="scope">
                    <div v-if="isEditor">
                      <el-input v-model="scope.row.MONEY1" :disabled="true" size="small "></el-input>
                    </div>
                    <div v-if="!isEditor">{{scope.row.MONEY1}}</div>
                  </template>
                </vbt-table-column>
                <vbt-table-column prop="MONEY2" label="科目调整" width="140">
                  <template slot-scope="scope">
                  
                    <div v-if="isEditor">
                      <el-input
                        v-model="scope.row.MONEY2"
                        :disabled="true"
                        size="small "
                        v-if="scope.row.IS_LOWEST=='N'"
                      ></el-input>
                      <el-input
                        v-model="scope.row.MONEY2"
                        clearable
                        type="number"
                        size="small "
                        v-if="scope.row.IS_LOWEST!='N'"
                          @input="handleClick(scope.$index,scope.row)"
                      ></el-input>
                    </div>
                    <div v-if="!isEditor">{{scope.row.MONEY2}}</div>
                  </template>
                </vbt-table-column>
                <vbt-table-column prop="MONEY3" label="上级补助" width="140"></vbt-table-column>
                <vbt-table-column prop="MONEY4" label="小计" width="140">
                  <template slot-scope="scope">
                    <div v-if="isEditor">
                      <el-input v-model="scope.row.MONEY4" :disabled="true" size="small "></el-input>
                    </div>
                    <div v-if="!isEditor">{{scope.row.MONEY4}}</div>
                  </template>
                </vbt-table-column>
              </vbt-table-column>
              <vbt-table-column prop="MONEY5" label="本月支出" width="140"></vbt-table-column>
              <vbt-table-column prop="MONEY6" label="累计支出" width="140"></vbt-table-column>
              <vbt-table-column prop="PLAN" label="占计划" width="140">
                <template slot-scope="scope">
                  <div v-if="isEditor">
                    <el-input v-model="scope.row.PLAN" :disabled="true" size="small "></el-input>
                  </div>
                  <div v-if="!isEditor">{{scope.row.PLAN}}</div>
                </template>
              </vbt-table-column>
            </vbt-table-column>
            <vbt-table-column label="其他预算支出" >
              <vbt-table-column label="预算外支出" >
                <vbt-table-column label="本月支出" prop="MONEY7" width="140"></vbt-table-column>
                <vbt-table-column label="累计支出" prop="MONEY8" width="140"></vbt-table-column>
              </vbt-table-column>
            </vbt-table-column>
          </vbt-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getYszcList } from "@/api/town/reportecon";
import { lookYszcList } from "@/api/town/reportecon";
import { downYszcList } from "@/api/town/reportecon";

import { isYszcExist } from "@/api/town/reportecon";
import { updateYszcList } from "@/api/town/reportecon";

import { MessageBox, Message } from "element-ui";
import vbtTable from "../../../../components/bigTreeTable/table";
import vbtTableColumn from "../../../../components/bigTreeTable/table-column.js";

export default {
  components: { vbtTable, vbtTableColumn },
  data() {
    return {
      date: "2019-07",
      dialogVisible: false,
      tableData: [],
      loading: false,
      isEditor: false,
      showButton: false,
      currentStartIndex: 0,
      currentEndIndex: 20,
        co_code:"",
      shortname:"",
      cpostguid:"",
      year:"",
      month:""
    };
  },
  computed: {
    filteredData() {
      return this.tableData.filter((item, index) => {
        if (index < this.currentStartIndex) {
          return false;
        } else if (index > this.currentEndIndex) {
          return false;
        } else {
          return true;
        }
      });
    }
  },

  methods: {
    // //总计
    getSummaries(param) {
      const { columns, data } = param;
      console.log(param)
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        switch (column.property) {
          case "MONEY1":
             let allSum=0;
            this.tableData.map(o => {
              if (o.MONEY1 != null) {
                allSum += Number(o.MONEY1);
              }
            });
              sums[index] = allSum.toFixed(2) + "元";
          
          break;
           case "MONEY2":
           let allSum1=0;
            this.tableData.map(o => {
              if (o.MONEY2 != null) {
                allSum1 += Number(o.MONEY2);
              }
            });
              sums[index] = allSum1.toFixed(2) + "元";
        
          break;
           case "MONEY3":
           let allSum2=0;
            this.tableData.map(o => {
              if (o.MONEY3 != null) {
                allSum2 += Number(o.MONEY3);
              }
            });
              sums[index] = allSum2.toFixed(2) + "元";
          break;
           case "MONEY4":
           let allSum3=0;
            this.tableData.map(o => {
              if (o.MONEY4 != null) {
                allSum3 += Number(o.MONEY4);
              }
            });
              sums[index] = allSum3.toFixed(2) + "元";
        
          break;
           case "MONEY5":
           let allSum4=0;
            this.tableData.map(o => {
              if (o.MONEY5 != null) {
                allSum4 += Number(o.MONEY5);
              }
            });
              sums[index] = allSum4.toFixed(2) + "元";
          break;
          case "MONEY6":
           let allSum5=0;
            this.tableData.map(o => {
              if (o.MONEY6 != null) {
                allSum5 += Number(o.MONEY6);
              }
            });
              sums[index] = allSum5.toFixed(2) + "元";
          break;
            case "PLAN":
           let first= sums[7].substring(0, sums[7].length-1)
             let second= sums[5].substring(0, sums[5].length-1)
           let a = (Number(first) / Number(second)) * 100;
           sums[index] =  a.toFixed(2)  + '%';
          break;
  case "MONEY7":
           let allSum6=0;
            this.tableData.map(o => {
              if (o.MONEY7 != null) {
                allSum6 += Number(o.MONEY7);
              }
            });
              sums[index] = allSum6.toFixed(2) + "元";
          break;
          case "MONEY8":
           let allSum7=0;
            this.tableData.map(o => {
              if (o.MONEY8 != null) {
                allSum7 += Number(o.MONEY8);
              }
            });
              sums[index] = allSum7.toFixed(2) + "元";
          break;


          default:
            sums[index] = "--";
            break;
        }
      });
      return sums;
    },




   handleClick(e, e1) {
      let q = e1.B_ACC_CODE;
      let a = this.tableData.filter(o => {
        if (q.substring(0, 3) == o.B_ACC_CODE) {
          return o;
        }
      });
        //三级小计
      let result=Number(e1.MONEY1)+Number(e1.MONEY2)+Number(e1.MONEY3);
      e1.MONEY4=result.toFixed(2);
       let pre= Number(e1.MONEY6)/Number(e1.MONEY4)
        e1.PLAN= pre.toFixed(2)*100;
     
      
      if (a[0].children.length != 0) {
        if(q.length>6){
        let b = a[0].children.filter(o => {
          if (q.substring(0, 5) == o.B_ACC_CODE) {
            return o;
          }
        });
          let subSum = 0;
          let c = b[0].children.map(o => {
            if (o.MONEY2 != null) {
              subSum += Number(o.MONEY2);
            }
          });
           //二级小计
          b[0].MONEY2 = subSum.toFixed(2);
          b[0].MONEY4=Number(b[0].MONEY1)+Number(b[0].MONEY2)+Number(b[0].MONEY3)
           let pre1= Number(b[0].MONEY6)/Number(b[0].MONEY4)
         b[0].PLAN= pre1.toFixed(2)*100;
          let sum = 0;
          a[0].children.map(o => {
            if (o.MONEY2 != null) {
              sum += Number(o.MONEY2);
            }
          });
          // console.log(sum)
          //一级小计
          a[0].MONEY2 = sum.toFixed(2);
           a[0].MONEY4=Number(a[0].MONEY1)+Number(a[0].MONEY2)+Number(a[0].MONEY3);
            let pre2= Number(a[0].MONEY6)/Number(a[0].MONEY4)
         a[0].PLAN= pre2.toFixed(2)*100;
          // console.log(a)
        }
        else{
         let sum = 0;
          a[0].children.map(o => {
            if (o.MONEY2 != null) {
              sum += Number(o.MONEY2);
            }
          });
          a[0].MONEY2 = sum.toFixed(2);
         
        }
      }
     
    },
    //确定重新生成
    makeSure() {
      this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      this.getTableSource(this.year, this.month, true);
      this.dialogVisible = false;
    },
    getTableSource(year, month, flag) {
      this.loading = true;
      if (flag) {
        getYszcList({
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
        lookYszcList({
       CO_CODE: this.co_code,
        FISCAL: year,
        FIS_PERD: month,
        STATUS: '1',
       
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
      isYszcExist({
         CO_CODE: this.co_code,
        FISCAL: this.year,
        FIS_PERD: this.month,
      })
        .then(response => {
         
          this.getTableSource(this.year, this.month, true);
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
      
      } else {
      
        this.isEditor = true;
      }
    },
    //更新
      updateDataSource() {
    this.loading=true;
 updateYszcList(this.tableData).then(response => {
        if (response) {
          setTimeout(() => {
            this.loading = false;
            this.isEditor=false;
          }, 1000);
        }
      }).catch(err=>{
  this.isEditor = false;
      })
    },
    //下载
    downTable() {
        this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
       downYszcList({
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
          downloadElement.download = `${this.shortname+this.year+"年"+this.month+"月"}预算支出表.xls`; //下载后文件名
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
      this.year=this.date.split("-")[0]
        this.month=this.date.split("-")[1]
      this.getTableSource(this.year, this.month, false);
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