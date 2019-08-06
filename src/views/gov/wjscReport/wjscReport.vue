<template>
  <div class="content_show">
    <div class="tab_wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0">
  <div class="table_wrap">
            <el-table
              :data="tableData.slice((currpage-1)*pageSize, currpage*pageSize)"
              border
              v-loading="loading"
              style="width: 100%"
              :cell-style="{
                'text-align': 'center',
                 'font-size':' 15px',
            }"
              :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
            >
              <el-table-column prop="ID" label="序号" width="100"></el-table-column>
              <el-table-column prop="FILENO" label="文号" width="400"></el-table-column>
              <el-table-column prop="FILENAME" label=" 文件列表" width="480">
                <template slot-scope="scope">
                  <div
                    style="color: rgb(0, 122, 217);font-weight: 500;font-size: 15px;cursor:pointer;"
                  >{{scope.row.FILENAME}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <div v-if='scope.row.FILENAME'>
                    <el-button type="text" size="middle" @click="handleUpDownClick(scope.row)">选择下载</el-button>
                    <el-button type="text" size="middle" @click="handleDeleteClick(scope.row)">删除</el-button>
                  </div>
                   <div v-if='!scope.row.FILENAME'>
                   <el-button @click="handleUploadClick(scope.row)" type="text" size="middle">上传</el-button>
                   </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
            <div class="pagination_wrap" style="    margin-top: 2rem;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="0"
              :total="tableData.length"
            ></el-pagination>
          </div>


        </el-tab-pane>
        <el-tab-pane label="已上传" name="1">
          <div class="table_wrap">
            <el-table
              :data="tableData1.slice((currpage1-1)*pageSize1, currpage1*pageSize1)"
              border
              v-loading="loading"
              style="width: 100%"
              :cell-style="{
                'text-align': 'center',
                 'font-size':' 15px',

            }"
              :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
            >
              <el-table-column prop="ID" label="序号" width="100"></el-table-column>
              <el-table-column prop="FILENO" label="文号" width="400"></el-table-column>
              <el-table-column prop="FILENAME" label=" 文件列表" width="480">
                <template slot-scope="scope">
                  <div
                    style="color: rgb(0, 122, 217);font-weight: 500;font-size: 15px;cursor:pointer;"
                  >{{scope.row.FILENAME}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" size="middle" @click="handleUpDownClick(scope.row)">选择下载</el-button>
                    <el-button type="text" size="middle" @click="handleDeleteClick(scope.row)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination_wrap" style="    margin-top: 2rem;">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="0"
              :total="tableData1.length"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未上传" name="2">
          <div class="table_wrap">
            <el-table
              :data="tableData2.slice((currpage2-1)*pageSize2, currpage2*pageSize2)"
              border
              v-loading="loading"
              style="width: 100%"
              :cell-style="{
                'text-align': 'center',
                 'font-size':' 15px',

            }"
              :header-cell-style="{
    'background-color': '#409eff',
   'color':' #fff',
    'border-bottom': '1px solid #fff',
    'text-align': 'center'
}"
            >
              <el-table-column prop="ID" label="序号" width="80"></el-table-column>
              <el-table-column prop="FILENO" label="文号" width="300"></el-table-column>
              <el-table-column prop label=" 文件列表" width="300"></el-table-column>
              <el-table-column fixed="right" label="操作" width="400">
                <template slot-scope="scope">
                  <el-button @click="handleUploadClick(scope.row)" type="text" size="middle">上传</el-button>
                  <!-- <el-button type="text" size="middle" @click="handleUpDownClick(scope.row)">下载</el-button>
                  <el-button type="text" size="middle">删除</el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination_wrap" style="    margin-top: 2rem;">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="0"
              :total="tableData2.length"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 日期选择器 -->
      <div style="    position: absolute; top: -5px;right: 0px;">
        <el-date-picker
          v-model="year"
          type="year"
          style="width: 150px;"
          placeholder="选择年"
          value-format="yyyy"
          @change="changeYear"
        ></el-date-picker>
      </div>
    </div>

    <el-dialog title="选择上传的文件" :visible.sync="dialogVisible" :before-close="clearBack" width="30%">
      <div>
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
          <div slot="tip" class="el-upload__tip">一次性只能上传10个文件,只能上传.doc,.docx,.xls,.xlsx</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload" :loading="loadingFlag">确认上传</el-button>
        <el-button @click="clearBack">返回</el-button>
      </span>
    </el-dialog>
    <el-dialog title="下载列表" :visible.sync="dialogVisible2" width="30%">
      <div>
        <span>文件列表:</span>
        <div>
          <el-select v-model="fileList1" placeholder="请选择" style="width: 100%; margin-top: 20px;">
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
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="makeSure()">确 定</el-button>
      </span>
    </el-dialog>
  
  </div>
