<template >
  <div>
    <div class='content_show'>
      <div class="choose_wrap">
        <span class="date_title">报表时间：</span>
        <el-date-picker
          v-model="nowYear"
          size="medium"
         type="year"
         format="yyyy"
          value-format="yyyy"
          clearable
        ></el-date-picker>
        <span style='margin-left: 10px;'>
          <el-button type="primary" size="medium"  @click="lookTable">查看</el-button>
        </span>
      </div>
      <div class="date_wrap">
        <div class="button_wrap" v-if="showButton">
          <el-button type="primary" size="medium" @click="changeEdit">{{showEdit?"保存":"编辑"}}</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          border
          row-key="ID"
            max-height='650'
             show-summary
              :summary-method="getSummaries"
          v-loading="loading"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          
           ref="filterTable"
          :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'left'
}"
        >
          <el-table-column prop="B_ACC_CODE" label="功能科目编码" 
           >
          </el-table-column>
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

import { lookNdysList } from "@/api/town/reportecon";
import { updateNdysList } from "@/api/town/reportecon";
import { constants } from 'fs';
export default {
  data() {
    return {
      showButton: false,
      loading: false,
      showEdit: false,
      tableData: [],
      showStatus:false,
 co_code:"",
      
     nowYear:""
     
    };
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
 //创建表格(查看)
    lookTable() {
      this.getDataSource(this.nowYear);
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
    getDataSource(year) {
        this.loading=true,
        lookNdysList({

           CO_CODE: this.co_code,
          FISCAL:year,
      })
        .then(response => {
           this.loading = false;
           this.tableData = response.dataList;
           this.showButton=true;
          this.showStatus=true;
            
        }).catch(err => {
            setTimeout(() => {
            this.loading = false;
            this.showButton = false;
            this.tableData = [];
              this.showStatus=false;
          }, 1500);
        });
    },
    updateDataSource() {
      updateNdysList(this.tableData).then(response => {
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
        if(q.length>6){
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
        }
        else{
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
let dd = new Date();
let y = dd.getFullYear();


return y;
}
  },
  created() {
    this.co_code=localStorage.getItem("CO_CODE")
  
    this.nowYear=this.GetDateStr()+""
     
  }
};
</script>
<style lang='scss' >



</style>