<template >
  <div>
    <div class='content_show'>
      <div class="choose_wrap">
        <span class="date_title">上报单位：</span>
        <el-select v-model="CO_CODE" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.CO_CODE"
            :label="item.CO_NAME"
            :value="item.CO_CODE"
          ></el-option>
        </el-select>

        <span class="date_title" style="margin-left:20px">报表时间：</span>
        <el-date-picker
          v-model="date"
          size="medium"
          type="month"
          clearable
          format="yyyy-MM"
          value-format="yyyy-MM"
        ></el-date-picker>
        <span style="    margin-left: 10px;">
          <el-button type="primary" size="medium" @click="lookTable">查看</el-button>
          <el-button size="medium" @click="showmessage" type="danger">退回报表</el-button>
           <el-dialog title="操作提示" :visible.sync="dialogVisible" width="28%">
            <span>确认退回报表?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="makeSure">确 定</el-button>
            </span>
          </el-dialog>
        </span>
      </div>
      <div class="date_wrap">
        <div class="button_wrap" v-if="showButton">
          <el-button type="primary" size="medium" @click="changeEdit">{{showEdit?"保存":"编辑"}}</el-button>
          <el-button type="primary" size="medium" @click="commitTable">确认</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="ID"
          border
          v-loading="loading"
          show-summary
          :summary-method="getSummaries"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'left'
}"
        >
          <el-table-column prop="B_ACC_CODE" label="功能科目编码"></el-table-column>
          <el-table-column prop="B_ACC_NAME" label="功能科目名称"></el-table-column>
          <el-table-column prop="QCZ_STAD_AMT" label="金额" width="300">
            <template slot-scope="scope">
              <div v-if="showEdit">
                <el-input
                  v-model="scope.row.QCZ_STAD_AMT"
                  :disabled="true"
                  v-if="scope.row.IS_LOWEST=='N'"
                ></el-input>
                <el-input
                  @input="handleClick(scope.$index,scope.row)"
                  v-model="scope.row.QCZ_STAD_AMT"
                  v-if="scope.row.IS_LOWEST!='N'"
                  type="number"
                  clearable
                ></el-input>
              </div>
              <div v-if="!showEdit" style="text-align:right">{{scope.row.QCZ_STAD_AMT}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { lookGnkmList } from "@/api/gov/reportappear";
import { dropDownGnkmList } from "@/api/gov/reportappear";
import { saveGnkmList } from "@/api/gov/reportappear";
import { commitGnkmList } from "@/api/gov/reportappear";
import { backGnkmList } from "@/api/gov/reportappear";

export default {
  data() {
    return {
      showButton: false,
      loading: false,
      showEdit: false,
      tableData: [],
      date: "2019-07",
      options: [],
      CO_CODE: "",
    dialogVisible: false,
    };
  },

  methods: {
    //确认上报
    commitTable() {
      let a = this.date.split("-");
      this.loading = true;
      commitGnkmList({
        list: this.tableData,
        CO_CODE: this.CO_CODE,
        FISCAL: a[0],
        FIS_PERD: a[1],
        STATUS: "3"
      })
        .then(response => {
          this.loading = false;
          this.showButton = false;
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        });
    },


    showmessage()
    {
     this.dialogVisible=true;
    },

    makeSure() {
  this.loading = true;
      backGnkmList(this.tableData)
        .then(response => {
  this.loading = false;
   this.dialogVisible=false
        })
        .catch(err => {

             setTimeout(() => {
            this.loading = false;
            this.dialogVisible=false
          }, 1500);
        });
    },

    //查看报表
    lookTable() {
      if (this.CO_CODE == "") {
        this.$alert("上报单位不能为空", "警告", {
          confirmButtonText: "确定"
        });
      } else {
        let a = this.date.split("-");
        this.loading = true;
        this.getDataSource(this.CO_CODE, a[0], a[1]);
      }
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
          case "QCZ_STAD_AMT":
            let allSum = 0;
            this.tableData.map(o => {
              if (o.QCZ_STAD_AMT != null) {
                allSum += Number(o.QCZ_STAD_AMT);
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
    getDataSource(code, year, month) {
      //查看
      lookGnkmList({
        CO_CODE: code,
        FISCAL: year,
        FIS_PERD: month,
        STATUS: "1",
        CPOSTGUID: "04"
      })
        .then(response => {
          this.loading = false;
          this.tableData = response.dataList;
          this.showButton = true;
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false;
            this.showButton = false;
            this.tableData = [];
          }, 1500);
        });
    },
    //保存
    updateDataSource() {
      saveGnkmList({
        list: this.tableData,
        STATUS: "1"
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
            if (o.QCZ_STAD_AMT != null) {
              subSum += Number(o.QCZ_STAD_AMT);
            }
          });
          b[0].QCZ_STAD_AMT = subSum.toFixed(2);
          let sum = 0;
          a[0].children.map(o => {
            if (o.QCZ_STAD_AMT != null) {
              sum += Number(o.QCZ_STAD_AMT);
            }
          });
          a[0].QCZ_STAD_AMT = sum.toFixed(2);
        } else {
          let sum = 0;
          a[0].children.map(o => {
            if (o.QCZ_STAD_AMT != null) {
              sum += Number(o.QCZ_STAD_AMT);
            }
          });
          a[0].QCZ_STAD_AMT = sum.toFixed(2);
        }
      }
    }
  },
  created() {
    //下拉资源
    dropDownGnkmList()
      .then(response => {
        this.options = response.dataList;
      })
      .catch(err => {});
  }
};
</script>
<style lang='scss' >

.date_title {
  font-size: 0.9rem;
}

</style>