</template>
<script>
import { getWjDataList } from "@/api/gov/wjscReport";
import { downWjDataList } from "@/api/gov/wjscReport";
import { deleteWjDataList } from "@/api/gov/wjscReport";
import { chooseWjDataList } from "@/api/gov/wjscReport";
import axios from "axios";
import { MessageBox, Message } from "element-ui";
export default {
  data() {
    return {
      activeName: "0",
      year: "2019",
      tableData: [],
      tableData2: [],
      tableData1: [],
      loading: false,
       currpage: 1,
      pageSize: 10,
      currpage2: 1,
      pageSize2: 10,
      currpage1: 1,
      pageSize1: 10,
      dialogVisible: false,
      dialogVisible2:false,
      fileNo: "",
      //放置文件容器
      fileList: [],
      fileList1:'',
      options:[],
      loadingFlag: false
    };
  },
  methods: {
    //年份改变的时候，触发事件
    changeYear() {
      this.getDataSource(this.year, this.activeName);
    },
    //返回
    clearBack() {
      //清空上传的文件
      this.dialogVisible = false;
      this.$refs.upload.clearFiles();
      //重新调用
      this.getDataSource(this.year, this.activeName);
    },
//删除
handleDeleteClick(e){
   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        deleteWjDataList({
          FILENO:e.FILENO
        }).then(response => {
             //重新调用
      this.getDataSource(this.year, this.activeName);
      });


          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
},
    //选择下载
    handleUpDownClick(e) {
       chooseWjDataList({
        FILENO: e.FILENO
      }).then(response => {
        this.dialogVisible2 = true;
        this.options = response.dataList;
      });  
    },  
    //下载
 makeSure() {
      this.dialogVisible2 = false;
      if (this.fileList1 == "") {
        Message({
          message: "请选择文件列表",
          type: "error"
        });
      } else {
        //确定进行下载
        downWjDataList({
          PNO: this.fileList1
        })
          .then(response => {
            console.log(response);
            let a = this.options.find(o => {
              if (o.PNO == this.fileList1) {
                return o;
              }
            });
            let fileType = "";
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


    //显示上传的信息
    handleUploadClick(e) {
      this.dialogVisible = true;
      this.fileNo = e.FILENO;
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
      //将文件转换成二进制
      formData.append("upfile", file);
      formData.append("OPERATOR", "lixiaowei");
      formData.append("FILENO", this.fileNo);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .request({
          url:  `${process.env.VUE_APP_BASE_API}/fileno/uplode`,
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

    //分页
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.currpage2 = val;
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
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currpage = val;
    },

    handleClick(tab, event) {
      console.log(tab.name);
      if (tab.name == this.activeName) {
        this.getDataSource(this.year, tab.name);
      }
    },

    getDataSource(year, activeName) {
      this.loading = true;
      console.log(year);
      getWjDataList({
        IYEAR: year,
        STATUS: activeName
      }).then(response => {
        if (response) {
          if (activeName == "2") {
            this.tableData2 = response.dataList;
          } else if (activeName == "1") {
            this.tableData1 = response.dataList;
          }
          else if (activeName == "0") {
            this.tableData = response.dataList;
          }
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      });
    }
  },

  created() {
    this.getDataSource(this.year,this.activeName)
  }
};
</script>
<style lang="scss">
.tab_wrap {
  position: relative;
}
.el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e6e0e0;
}
</style>

