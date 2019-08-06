<template>
<div>
    <vbt-table border
               stripe
                row-key="ID" 
               size="mini"
               isBigData
               isTreeTable
                show-summary
    style="width: 100%"
               highlight-hover-row
               max-height="600"
               :data="tableData">
      <vbt-table-column  prop="B_ACC_CODE" label="编码" width="140" 
                        fixed="left">
      </vbt-table-column>
      <vbt-table-column prop="B_ACC_NAME" label="支出科目" width="100">
                        
                   
                     <template slot-scope="scope">
                    <div v-if="isEditor">
                      <el-input v-model="scope.row.B_ACC_NAME"  size="small "></el-input>
                    </div>
                    <div v-if="!isEditor">{{scope.row.MONEY1}}</div>
                  </template>
                  
                
      </vbt-table-column>
    
      <vbt-table-column prop="age"
                        label="Age"
                        width="200">
      </vbt-table-column>
      <vbt-table-column prop="role"
                        label="role"
                        width="200">
      </vbt-table-column>
      <vbt-table-column prop="language"
                        label="language"
                        width="200">
      </vbt-table-column>
      <vbt-table-column prop="rate"
                        label="rate"
                        width="200">
      </vbt-table-column>
      <vbt-table-column prop="address"
                        label="Address"
                        fixed="right"
                        show-overflow-tooltip
                        min-width="300">
      </vbt-table-column>
    </vbt-table>
   <el-button type="primary" size="medium" @click="changeEdit">{{isEditor?"保存":"编辑"}}</el-button>
</div>
</template>
<script>
import vbtTable from '../../../components/bigTreeTable/table'
import vbtTableColumn from '../../../components/bigTreeTable/table-column.js'
import { setTimeout } from 'timers';
import { getYszcList } from "@/api/town/reportecon";

export default {
  components: { vbtTable, vbtTableColumn },
 
  data() {
    return {
      tableData: [],
      isEditor: false,
    }
  },
 
  methods: {


      //编辑
    changeEdit() {
      //保存的时候
      if (this.isEditor) {
        //this.updateDataSource();
            this.isEditor = false
      } else {
          console.log("dfdf")
         this.isEditor = true
      }
  
    },
    // load(row, resolve) {
    //   setTimeout(() => {
    //     resolve(mockData(30, `${row.id}000`))
    //   }, 1000)
    // }
  },
 created() {
     getYszcList({
          FISCAL: '2019',
          FIS_PERD: '07',
          CO_CODE: "606002"
        })
          .then(response => {
            this.tableData = response.dataList;
           
          })
          .catch(err => {
            
          });
 }
}
</script>
<style scoped>
.wrap {
  width: 1200px;
  margin: 20px auto;
}
</style>
 
