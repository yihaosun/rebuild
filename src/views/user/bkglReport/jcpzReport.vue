<template >
  <div style="    padding: 15px;">
    <div class="header">
      <el-button type="primary" size="small" icon="el-icon-edit" @click="addNewData">新增</el-button>
      <el-button
        type="primary"
        icon="el-icon-folder-checked"
        size="small"
        @click="uploadFile"
      >导入excel</el-button>
      <el-button type="primary" size="small" icon="el-icon-download" @click="downTemplate">模版下载</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteDateSource">删除</el-button>
    </div>
    <div class="content_wrap">
      <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
        <el-tab-pane label="用途模块" name="0">
          <el-table
            ref="multipleTable"
            :data="tableData.slice((currpage-1)*pageSize, currpage*pageSize)"
            tooltip-effect="dark"
            style="width: 100%"
            border
            v-loading="loading"
            :cell-style="{
                     'text-align': 'center'}"
            :header-cell-style="{'background-color':'rgb(57, 135, 216)','color':' #fff','border-bottom': '1px solid #fff','text-align': 'center','border-right': '1px solid #fff',}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="序号" width="200" fixed type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="PURPOSENAME" label="用途名称" fixed show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="pagination_wrap">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="20"
              layout="sizes, prev, pager, next"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label=" 付款单位 " name="1">
          <el-table
            ref="multipleTable1"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            border
            v-loading="loading"
            :cell-style="{
                     'text-align': 'center'}"
            :header-cell-style="{'background-color':'rgb(57, 135, 216)','color':' #fff','border-bottom': '1px solid #fff','text-align': 'center','border-right': '1px solid #fff',}"
            @selection-change="handleSelectionChange1"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" width="200" fixed type="index" :index="indexMethod1"></el-table-column>
            <el-table-column prop="PAYBANKNO" label="账户" fixed show-overflow-tooltip></el-table-column>
            <el-table-column prop="PAYBANKNAME" label="开户银行" fixed show-overflow-tooltip></el-table-column>
            <el-table-column prop="ENAME" label="付款单位" fixed show-overflow-tooltip></el-table-column>
          </el-table>

          <div class="pagination_wrap">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="20"
              layout="sizes, prev, pager, next"
              :total="tableData1.length"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label=" 收款单位 " name="2">
          <el-table
            ref="multipleTable2"
            :data="tableData2.slice((currpage2-1)*pageSize2, currpage2*pageSize2)"
            tooltip-effect="dark"
            style="width: 100%"
            border
            v-loading="loading"
            :cell-style="{
                     'text-align': 'center'}"
            :header-cell-style="{'background-color':'rgb(57, 135, 216)','color':' #fff','border-bottom': '1px solid #fff','text-align': 'center','border-right': '1px solid #fff',}"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="序号" width="200" fixed type="index" :index="indexMethod2"></el-table-column>
            <el-table-column prop="RECBANKNO" label="账户" fixed show-overflow-tooltip></el-table-column>
            <el-table-column prop="RECBANKNAME" label="开户银行" fixed show-overflow-tooltip></el-table-column>
            <el-table-column prop="RECNAME" label="收款单位" fixed show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="pagination_wrap">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="20"
              layout="sizes, prev, pager, next"
              :total="tableData2.length"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 朦胧层 -->
    <el-dialog :title="titleContent" :visible.sync="dialogTableVisible" width="45%">
      <div class="tableContent">
        <div class="pay_wrap" v-if="activeTabsName=='0'" style="text-align: center;">
          <div>
            <span style="margin-right:15px">用途名称:</span>
            <el-input style="width: 50%;margin-right:10px" v-model="purpose" placeholder="请输入用途名称"></el-input>
          </div>
        </div>
        <div class="pay_wrap" v-if="activeTabsName=='1'" style="text-align: center;">
          <div>
            <span style="margin-right:15px">付款单位全称:</span>
            <el-input
              style="width: 50%;margin-right:10px"
              v-model="paymentName"
              placeholder="请输入付款单位全称"
            ></el-input>
          </div>
          <div style="    margin-top: 20px;">
            <span style="margin-right:15px">付款单位账户:</span>
            <el-input
              style="width: 50%;margin-right:10px"
              v-model="paymentAccount"
              placeholder="请输入付款单位账户"
            ></el-input>
          </div>
          <div style="margin-top: 20px;">
            <span style="margin-left: -20px;padding-right: 10px;">付款单位开户银行:</span>
            <el-input
              style="width: 50%;margin-right:10px"
              v-model="paymentBankName"
              placeholder="请输入付款单位开户银行"
            ></el-input>
          </div>
        </div>
        <div class="recive_wrap" v-if='activeTabsName=="2"' style="text-align: center;">
          <div>
            <span style="margin-right:15px">收款单位全称:</span>
            <el-input
              style="width: 50%;margin-right:10px"
              v-model="reciveName"
              placeholder="请输入收款单位全称"
            ></el-input>
          </div>
          <div style="    margin-top: 20px;">
            <span style="margin-right:15px">收款单位账户:</span>
            <el-input
              style="width: 50%;margin-right:10px"
              v-model="reciveAccount"
              placeholder="请输入收款单位账户"
            ></el-input>
          </div>
          <div style="margin-top: 20px;">
            <span style="margin-left: -20px;padding-right: 10px;">收款单位开户银行:</span>
            <el-input
              style="width: 50%;margin-right:10px"
              v-model="reciveBankName"
              placeholder="请输入收款单位开户银行"
            ></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDateSource" :loading="loadingFlag">添加</el-button>
      </span>
    </el-dialog>
