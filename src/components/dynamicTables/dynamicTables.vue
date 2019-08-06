<template>
  <div>
    <div
      style="    text-align: right;
         margin-bottom: 5px;
            padding-right: 5px;"
      v-if="showButton"
    >
      <el-button type="primary" size="medium" @click="changeEdit">{{isEditor?"保存":"编辑"}}</el-button>
    </div>
    <div class="table_wrap" v-loading="loading">
      <!-- 滚动组件 -->
      <el-table
        class="showTable"
        :data="tableData"
        border
        max-height="600"
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
        :header-cell-style="{
    'background-color': '#409eff',
     'color':' #fff',
      'border-bottom': '1px solid #fff',
       'text-align': 'center',
       'height':'30px!important'
       
}"
      >
        <v-column
          v-for="(item,index) in tableHead"
          :key="index"
          :col="item"
          :index="index"
          :isEditor="isEditor"
        ></v-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getYszxList } from "../../api/town/reportecon";
import { lookYszxList } from "../../api/town/reportecon";
import { updateYszxList } from "../../api/town/reportecon";
import { downYszxList } from "../../api/town/reportecon";
import column from "../myColumn/myColumn";
export default {
  mounted() {},
  computed: {},
  //  props: ['newDate'],
  data() {
    return {
      // 加载中
      loading: false,
      //表头
      tableHead: null,
      //表格数据
      tableData: [],
     
      showButton: false,
      isEditor: false,
       co_code:"",
      shortname:"",
      cpostguid:"",
       year:"",
      month:"",

    };
  },
  //组件注册
  components: {
    "v-column": column
  },
  methods: {
  
 //下载
    downTable(year,month) {
      downYszxList({
        CO_CODE: this.co_code,
        FISCAL: year,
        FIS_PERD:month,
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
          downloadElement.download = `${this.shortname+this.year+"年"+this.month+"月"}预算执行表月报.xls`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {

        });
    },


    //合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          if (index == 7) {
           
            let a = (Number(sums[6]) / Number(sums[5])) * 100;
            sums[7] = a.toFixed(2);
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          }
        } else {
          sums[index] = "---";
        }
      });
      return sums;
    },

    updateDataSource() {
    this.loading=true;
 updateYszxList(this.tableData).then(response => {
        if (response) {
          setTimeout(() => {
            this.loading = false;
            this.isEditor=false;
          }, 1000);
        }
      }).catch(err=>{

      })
    },

    //编辑
    changeEdit() {
      //保存的时候
      if (this.isEditor) {
       this.updateDataSource();

      }
        this.isEditor = !this.isEditor;
    },
    getTableSource(year, month,flag) {
      this.loading = true;
      if(flag){
      getYszxList({
          CO_CODE: this.co_code,
          FISCAL: year,
          FIS_PERD: month
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
    }else{
       lookYszxList({
         CO_CODE: this.co_code,
          FISCAL: year,
          FIS_PERD: month,
          STATUS: "1",
          CPOSTGUID: this.cpostguid
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
         GetDateStr() {
var dd = new Date();
var y = dd.getFullYear();
var m = dd.getMonth()+1;//获取当前月份的日期

return y+"-"+m;
}
  },
  //数据发生变化的时候进行监听
  watch: {},
  created() {
     this.co_code=localStorage.getItem("CO_CODE")
    this.shortname=localStorage.getItem("SHORTNAME1")
    this.cpostguid=localStorage.getItem("CPOSTGUID")
      this.date=this.GetDateStr();
    let a=this.date.split("-");
    console.log(a)
    this.year=a[0];
    this.month=a[1];
    this.tableHead = [
      {
        label: "编码",
        property: "B_ACC_CODE"
      },
      {
        label: "支出科目",
        property: "B_ACC_NAME"
      },
      {
        label: "公共财政预算支出",
        children: [
          {
            label: " 支出预算计划",
            children: [
              {
                label: "年初预算",
                property: "MONEY1"
              },
              {
                label: "科目调整",
                property: "MONEY2"
              },
              {
                label: "上级补助",
                property: "MONEY3"
              },
              {
                label: "小计",
                property: "MONEY4"
              }
            ]
          },
          {
            label: "累计支出",
            property: "MONEY6"
          },
          {
            label: "占计划%",
            property: "PLAN"
          }
        ]
      },
      {
        label: " 上年年支出",
        children: [
          {
            label: "累计支出",
            property: "MONEY8"
          }
        ]
      },
      {
        label: " 同比增减(%)",
        children: [
          {
            label: "累计增减",
            property: "INDECREASE2"
          }
        ]
      }
    ];
  }
};
// 在vue文件中的style标签上，有一个特殊的属性：scoped。当一个style标签拥有scoped属性时，它的CSS样式就只能作用于当前的组件，也就是说，该样式只能适用于当前组件元素。
//通过该属性，可以使得组件之间的样式不互相污染。如果一个项目中的所有style标签全部加上了scoped，相当于实现了样式的模块化。
</script>

<style lang="scss" >
.pagination_wrap {
  margin-top: 2rem;
}
</style>

