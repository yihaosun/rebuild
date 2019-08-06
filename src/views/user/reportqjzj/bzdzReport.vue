<template>
  <div class="content_show">
    <div class="tab_wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="已上传" name="1">
          <div class="pagination_wrap">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="0"
              :total="tableData.length"
            ></el-pagination>
          </div>

          <el-table
            :data="tableData.slice((currpage-1)*pageSize, currpage*pageSize)"
            border
            style="width: 100%"
            v-loading="loading"
            height="650"
            :cell-style="{ 
                'text-align': 'center'
            }"
            :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
          >
            <el-table-column label="序号" prop="ID" width="120" fixed></el-table-column>
            <el-table-column prop="CPROGRAMNAME" label="项目名称" width="300" fixed
             :render-header="renderHeader"
             >
            </el-table-column>
            <el-table-column prop="FILENO" label="文号" width="220" fixed  :render-header="renderHeader1">
              
            </el-table-column>
            <el-table-column prop="FILENAME" label="文件列表" width="450">
              <template slot-scope="scope">
                <div
                  style="color: rgb(0, 122, 217);font-weight: 500;font-size: 15px;cursor:pointer;text-decoration:underline"
                  @click="showDialog(scope.row.FILENO)"
                >{{scope.row.FILENAME}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="CFUNCTION" label="功能科目" width="180"></el-table-column>
            <el-table-column prop="CRESOURCE" label="资金来源" width="150"></el-table-column>
            <el-table-column prop="CENTERPRISENAME" label="付款单位" width="150"></el-table-column>
            <el-table-column prop="IMONEY" label="金额" width="150"></el-table-column>
            <el-table-column prop="date" label="收款人" width="150"></el-table-column>
            <el-table-column prop="date" label="收款账号" width="150"></el-table-column>
            <el-table-column prop="date" label="收款银行" width="150"></el-table-column>
            <el-table-column prop="SZTYPE" label="收支类型" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="未上传" name="2">
             <div class="pagination_wrap">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="0"
              :total="tableData1.length"
            ></el-pagination>
          </div>
          <el-table
            :data="tableData1.slice((currpage1-1)*pageSize1, currpage1*pageSize1)"
            border
            style="width: 100%"
            v-loading="loading"
            height="650"
            :cell-style="{ 
                'text-align': 'center'
            }"
          
            :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
          >
            <el-table-column label="序号" prop="ID" width="120" fixed></el-table-column>
            <el-table-column prop="CPROGRAMNAME" label="项目名称" width="220" fixed
              :render-header="renderHeader"
            >
            </el-table-column>
            <el-table-column prop="FILENO" label="文号" width="220" fixed   :render-header="renderHeader1">
            
            </el-table-column>
            <el-table-column prop="FILENAME" label="文件列表" width="150"></el-table-column>
            <el-table-column prop="CFUNCTION" label="功能科目" width="180"></el-table-column>
            <el-table-column prop="CRESOURCE" label="资金来源" width="150"></el-table-column>
            <el-table-column prop="CENTERPRISENAME" label="付款单位" width="150"></el-table-column>
            <el-table-column prop="IMONEY" label="金额" width="150"></el-table-column>
            <el-table-column prop="date" label="收款人" width="150"></el-table-column>
            <el-table-column prop="date" label="收款账号" width="150"></el-table-column>
            <el-table-column prop="date" label="收款银行" width="150"></el-table-column>
            <el-table-column prop="SZTYPE" label="收支类型" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="下载列表" :visible.sync="dialogVisible" width="30%">
      <div>
        <span>文件列表:</span>
        <div>
          <el-select v-model="value" placeholder="请选择" style="width: 100%; margin-top: 20px;">
            <el-option
              v-for="item in options"
              :key="item.PNO"
              :label="item.FILENAME"
              :value="item.PNO"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="makeSure()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getBzdzList } from "@/api/town/qjzjReport";