<el-dialog :title="uploadTitle" :visible.sync="dialogTableVisible1" :before-close="clearBack" width="45%">
      <div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="123"
          :http-request="uploadSectionFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">
            <i class="el-icon-upload el-icon--right"></i>选取文件
          </el-button>
             <div slot="tip" class="el-upload__tip">一次性只能上传1个文件,只能上传.xls!!!<span style='color:red;margin-left:10px'>上传.xlsx可能会报错!</span></div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload" :loading="uploadLoadingFlag">确认上传</el-button>
        <el-button @click="clearBack">返回</el-button>
      </span>
    </el-dialog>
    

  </div>
</template>
<script>
//获取用途模块的信息
import { getpurposeList } from "@/api/town/jcpeReport";
//获取收款单位的信息
import { getReciveBankList } from "@/api/town/jcpeReport";
//获取付款单位的信息
import { getPayBankList } from "@/api/town/jcpeReport";

//收款单位添加
import { addReciveBankName } from "@/api/town/jcpeReport";
//付款单位添加
import { payBankName } from "@/api/town/jcpeReport";
//用途添加
import { addPurposeNameList } from "@/api/town/jcpeReport";

//用途模块下载
import { downPurposeList } from "@/api/town/jcpeReport";

//付款单位模块下载
import { downPayBankList } from "@/api/town/jcpeReport";

//收款单位模块下载
import { downReciveBankList } from "@/api/town/jcpeReport";
//用途模块删除
import { deletePurposeList } from "@/api/town/jcpeReport";
//付款单位模块删除
import { deletePayBankList } from "@/api/town/jcpeReport";

//收款单位模块删除
import { deleteReciveBankList } from "@/api/town/jcpeReport";

import { MessageBox, Message } from "element-ui";
import axios from "axios";

