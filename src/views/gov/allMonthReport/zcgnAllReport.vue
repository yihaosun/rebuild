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
        <!-- <span class="down_wrap" @click="downTable">
          <svg-icon icon-class="down" />
        </span>-->
        <span style="margin-left: 25px;">
          <el-select
            v-model="value"
            placeholder="下载"
            :change="changeValue(value)"
            style="    width: 85px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span style="margin-left: 25px;">
          <el-button size="medium" @click="createTable" type="primary">一体化取数</el-button>
          <el-button size="medium" @click="createTable1" type="danger">用友取数</el-button>
        </span>
      </div>
      <div class="date_wrap">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          border
          row-key="B_ACC_CODE"
          v-loading="loading"
           show-summary
          :summary-method="getSummaries"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
        >
          <el-table-column prop="B_ACC_CODE" label="功能科目编码" width="150" fixed></el-table-column>
          <el-table-column prop="B_ACC_NAME" label="功能科目名称" width="150" fixed></el-table-column>
          <el-table-column prop="ALLMONEY" label="合计数" width="150" fixed></el-table-column>
          <el-table-column prop="MONEY1" label="马鞍镇" width="200"></el-table-column>
          <el-table-column prop="MONEY2" label="齐贤镇" width="200"></el-table-column>
          <el-table-column prop="MONEY3" label="安昌镇" width="200"></el-table-column>
          <el-table-column prop="MONEY4" label="钱清镇" width="200"></el-table-column>
          <el-table-column prop="MONEY5" label="杨汛桥" width="200"></el-table-column>
          <el-table-column prop="MONEY6" label="夏履" width="200"></el-table-column>
          <el-table-column prop="MONEY7" label="漓渚" width="200"></el-table-column>
          <el-table-column prop="MONEY8" label="福全" width="200"></el-table-column>
          <el-table-column prop="MONEY9" label="兰亭" width="200"></el-table-column>
          <el-table-column prop="MONEY10" label="平水" width="200"></el-table-column>
          <el-table-column prop="MONEY11" label="	王坛" width="200"></el-table-column>
          <el-table-column prop="MONEY12" label="稽东镇" width="200"></el-table-column>
          <el-table-column prop="MONEY13" label="柯桥街道" width="200"></el-table-column>
          <el-table-column prop="MONEY14" label="柯岩街道" width="200"></el-table-column>
          <el-table-column prop="MONEY15" label="	华舍街道" width="200"></el-table-column>
          <el-table-column prop="MONEY16" label="	湖塘街道" width="200"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { lookZcgnByYthList } from "@/api/gov/allMonthReport";
