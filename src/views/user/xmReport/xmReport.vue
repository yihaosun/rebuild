<template>
  <div>
    <div class='table_title1'>
       <span style='margin-left: 10px;'>
          <el-button type="success" size="medium"  @click="addProject">新增项目</el-button>
        </span>
        <span style='margin-left: 10px;'>
          <el-button type="success" size="medium"  @click="downProject" >导出excel</el-button>
        </span>
    </div>
      <el-button round style="margin-left:15px;margin-bottom:10px" @click="queryCriteria()">查询条件</el-button>
      <div style="position:absolute;top:120px;left:120px;" v-if="isTag">
      <el-tag 
        :key="tag"
        v-for="tag in dynamicTags[0]"
        closable
        :disable-transitions="false"
        @close="handleClose(1,tag)"
        style="color:black;background-color:#ffffff;border:1px;margin-left:10px;">
        {{tag}}
      </el-tag>
      <span style="color:blue;font-size:bold;margin-left:30px;font-size:14px;" v-if="clearBtn == true" @click="allClear()">清除</span>
      </div>
      
      <div class="title_selete" v-if="isQueryCriteria == true">
        <el-form :inline="true">
             <el-form-item label="单位名称:" >
               <el-input v-model="nameUnit"></el-input>
             </el-form-item>
             <el-form-item label="申报金额:"  style="margin-left:40px;">
               <el-input v-model="amountDeclared"></el-input>
             </el-form-item>
            <el-form-item label="申报时间" style="margin-left:40px;">
                <el-date-picker
                v-model="formInline.dateTime"
                type="date"
                style="width:174px"
                format="yyyy-MM-dd"
                placeholder="请选择日期" >
              </el-date-picker>
            </el-form-item>
             <el-form-item label="审批状态:"  style="margin-left:40px;">
              <el-input v-model="examiStatus"></el-input>
             </el-form-item><br>
             <el-form-item style="margin-left: 76%">
               <el-button type="primary" round style="width: 100px;" @click="isDiplayTag()">确定</el-button>
             </el-form-item>
        </el-form>
      </div>

    
    <div class="table_wrap">
      <el-table
        :data="tableData.slice((currpage-1)*pageSize, currpage*pageSize)"
        :row-class-name="tableRowClassName"
        style="width: 100%;margin-bottom: 20px;"
        row-key="ID"
        border
        max-height="700"
        v-loading="loading"
        id="out-table"
        :header-cell-style="{
    'background-color': '#F2F2F2',
   'color':'#606266 ',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
 :cell-style="{
    'text-align': 'center'
}"
      >
        <el-table-column label="序号" width="70" fixed type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="OPERATION" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="isType" >
              <svg-icon icon-class="bianji">
                编辑
              </svg-icon>
              </el-button>
            </el-button>
            <el-button type="text" size="small" :disabled="isType" @click="handleClick(scope.$index)">
              <svg-icon icon-class="delete" >
                删除
              </svg-icon>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="NAME" label="项目名称" width="200"></el-table-column>
        <el-table-column prop="ISACCEPT" label="审批状态" width="150">
          <template scope="scope">
              <span v-if="scope.row.ISACCEPT == '待审核' ">{{ scope.row.ISACCEPT }}</span>
              <span v-else-if="scope.row.ISACCEPT == '审核通过'" style="color: #37B328">{{ scope.row.ISACCEPT }}</span>
              <span v-else="scope.row.ISACCEPT == '审核失败'" style="color: #37B328" >{{ scope.row.ISACCEPT }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="MONEY" label="申报金额" width="150"></el-table-column>
        <el-table-column prop label="已用指标" width="150"></el-table-column>
        <el-table-column prop label="在途指标" width="150"></el-table-column>
        <el-table-column prop label="可用指标" width="150"></el-table-column>
        <el-table-column prop="PROBMUNIT" label="单位" width="300"></el-table-column>
        <el-table-column prop="DECLAREDATE" label="申报时间" width="300"></el-table-column>
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
    </div>

    <el-dialog
      title="新增项目"
      :visible.sync="dialogTableVisible"
      width="60%"
      top="5vh"
      style=" text-align: center;"
    >
      <div class="tableContent">
        <div class="table_title">项目信息</div>
        <div style="padding: 15px;text-align:left">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="项目名称:" style='margin-right:15px'>
    <el-input v-model="formInline.projectName" placeholder="请输入项目名称"></el-input>
  </el-form-item>
  <el-form-item label="申报金额:" style='margin-right:15px'>
     <el-input v-model="formInline.declareMoney" placeholder="请输入申报金额"></el-input>
  </el-form-item>
  <el-form-item label="申报时间">
      <el-date-picker
      v-model="formInline.dateTime"
      type="date"
      style='width:174px'
       format="yyyy-MM-dd"
      placeholder="请选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="预算类型:" style='margin-right:5px'>
  <el-select v-model="formInline.budgetType" placeholder="请选择预算类型">
    <el-option
      v-for="item in budgetTypeoptions"
      :key="item.value"
      :label="item.value"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="启始时间:" style='margin-right:5px'>
      <el-date-picker
      v-model="formInline.startTime"
      type="year"
      style='width:180px'
       format="yyyy"
      placeholder="请选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="终止时间">
      <el-date-picker
      v-model="formInline.endTime"
      type="year"
      style='width:174px'
      format="yyyy"
      placeholder="请选择日期">
    </el-date-picker>
  </el-form-item>
   <el-form-item label="是否纳入资金监管内容" >
     <el-radio-group v-model="formInline.supervise">
    <el-radio :label="1">是</el-radio>
    <el-radio :label="0">否</el-radio>
  </el-radio-group>
  </el-form-item>

  <div class="table_title">申报人信息</div>
   
 <div style='margin-top:15px'>
 <el-form-item label="申报人:" style='margin-right:10px'>
  
    <el-input v-model="formInline.declareName" placeholder="请输入申报人"></el-input>
  </el-form-item>
  <el-form-item label="单位:" style='margin-right:10px'>
     <el-input v-model="formInline.declareCompany" placeholder="请输入单位"></el-input>
  </el-form-item>
   <el-form-item label="联系电话:" style='margin-right:10px'>
     <el-input v-model="formInline.declarePhone" placeholder="请输入联系电话"></el-input>
  </el-form-item>
    <el-form-item label="备注:" style='margin-right:10px;width: calc(100%);'>
   <el-input
  type="textarea"
  :autosize="{ minRows: 3, maxRows: 6}"
  placeholder="请输入备注"
  style='    width: calc(100vw/2);'
  v-model="formInline.remarks">
</el-input>
  </el-form-item>
 </div>
  <div class="table_title"></div>
  <div style='margin-top:15px'>
<el-form-item label="项目依据:" style='margin-right:10px;width: calc(100%);'>
   <el-input
  type="textarea"
  :autosize="{ minRows: 3, maxRows: 6}"
  placeholder="请输入项目依据"
  style='    width: calc(100vw/2);'
  v-model="formInline.basis">
</el-input>
  </el-form-item>
  <el-form-item label="项目内容:" style='margin-right:10px;width: calc(100%);'>
   <el-input
  type="textarea"
  :autosize="{ minRows: 3, maxRows: 6}"
  placeholder="请输入项目内容"
  style='    width: calc(100vw/2);'
  v-model="formInline.content">
</el-input>
  </el-form-item>
 <el-form-item label="项目绩效:" style='margin-right:10px;width: calc(100%);'>
   <el-input
  type="textarea"
  :autosize="{ minRows: 3, maxRows: 6}"
  placeholder="请输入项目绩效"
  style='    width: calc(100vw/2);'
  v-model="formInline.achievements">
</el-input>
  </el-form-item>
  </div>
</el-form>
        </div>
        <div class='fujian'>
          <div style='flex:1'>添加附件:</div>
          <div style='flex:9'>
 <el-upload
          class="upload-demo"
          ref="upload"
          action="123"
          :http-request="uploadSectionFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="10"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">
            <i class="el-icon-upload el-icon--right"></i>选取文件
          </el-button>
       <div slot="tip" class="el-upload__tip">一次性只能上传10个文件</div>
        </el-upload>

          </div>
          </div>

      </div>

      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="timeoutSave">暂存</el-button>
        <el-button type="primary" @click="submitDate">申办</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getXmList } from "@/api/town/xmReport";