export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible1: false,
      activeTabsName: "0",
      cbmunitid: "",
      power: "",
      year: "",
      loading: false,
      nickName: "",
      multipleSelection: [],
      multipleSelection1: [],
      multipleSelection2: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      titleContent: "",
      uploadTitle:"",

      reciveName: "",
      reciveAccount: "",
      reciveBankName: "",

      paymentName: "",
      paymentAccount: "",
      paymentBankName: "",

      purpose: "",
      fileList:[],

      loadingFlag: false,
      uploadLoadingFlag:false,

      currpage: 1,
      pageSize: 20,
      currpage1: 1,
      pageSize1: 20,
      currpage2: 1,
      pageSize2: 20
    };
  },

  methods: {
 clearBack() {
      //清空上传的文件
      this.dialogTableVisible1 = false;
      
      this.$refs.upload.clearFiles();
      //重新调用
       this.getDateSource(this.activeTabsName);
    },


    //导入（上传）
    uploadFile() {
      this.dialogTableVisible1=true;
      if(this.activeTabsName=='0'){
        this.uploadTitle='选择上传用途模块的excel'
      }else if(this.activeTabsName=='1'){
         this.uploadTitle='选择上传付款单位的excel'
      }
      else if(this.activeTabsName=='2'){
         this.uploadTitle='选择上传收款单位的excel'
      }
    },
     submitUpload() {
      this.$refs.upload.submit();
    },
     uploadSectionFile(option) {
      this.uploadLoadingFlag = true;
      const self = this;
      let file = option.file;
      let type = file.type;
      let size = file.size;
      let pos = file.name.lastIndexOf(".");
      let filename = file.name.substring(0, pos);
      let extendName = file.name.substring(pos + 1);

      let isLt2M = size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("只能上传文件大小小于2M");
        return;
      }
      let formData = new FormData();

       let cpostguid = localStorage.getItem("CPOSTGUID");
      //将文件转换成二进制
      formData.append("upfile", file);
      formData.append("CBMUNITID", this.cbmunitid);
      formData.append("OPERATOR", this.nickName);
       formData.append("C_YEAR", this.year);
         formData.append("POWER", this.power);
          formData.append("CPOSTGUID", cpostguid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let address=''
      if(this.activeTabsName=='0'){
          address=`${process.env.VUE_APP_BASE_API}/purpose/import`
      }else if(this.activeTabsName=='1'){
          address=`${process.env.VUE_APP_BASE_API}/paybank/import`
      }else if(this.activeTabsName=='2'){
          address=`${process.env.VUE_APP_BASE_API}/CapitalAdmin/recbank/import`
      }
      axios
        .request({
          url: address,
          method: "post",
          data: formData,
          config,
          onUploadProgress: progressEvent => {
            const complete =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            option.onProgress({ percent: complete });
          }
        })
        .then(res => {
          setTimeout(() => {
            option.onSuccess(); // 上传成功的图片会显示绿色的对勾
            this.uploadLoadingFlag = false;
          }, 3000);

          console.log("上传成功");
        })
        .catch(response => {
          console.log("上传失败");
          option.onError();
           this.uploadLoadingFlag = false;
        });
    },

handleRemove(file, fileList) {
      console.log(file, fileList);
    },
      handlePreview(file) {
      console.log(file);
    },
handleExceed(files, fileList) {
      this.$message.warning("当前限制选择 1 个文件；");
    },

    //删除
    deleteDateSource() {
      if (this.activeTabsName == "0") {
        if (this.multipleSelection.length == 0) {
          Message({
            message: "您还没未选中任何数据！！！",
            type: "warning"
          });
        } else {
          this.$confirm("是否删除这些用途记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deletePurposeList(this.multipleSelection).then(response => {
                this.getDateSource(this.activeTabsName);
              });
            })
            .catch(() => {});
        }
      } else if (this.activeTabsName == "1") {
        if (this.multipleSelection1.length == 0) {
          Message({
            message: "您还没未选中任何数据！！！",
            type: "warning"
          });
        } else {
          this.$confirm("是否删除这些付款单位记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deletePayBankList(this.multipleSelection1).then(response => {
                this.getDateSource(this.activeTabsName);
              });
            })
            .catch(() => {});
        }
      } else if (this.activeTabsName == "2") {
        if (this.multipleSelection2.length == 0) {
          Message({
            message: "您还没未选中任何数据！！！",
            type: "warning"
          });
        } else {
          this.$confirm("是否删除这些收款单位记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteReciveBankList(this.multipleSelection2).then(response => {
                this.getDateSource(this.activeTabsName);
              });
            })
            .catch(() => {});
        }
      }
    },
    //下载
    downTemplate() {
      if (this.activeTabsName == "0") {
        downPurposeList({
          STATUS: "2"
        })
          .then(response => {
            var blob = new Blob([response], {
              type: "application/vnd.ms-excel;charset=utf-8"
            }); //指定格式为vnd.ms-excel
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = "用途模块模版.xls"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          })
          .catch(err => {});
      } else if (this.activeTabsName == "1") {
        downPayBankList({
          STATUS: "2"
        })
          .then(response => {
            var blob = new Blob([response], {
              type: "application/vnd.ms-excel;charset=utf-8"
            }); //指定格式为vnd.ms-excel
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = "付款单位模版.xls"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          })
          .catch(err => {});
      } else if (this.activeTabsName == "2") {
        downReciveBankList({
          STATUS: "2"
        })
          .then(response => {
            var blob = new Blob([response], {
              type: "application/vnd.ms-excel;charset=utf-8"
            }); //指定格式为vnd.ms-excel
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = "收款单位模版.xls"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          })
          .catch(err => {});
      }
    },
    //添加
    updateDateSource() {
      this.loadingFlag = true;
      if (this.activeTabsName == "2") {
        if (
          this.reciveName == "" ||
          this.reciveAccount == "" ||
          this.reciveBankName == ""
        ) {
          Message({
            message: "部分要素没有填写",
            type: "warning"
          });
        } else {
          let a = [
            {
              C_YEAR: this.year,
              OPERATOR: this.nickName,
              //收款单位
              RECNAME: this.reciveName,
              POWER: this.power,
              RECBANKNO: this.reciveAccount,
              RECBANKNAME: this.reciveBankName,
              CBMUNITID: this.cbmunitid
            }
          ];
          //添加
          addReciveBankName(a)
            .then(response => {
              this.loadingFlag = false;
              this.dialogTableVisible = false;
              this.getDateSource(this.activeTabsName);
            })
            .catch(err => {
              this.loadingFlag = false;
              this.dialogTableVisible = false;
            });
        }
      } else if (this.activeTabsName == "1") {
        if (
          this.paymentName == "" ||
          this.paymentAccount == "" ||
          this.paymentBankName == ""
        ) {
          Message({
            message: "部分要素没有填写",
            type: "warning"
          });
        } else {
          let a = [
            {
              C_YEAR: this.year,
              OPERATOR: this.nickName,
              POWER: this.power,
              ENAME: this.paymentName,
              PAYBANKNO: this.paymentAccount,
              PAYBANKNAME: this.paymentBankName,
              CBMUNITID: this.cbmunitid
            }
          ];
          //添加
          payBankName(a)
            .then(response => {
              this.loadingFlag = false;
              this.dialogTableVisible = false;
              this.getDateSource(this.activeTabsName);
            })
            .catch(err => {
              this.loadingFlag = false;
              this.dialogTableVisible = false;
            });
        }
      } else if (this.activeTabsName == "0") {
        if (this.purpose == "") {
          Message({
            message: "部分要素没有填写",
            type: "warning"
          });
        } else {
          let a = [
            {
              C_YEAR: this.year,
              OPERATOR: this.nickName,
              POWER: this.power,
              PURPOSENAME: this.purpose,
              CBMUNITID: this.cbmunitid
            }
          ];
          //添加用途
          addPurposeNameList(a)
            .then(response => {
              this.loadingFlag = false;
              this.dialogTableVisible = false;
              this.getDateSource(this.activeTabsName);
            })
            .catch(err => {
              this.loadingFlag = false;
              this.dialogTableVisible = false;
            });
        }
      }
    },
    //新增
    addNewData() {
      if (this.activeTabsName == "0") {
        this.titleContent = "添加用途模块";
      } else if (this.activeTabsName == "1") {
        this.titleContent = "添加付款单位";
      } else if (this.activeTabsName == "2") {
        this.titleContent = "添加收款单位";
      }
      this.dialogTableVisible = true;
    },

    indexMethod1(index) {
      return (this.currpage1 - 1) * this.pageSize1 + index + 1;
    },
    indexMethod(index) {
      return (this.currpage - 1) * this.pageSize + index + 1;
    },
    indexMethod2(index) {
      return (this.currpage2 - 1) * this.pageSize2 + index + 1;
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
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.currpage2 = val;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },

    handleTabsClick(tab, event) {
      this.activeTabsName = tab.name;
      this.getDateSource(this.activeTabsName);
    },
    getDateSource(e) {
      this.loading = true;
      if (e == "0") {
        let a = {
          CBMUNITID: this.cbmunitid,
          POWER: this.power,
          C_YEAR: this.year,
          STATUS: "1"
        };
        getpurposeList(a).then(response => {
          this.loading = false;
          this.tableData = response.dataList;
        });
      } else if (e == "1") {
        let a = {
          CBMUNITID: this.cbmunitid,
          POWER: this.power,
          C_YEAR: this.year,
          STATUS: "1"
        };
        getPayBankList(a).then(response => {
          this.loading = false;
          this.tableData1 = response.dataList;
        });
      } else if (e == "2") {
        let a = {
          CBMUNITID: this.cbmunitid,
          POWER: this.power,
          C_YEAR: this.year,
          OPERATOR: this.nickName,
          STATUS: "1"
        };

        getReciveBankList(a).then(response => {
          this.loading = false;
          this.tableData2 = response.dataList;
        });
      }
    }
  },
  created() {
    this.cbmunitid = localStorage.getItem("CBMUNITID");
    this.power = localStorage.getItem("POWER");
    let nowDate = new Date();
    this.year = nowDate.getFullYear();
    this.nickName = localStorage.getItem("NICKNAME");
    this.getDateSource(this.activeTabsName);
  }
};
</script>
<style lang='scss' >
.header {
  margin-top: 20px;
  margin-left: 30px;
}
.content_wrap {
  margin-top: 2rem;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  
}
.pagination_wrap {
  margin-top: 20px;
}
</style>