import { lookZcgnByYyList } from "@/api/gov/allMonthReport";
import { downZcgnByYthList } from "@/api/gov/allMonthReport";
import { downZcgnByYyList } from "@/api/gov/allMonthReport";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      date: "2019-07",
      options: [
        {
          value: "选项1",
          label: "一体化"
        },
        {
          value: "选项2",
          label: "用友"
        }
      ],
      value: ""
    };
  },

  methods: {
      getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        switch (column.property) {
          case "ALLMONEY":
            let allSum = 0;
            this.tableData.map(o => {
              if (o.ALLMONEY != null) {
                allSum += Number(o.ALLMONEY);
              }
            });
            sums[index] = allSum.toFixed(2) + "元";
            break;
            case "MONEY1":
            let allSum1 = 0;
            this.tableData.map(o => {
              if (o.MONEY1 != null) {
                allSum1 += Number(o.MONEY1);
              }
            });
            sums[index] = allSum1.toFixed(2) + "元";
            break;
            case "MONEY2":
            let allSum2 = 0;
            this.tableData.map(o => {
              if (o.MONEY2 != null) {
                allSum2 += Number(o.MONEY2);
              }
            });
            sums[index] = allSum2.toFixed(2) + "元";
            break;
             case "MONEY3":
            let allSum3 = 0;
            this.tableData.map(o => {
              if (o.MONEY3 != null) {
                allSum3 += Number(o.MONEY3);
              }
            });
            sums[index] = allSum3.toFixed(2) + "元";
            break;
             case "MONEY4":
            let allSum4 = 0;
            this.tableData.map(o => {
              if (o.MONEY4 != null) {
                allSum4 += Number(o.MONEY4);
              }
            });
            sums[index] = allSum4.toFixed(2) + "元";
            break;
             case "MONEY5":
            let allSum5 = 0;
            this.tableData.map(o => {
              if (o.MONEY5 != null) {
                allSum5 += Number(o.MONEY5);
              }
            });
            sums[index] = allSum5.toFixed(2) + "元";
            break;
             case "MONEY6":
            let allSum6 = 0;
            this.tableData.map(o => {
              if (o.MONEY6 != null) {
                allSum6 += Number(o.MONEY6);
              }
            });
            sums[index] = allSum6.toFixed(2) + "元";
            break;
              case "MONEY7":
            let allSum7= 0;
            this.tableData.map(o => {
              if (o.MONEY7 != null) {
                allSum7 += Number(o.MONEY7);
              }
            });
            sums[index] = allSum7.toFixed(2) + "元";
            break;
             case "MONEY8":
            let allSum8= 0;
            this.tableData.map(o => {
              if (o.MONEY8 != null) {
                allSum8 += Number(o.MONEY8);
              }
            });
            sums[index] = allSum8.toFixed(2) + "元";
            break;
             case "MONEY9":
            let allSum9= 0;
            this.tableData.map(o => {
              if (o.MONEY9 != null) {
                allSum9 += Number(o.MONEY9);
              }
            });
            sums[index] = allSum9.toFixed(2) + "元";
            break;
             case "MONEY10":
            let allSum10= 0;
            this.tableData.map(o => {
              if (o.MONEY10 != null) {
                allSum10 += Number(o.MONEY10);
              }
            });
            sums[index] = allSum10.toFixed(2) + "元";
            break;
             case "MONEY11":
            let allSum11= 0;
            this.tableData.map(o => {
              if (o.MONEY11 != null) {
                allSum11 += Number(o.MONEY11);
              }
            });
            sums[index] = allSum11.toFixed(2) + "元";
            break;
            case "MONEY12":
            let allSum12= 0;
            this.tableData.map(o => {
              if (o.MONEY12 != null) {
                allSum12 += Number(o.MONEY12);
              }
            });
            sums[index] = allSum12.toFixed(2) + "元";
            break;
             case "MONEY13":
            let allSum13= 0;
            this.tableData.map(o => {
              if (o.MONEY13 != null) {
                allSum13 += Number(o.MONEY13);
              }
            });
            sums[index] = allSum13.toFixed(2) + "元";
            break;
             case "MONEY14":
            let allSum14= 0;
            this.tableData.map(o => {
              if (o.MONEY14 != null) {
                allSum14 += Number(o.MONEY14);
              }
            });
            sums[index] = allSum14.toFixed(2) + "元";
            break;
            case "MONEY15":
            let allSum15= 0;
            this.tableData.map(o => {
              if (o.MONEY15 != null) {
                allSum15 += Number(o.MONEY15);
              }
            });
            sums[index] = allSum15.toFixed(2) + "元";
            break;
             case "MONEY16":
            let allSum16= 0;
            this.tableData.map(o => {
              if (o.MONEY16 != null) {
                allSum16 += Number(o.MONEY16);
              }
            });
            sums[index] = allSum16.toFixed(2) + "元";
            break;
          default:
            sums[index] = "--";
            break;
        }
      });
      return sums;
    },
    changeValue(e) {
      //一体化下载
      if (e == "选项1") {
       
         let a = this.date.split("-");
      downZcgnByYthList({
        FISCAL: a[0],
        FIS_PERD: a[1],
        STATUS: "2",
      })
        .then(response => {
       
        var blob = new Blob([response], {
          type: "application/vnd.ms-excel;charset=utf-8"
          }); //指定格式为vnd.ms-excel
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "xxx.xls"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});
      }
      //用友下载
      else if (e == "选项2") {
  let a = this.date.split("-");
 
      downZcgnByYyList({
        FISCAL: a[0],
        FIS_PERD: a[1],
        STATUS: "2",
      })
        .then(response => {
         
          var blob = new Blob([response], {
            type: "application/vnd.ms-excel;charset=utf-8"
          }); //指定格式为vnd.ms-excel
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "xxx.xls"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});

      }
    },
    //下载
    downTable() {
      let a = this.date.split("-");
      downJfzcList({
        CO_CODE: "606001",
        FISCAL: a[0],
        FIS_PERD: a[1],
        STATUS: "2",
        SHORTNAME: "柯桥区齐贤街道财政"
      })
        .then(response => {
          var blob = new Blob([response], {
            type: "application/vnd.ms-excel;charset=utf-8"
          }); //指定格式为vnd.ms-excel
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "xxx.xls"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});
    },

    //创建表格(一体化)
    createTable() {
      let a = this.date.split("-");
      this.loading = true;
      lookZcgnByYthList({
        FISCAL: a[0],
        FIS_PERD: a[1],
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
    //创建表格(用友)
    createTable1() {
      let a = this.date.split("-");
      this.loading = true;
      lookZcgnByYyList({
        FISCAL: a[0],
        FIS_PERD: a[1],
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

    getDataSource(year, month, flag) {
      //   getJfzcList({
      //     CO_CODE: "606001",
      //     FISCAL: year,
      //     FIS_PERD: month,
      //     STATUS: "1"
      //   })
      //     .then(response => {
      //       this.loading = false;
      //       this.tableData = response.dataList;
      //     })
      //     .catch(err => {
      //       setTimeout(() => {
      //         this.loading = false;
      //         this.showButton = false;
      //         this.tableData = [];
      //       }, 1500);
      //     });
    }
  },
  created() {}
};
</script>
<style lang='scss'  >


</style>