import { addXmList } from "@/api/town/xmReport";
import { delXmList } from "@/api/town/xmReport";
import { editXmList } from "@/api/town/xmReport";

import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      examiStatus: "",
      amountDeclared: "",
      isTag: false,
      isType: false,
      isTableLength: 0,
      isQueryCriteria :false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      budgetTypeoptions:[
        {
          id:1,
          value:"本年追加预算"
      },
      {
          id:2,
          value:"本年年初预算"
      },
      {
          id:3,
          value:"下年年初预算"
      }
      ],
      nameUnit: "",
      currpage: 1,
      pageSize: 20,
      tableData: [],
      dialogTableVisible: false,
      eid:"",
      eid_isbn: "",
      guid: 0,
      isaccept: -1,
      isleaf: 0,
      itemsourcescode: 0,
      clearBtn: true,
       //放置文件容器
      fileList: [],
       formInline: {
          projectName: '',
          declareMoney: '',
          dateTime:"",
          budgetType:"",
          startTime:"",
          endTime:"",
          supervise:"",
          declareName:"",
          declareCompany:"",
          declarePhone:"",
          remarks:"",
          basis:"",
          content:"",
          achievements:""
        },
        

    };
  },
  methods: {
   // 定义导出excel表格事件
    downProject () {
     /* 从表生成工作簿对象 */
       let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
      /* 获取二进制字符串作为输出 */
       let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
       try {
           /*设置导出文件名称，并保存 */
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '项目库暂存表.xlsx');
        } 
       catch (e)
           {
             if (typeof console !== 'undefined')
               console.log(e, wbout)
             }
             return wbout
 },
   
   delTableData(){
     delXmList({
        
     })
   },
    // 标签内容
   isDiplayTag(){
       this.isTag = true;
       this.isQueryCriteria = false;
       this.dynamicTags.push({
         name: this.nameUnit,
         status: this.examiStatus
       }),
       console.log(this.dynamicTags[0].name)
    },
    allClear(){
       this.dynamicTags = "";
       this.clearBtn = false
    },
   
    // 删除tag标签
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
    // 点击查询条件按钮，显示
    queryCriteria(){
       this.isQueryCriteria = true;
    },

    //单数行颜色为白色，双数为灰色
    tableRowClassName({row, rowIndex,isTableLength}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
        else 
          {return 'success-row';}
       
      },
    
    delTableData(){
  
    },
    //新增
    addProject(){
      this.dialogTableVisible=true;
    },
    //暂存
    timeoutSave(){
      let cbmunitid = localStorage.getItem("CBMUNITID");
      addXmList([{
        name:this.formInline.projectName,
        eid: "232323",
        eid_isbn: "1212",
        guid: 0,
        isleaf: 0,
        probmunit: "啊",
        money:this.formInline.declareMoney,
        declaredate:"2019-12-03",
        budgetType:this.formInline.budgetType,
        startyear:2014,
        endyear:2019,
        issupervise:this.formInline.supervise,
        manager:this.formInline.declareName,
        //申报人单位
        declareCompany:"",
        phone:this.formInline.declarePhone,
        remarks:this.formInline.remarks,
        itemcause:this.formInline.basis,
        content:this.formInline.content,
        itembrieaf:this.formInline.achievements,
        itemsourcescode:0,
        isaccept:-1,
        cbmunitid:cbmunitid,
        itemtype: 0,
        spantype: 0,
        standard_code: 'sddsds',
        year: 2019
        }])
          .then(response => {
            this.loading = false;
            this.tableData = response.dataList;  
          })
          .catch(err => {
          console.log(cuowu )
          });
      },
      submitDate(){

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
indexMethod(index) {
      return (this.currpage - 1) * this.pageSize + index + 1;
    },

     //返回
    clearBack() {
      //清空上传的文件
      this.dialogTableVisible2 = false;
      
      this.$refs.upload.clearFiles();
      //重新调用
        this.getSourceDate(
      this.activeTabsName,
      this.startDate,
      this.endDate,
      this.valueContent
    )
    },
    handleExceed(files, fileList) {
      this.$message.warning("当前限制选择 10 个文件；");
    },
  submitUpload() {
      this.$refs.upload.submit();
    },
   uploadSectionFile(option) {
      this.loadingFlag = true;
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
       formData.append("IYEAR", this.year);
         formData.append("POWER", this.power);
          formData.append("CPOSTGUID", cpostguid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.request({
          url: `${process.env.VUE_APP_BASE_API}/pay/customisze/import`,
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
            this.loadingFlag = false;
          }, 3000);

          console.log("上传成功");
        })
        .catch(response => {
          console.log("上传失败");
          option.onError();
           this.loadingFlag = false;
        });
    },
     handleRemove(file, fileList) {
      console.log(file, fileList);
    },
      handlePreview(file) {
      console.log(file);
    },


    //  indexMethod(index) {
    //       return (this.currpage - 1) * this.pageSize + index + 1;
    //     },

    //  CBMUNITID   一定要填
    // DECLAREDATE
    // ISACCEPT
    // ISFINANCE 一定要填
    //MONEY
    //PROBMUNIT
    //STATUS 一定要填
    //YEAR 一定要填
    getDateSource(
      cbmunitid,
      declareDate,
      isAccept,
      isFinance,
      money,
      probmunit,
      status,
      year
    ) {
      this.loading = true;
      getXmList({
        CBMUNITID: cbmunitid,
        DECLAREDATE: declareDate,
        ISACCEPT: isAccept,
        ISFINANCE: isFinance,
        MONEY: money,
        PROBMUNIT: probmunit,
        STATUS: status,
        YEAR: year
      })
        .then(response => {
          this.loading = false;
          this.tableData = response.dataList;
          this.isTableLength = this.tableData.length;
          
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false;
            this.showButton = false;
            this.tableData = [];
          }, 1500);
        });
    },
    params(){

    }
  },
  created() {
    let cbmunitid = localStorage.getItem("CBMUNITID");
    this.getDateSource(cbmunitid, "", "", 0, "", "", 1, "2019");
    
  }
};
</script>
<style lang="scss" >
.table_title1{
   margin-left: 1%;
  margin-right: 2%;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-top: 2rem;
  margin-bottom: 1rem;
      text-align: right;
}
.table_wrap {
  margin-left: 1%;
  margin-right: 2%;
  background-color: #fff;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 1rem;
}
.tableContent {
  .table_title {
    height: 40px;
    line-height: 40px;
    text-align: left;
    /* padding-left: 30px; */
    font-size: 1rem;
    border-bottom: 1px dotted #b7b5b5;
    color: #0099cc
  }
  .table_title1{
 height: 20px;
    border-bottom: 1px dotted #b7b5b5;
  }
}
.fujian{
    text-align: left;
    padding-left: 20px;
    color: #4c4a4a;
    font-weight: 500;
    display: flex;
}
.title_selete{
  width: 100%;
  margin-top: 20px;
  margin-left: 15px;
  background-color: #ffffff;
  padding-top: 50px;
  height: 180px;
  padding-left: 40px;
}
.el-table .warning-row {
   
  }

  .el-table .success-row {
    background:  #F2F2F2
  }
</style>