import { getBzdzFile } from "@/api/town/qjzjReport";
import { downBzdzFile } from "@/api/town/qjzjReport";
import { MessageBox, Message } from "element-ui";
export default {
  data() {
    return {
      activeName: "1",
      year: "2019",
      saveTableDate:[],
      tableData: [],
       saveTableDate1: [],
      tableData1: [],
      currpage: 1,
      pageSize: 10,
      currpage1: 1,
      pageSize1: 10,
      loading: false,
      dialogVisible: false,
      options: [],
      value: "",
      search:"",
      visible:false,
      index:""
    };
  },
  methods: {
   //自定义头部
     renderHeader1(h,param , index) {
            return (
                <span>
                    <span >文号</span>
                   
                    <el-popover placement='bottom' width='200' height='200' trigger="click"  style='float:right'>
                        <span slot="reference">
                            <i class="el-icon-search" style='color:white'></i>
                        </span>
                        <el-input size='small' v-model={this.search} placeholder='请输入内容'></el-input>
                        <div class='el-table-filter__bottom' style='    padding: 10px 0px 0px 0px;'>
                                <el-button size="small" style='background-color: #409eff;padding: 5px 10px;color: white;margin-right:10px' on-click={this.fliterTable} >筛选</el-button>
                               <el-button size="small" style='background-color: #f56c6c;padding: 5px 10px;color: white;' on-click={this.clearSearch} >重置</el-button>
                        </div>
                    </el-popover>
                </span>
            );
        },


    //自定义头部
     renderHeader(h,param , index) {
            return (
                <span>
                    <span >项目名称</span>
                   
                    <el-popover placement='bottom' width='200' height='200' trigger="click"  style='float:right'>
                        <span slot="reference">
                            <i class="el-icon-search" style='color:white'></i>
                        </span>
                        <el-input size='small' v-model={this.search} placeholder='请输入内容'></el-input>
                        <div class='el-table-filter__bottom' style='    padding: 10px 0px 0px 0px;'>
                                <el-button size="small" style='background-color: #409eff;padding: 5px 10px;color: white;margin-right:10px' on-click={this.fliterTable} >筛选</el-button>
                               <el-button size="small" style='background-color: #f56c6c;padding: 5px 10px;color: white;' on-click={this.clearSearch} >重置</el-button>
                        </div>
                    </el-popover>
                </span>
            );
        },
         clearSearch() {
            this.search = '';
            if(this.activeName=='1'){
             this.tableData=this.saveTableDate;   
             }else{
                 this.tableData1=this.saveTableDate1;   
             }
           
        },
        fliterTable(){
          console.log(this.search)
          if(this.activeName=='1'){
          let a=this.tableData.filter(item=>(item.CPROGRAMNAME).indexOf(this.search)>-1);
          this.tableData=a;
          }
          else{
let a=this.tableData1.filter(item=>(item.CPROGRAMNAME).indexOf(this.search)>-1);
          this.tableData1=a;
          }
          this.search=''
        },


    makeSure() {
      this.dialogVisible = false;
      console.log(this.value);
      if (this.value == "") {
        Message({
          message: "请选择文件列表",
          type: "error"
        });
      } else {
        //确定进行下载
        downBzdzFile({
          PNO: this.value
        })
          .then(response => {
            console.log(response);
            let a = this.options.find(o => {
              if (o.PNO == this.value) {
                return o;
              }
            });
            let fileType = ";";
            let b = a.FILENAME.split(".")[1];
            let c = a.FILENAME.split(".")[0];
            if (b == "doc" || "docx") {
              fileType = "application/msword;charset=UTF-8";
            } else if (b == "xls" || "xlsx") {
              fileType = "application/vnd.ms-excel;charset=utf-8";
            }
            console.log(fileType);
            var blob = new Blob([response], {
              type: fileType
            }); //指定格式为vnd.ms-excel
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            if (b == "doc" || "docx") {
              downloadElement.download = `${c}.${b}`; //下载后文件名
            } else if (b == "xls" || "xlsx") {
              downloadElement.download = `${c}.${b}`; //下载后文件名
            }
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          })
          .catch(err => {});
      }
    },
    showDialog(fileNo) {
      getBzdzFile({
        FILENO: fileNo
      }).then(response => {
        this.dialogVisible = true;
        this.options = response.dataList;
      });
    },
     //分页
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize1 = val;
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.currpage1 = val;
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currpage = val;
    },
    handleClick(tab, event) {
      if (tab.name == "1") {
        if (this.tableData.length > 0) {
        } else {
          this.getDataSource(this.year,tab.name)
        }
      } else if (tab.name == "2") {
        if (this.tableData1.length > 0) {
        } else {
           this.getDataSource(this.year,tab.name)
        }
      }
    },
    getDataSource(year, activeName) {
      this.loading = true;
      getBzdzList({
        IYEAR: year,
        STATUS: activeName,
        TYPE: "2",
        SHORTNAME: "齐贤街道"
      }).then(response => {
        if(activeName=='1'){
           this.tableData = response.dataList;
           this.saveTableDate=response.dataList;
        }else{
           this.tableData1 = response.dataList;
            this.saveTableDate1=response.dataList;
        }
       
        if (response) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      });
    }
  },
  created() {
    this.getDataSource(this.year, this.activeName);
  }
};
</script>
<style lang="scss">
.tab_wrap {
  position: relative;
}
.pagination_wrap {
  text-align: right;
  padding: 10px;
}
</style>

