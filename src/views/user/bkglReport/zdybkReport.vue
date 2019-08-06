<template >
  <div>
    <div class="content1_show">
      <div class="header_content">
        <div class="choose_wrap">
          <div style="flex:1;text-align:center">
            <span class="date_title">收款单位：</span>
            <el-input v-model="valueContent" placeholder="请输入搜索内容" style='width:220px'></el-input>
          </div>
          <div style="flex:1;text-align:center;">
            <span class="date_title">开始时间：</span>
            <el-date-picker
              v-model="startDate"
              size="medium"
              type="date"
              clearable
              value-format="yyyy-MM-dd"
              placeholder="请选择开始时间"
            ></el-date-picker>
          </div>
          <div style="flex:1;text-align:center">
            <span class="date_title">结束时间：</span>
            <el-date-picker
              v-model="endDate"
              size="medium"
              type="date"
              clearable
              value-format="yyyy-MM-dd"
              placeholder="请选择结束时间"
            ></el-date-picker>
          </div>
        </div>
        <div class="do_wrap">
          <!-- 下载 -->
          <span class="down_wrap" @click="down_report">
            <svg-icon icon-class="down" />
          </span>
          <span style="display:inline-block">
            <el-button
              type="primary"
              size="middle"
              style="height: 36px;width: 110px;line-height: 15px;padding-left: 7px;"
              icon="el-icon-edit"
              @click="inputTable"
            >拨款单录入</el-button>
          </span>
          <span style="display:inline-block" @click="downTemplate">
            <el-button
              type="primary"
              size="middle"
              style="height: 36px;line-height: 15px;padding-left: 7px;"
              icon="el-icon-download"
            >新中大模版下载</el-button>
          </span>
          <span style="display:inline-block" @click="upLoadTemplate">
            <el-button
              type="primary"
              size="middle"
              style="height: 36px;line-height: 15px;padding-left: 7px;"
              icon="el-icon-upload2"
            >新中大模版上传</el-button>
          </span>
          <span style="display:inline-block">
            <el-button
              type="primary"
              size="middle"
              style="height: 36px;line-height: 15px;padding-left: 7px;"
              icon="el-icon-search"
              @click="search"
            >搜索</el-button>
          </span>
        </div>
      </div>

      <div class="date_wrap">
        <div class="tabs_wrap" style="position:relative">
          <div
            style="position: absolute;right: 18px;top: -5px;z-index: 999;"
            v-if="activeTabsName=='1'"
          >
            <el-button size="small" type="primary" icon="el-icon-check" @click="approval">审批</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteDate">删除</el-button>
            <el-button size="small" type="success" icon="el-icon-edit" @click="deitDate">编辑</el-button>
          </div>
          <div
            style="position: absolute;right: 18px;top: -5px;z-index: 999;"
            v-if="activeTabsName=='2'"
          >
            <el-button size="small" type="success" icon="el-icon-edit" @click="deitDate">编辑</el-button>
            <el-button size="small" type="primary" icon="el-icon-printer">打印</el-button>
          </div>

          <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
            <el-tab-pane label="全部" name="0">
              <el-table
                ref="multipleTable"
                :data="tableData.slice((currpage-1)*pageSize, currpage*pageSize)"
                tooltip-effect="dark"
                style="width: 100%"
                border
                v-loading="loading"
                :cell-style="{
                     'text-align': 'center',}"
                :header-cell-style="{'background-color':'rgb(57, 135, 216)','color':' #fff','border-bottom': '1px solid #fff','text-align': 'center','border-right': '1px solid #fff',}"
              >
                <el-table-column label="状态" width="100">
                  <template slot-scope="scope">{{ scope.row.STATUS }}</template>
                </el-table-column>
                <el-table-column label="打印状态" width="100">
                  <template slot-scope="scope">
                    <div v-if="scope.row.ISPRINT=='未打印'">
                      <span style="color:black">{{scope.row.ISPRINT}}</span>
                    </div>
                    <div v-if="scope.row.ISPRINT=='已打印'">
                      <span style="color:red">{{scope.row.ISPRINT}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="PAYDATE" label="拨款时间" fixed width="150"></el-table-column>
                <el-table-column prop="CODE" label="流水号" fixed width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECBANKNO" label="收款账号" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECNAME" label="收款单位" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECBANKNAME" label="收款银行" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="IMONEY" label="拨款金额" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PURPOSE" label="用途" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ENAME" label="付款单位" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PAYBANKNO" label="付款账号" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PAYBANKNAME" label="付款银行" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="CFUNCTION1"
                  label="功能科目(类)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="CFUNCTION2"
                  label="功能科目(款)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="CFUNCTION3"
                  label="功能科目(项)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
              <div class="pagination_wrap">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="sizes, prev, pager, next"
                  :total="tableData.length"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label=" 未审批 " name="1">
              <el-table
                ref="multipleTable1"
                :data="tableData1.slice((currpage1-1)*pageSize1, currpage1*pageSize1)"
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
                <el-table-column label="状态" width="100">
                  <template slot-scope="scope">{{ scope.row.STATUS }}</template>
                </el-table-column>
                <el-table-column label="打印状态" width="100">
                  <template slot-scope="scope">
                    <div v-if="scope.row.ISPRINT=='未打印'">
                      <span style="color:black">{{scope.row.ISPRINT}}</span>
                    </div>
                    <div v-if="scope.row.ISPRINT=='已打印'">
                      <span style="color:red">{{scope.row.ISPRINT}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="PAYDATE" label="拨款时间" width="150" fixed></el-table-column>
                <el-table-column prop="CODE" label="流水号" width="150" fixed show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECBANKNO" label="收款账号" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECNAME" label="收款单位" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECBANKNAME" label="收款银行" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="IMONEY" label="拨款金额" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PURPOSE" label="用途" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ENAME" label="付款单位" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PAYBANKNO" label="付款账号" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PAYBANKNAME" label="付款银行" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="CFUNCTION1"
                  label="功能科目(类)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="CFUNCTION2"
                  label="功能科目(款)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="CFUNCTION3"
                  label="功能科目(项)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
              <div class="pagination_wrap">
                <el-pagination
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :current-page="0"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="sizes, prev, pager, next"
                  :total="tableData1.length"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label=" 已审批 " name="2">
              <el-table
                ref="multipleTable"
                :data="tableData2.slice((currpage2-1)*pageSize2, currpage2*pageSize2)"
                tooltip-effect="dark"
                style="width: 100%"
                border
                v-loading="loading"
                :cell-style="{
                     'text-align': 'center',}"
                :header-cell-style="{'background-color':'rgb(57, 135, 216)','color':' #fff','border-bottom': '1px solid #fff','text-align': 'center','border-right': '1px solid #fff',}"
                @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="状态" width="100">
                  <template slot-scope="scope">{{ scope.row.STATUS }}</template>
                </el-table-column>
                <el-table-column label="打印状态" width="100">
                  <template slot-scope="scope">
                    <div v-if="scope.row.ISPRINT=='未打印'">
                      <span style="color:black">{{scope.row.ISPRINT}}</span>
                    </div>
                    <div v-if="scope.row.ISPRINT=='已打印'">
                      <span style="color:red">{{scope.row.ISPRINT}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="PAYDATE" label="拨款时间" width="150" fixed></el-table-column>
                <el-table-column prop="CODE" label="流水号" width="150" fixed show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECBANKNO" label="收款账号" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECNAME" label="收款单位" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RECBANKNAME" label="收款银行" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="IMONEY" label="拨款金额" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PURPOSE" label="用途" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ENAME" label="付款单位" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PAYBANKNO" label="付款账号" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="PAYBANKNAME" label="付款银行" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="CFUNCTION1"
                  label="功能科目(类)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="CFUNCTION2"
                  label="功能科目(款)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="CFUNCTION3"
                  label="功能科目(项)"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
              <div class="pagination_wrap">
                <el-pagination
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                  :current-page="0"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="sizes, prev, pager, next"
                  :total="tableData2.length"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <el-dialog title="修改拨款记录" :visible.sync="dialogTableVisible" width="70%">
      <div class="tableContent">
        <table style="display: inline-block;" class="table">
          <tbody>
            <tr>
              <td style="    width: 140px;height: 60px;">拨款时间</td>
              <td style="width:350">
                <el-date-picker
                  v-model="dateValue"
                  align="right"
                  type="date"
                  style="border-radius: 10px;"
                  placeholder="选择日期"
                ></el-date-picker>
              </td>
              <td style="    width: 170px;">功能科目</td>
              <td style="width:350px">
                <el-select
                  :value="functionValue"
                  clearable
                  @clear="clearHandle"
                  :filter-method="handleNameFilter"
                  filterable
                  style="width: 75%"
                >
                  <el-option
                    :value="functionValue"
                    class="options"
                    style="height:210px;background-color:#fff;overflow-y:auto;width:260px"
                  >
                    <el-tree
                      id="tree-option"
                      accordion
                      ref="selectTree"
                      :filter-node-method="filterNode"
                      :data="functionOptions"
                      :props="props"
                      :node-key="props.b_acc_count"
                      :default-expanded-keys="defaultExpandedKey"
                      @node-click="handleNodeClick"
                    ></el-tree>
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td style=" width: 125px;height: 60px;">拨款金额</td>
              <td style="width:300px">
                <el-input placeholder="请输入数字" v-model="money" style="width: 75%;" clearable></el-input>
              </td>
              <td style="width: 170px;">用途</td>
              <td style="width:350px">
                <el-select
                  v-model="purpose"
                  filterable
                  clearable
                  @focus="getPurposeDateSource"
                  style="width:75%"
                >
                  <el-option
                    v-for="item in purposeOptions"
                    :key="item.guid"
                    :value="item.PURPOSENAME"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%" style="    border-spacing: 0;border-collapse: collapse;">
                  <tr>
                    <td
                      style="width: 27px;line-height: 35px;padding: 8px; border: 0px;border-right: 1px solid #dbdbdc;"
                    >付款单位</td>
                    <td style="border:0px solid black">
                      <div class="common_style">全称</div>
                      <div class="common_style">账户</div>
                      <div style="height:50px;    line-height: 50px;">开户银行</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td>
                <table width="100%" style="border-spacing: 0;border-collapse: collapse;">
                  <tr>
                    <td style="border:0px solid black">
                      <div class="common_style">
                        <el-select
                          v-model="paymentName"
                          filterable
                          clearable
                          @focus="getPayNameDateSource"
                          style="width: 75%;"
                          @change="changePayNameDateSource"
                        >
                          <el-option
                            v-for="item in paymentNameOptions"
                            :key="item.PNO"
                            :label="item.ENAME"
                            :value="item.PNO"
                          ></el-option>
                        </el-select>
                      </div>
                      <div class="common_style">{{paymentAccount}}</div>
                      <div style="height:50px;line-height: 50px;">{{paymentBankName}}</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td>
                <table
                  width="100%"
                  style="border-spacing: 0;border-collapse: collapse;    line-height: 50px;"
                >
                  <tr>
                    <td
                      style="width: 27px;line-height: 35px;padding: 8px;border: 0px;border-right: 1px solid #dbdbdc;"
                    >收款单位</td>
                    <td style="border:0px solid black">
                      <div class="common_style">全称</div>
                      <div class="common_style">账户</div>
                      <div style="height:50px;    line-height: 50px;">开户银行</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td>
                <table width="100%" style="border-spacing: 0; border-collapse: collapse;">
                  <tr>
                    <td style="border:0px solid black">
                      <div style=" border-bottom: 1px solid #dbdbdc;height:50px">
                        <el-select
                          v-model="reciveName"
                          filterable
                          clearable
                          @focus="getreciveNameDateSource"
                          style="width: 75%;"
                          @change="changeReciveNameDateSource"
                        >
                          <el-option
                            v-for="item in reciveNameOptions"
                            :key="item.PNO"
                            :label="item.RECNAME"
                            :value="item.PNO"
                          ></el-option>
                        </el-select>
                      </div>
                      <div style=" border-bottom: 1px solid #dbdbdc;height:50px">{{reciveAccount}}</div>
                      <div style="height:50px">{{reciveBankName}}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDateSource">更新</el-button>
      </span>
    </el-dialog>
    <el-dialog title="预算拨款凭证(支款凭证)" :visible.sync="dialogTableVisible1" width="70%" top='10vh'>
      <div class="tableContent">
        <table style="display: inline-block;" class="table">
          <tbody>
            <tr>
              <td style="width: 140px;height: 60px;">拨款时间</td>
              <td style="width:350">
                <el-date-picker
                  v-model="dateValue"
                  align="right"
                  type="date"
                  style="border-radius: 10px;"
                  placeholder="选择日期"
                   value-format="yyyy-MM-dd"
                ></el-date-picker>
              </td>
              <td style="width: 170px;">功能科目</td>
              <td style="width:350px">
                <el-select
                  :value="functionValue"
                  clearable
                  @clear="clearHandle"
                  :filter-method="handleNameFilter"
                  @focus="focusFunctionContent"
                  filterable
                  style="width: 75%"
                >
                  <el-option
                    :value="functionValue"
                    class="options"
                    style="height:210px;background-color:#fff;overflow-y:auto;width:260px"
                  >
                    <el-tree
                      id="tree-option"
                      accordion
                      ref="selectTree"
                      :filter-node-method="filterNode"
                      :data="functionOptions"
                      :props="props"
                      :node-key="props.b_acc_count"
                      :default-expanded-keys="defaultExpandedKey"
                      @node-click="handleNodeClick"
                    ></el-tree>
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td style="width: 125px;height: 60px;">拨款金额</td>
              <td style="width:300px">
                <el-input
                  placeholder="请输入数字"
                  type="number"
                  v-model="money"
                  style="width: 75%;"
                  clearable
                 
                ></el-input>
              </td>
              <td style="    width: 170px;">
                <span style="margin-right:10px">用途</span>
                <el-button type="primary" size="mini" @click='addPurposeName'>添加</el-button>
              </td>
              <td style="width:350px">
                <el-select
                  v-model="purpose"
                  filterable
                  v-if='showPurposeFlag'
                  @focus="getPurposeDateSource"
                  style="width: 60%;margin-right: 10px;"
                >
                  <el-option
                    v-for="item in purposeOptions"
                    :key="item.guid"
                    :value="item.PURPOSENAME"
                  ></el-option>

                </el-select>
                 <el-input
                          style="width: 60%;margin-right:10px"
                          v-if="!showPurposeFlag"
                          v-model="purpose"
                          placeholder="请输入用途"
                        ></el-input>
                <!-- @click="switchPurposeValue" -->
                <el-button type="primary" size="small" @click="switchPurposeValue" >切换</el-button>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%" style="border-spacing: 0;border-collapse: collapse;">
                  <tr>
                    <td
                      style="width: 27px;line-height: 35px;padding: 8px; border: 0px;border-right: 1px solid #dbdbdc;"
                    >付款单位</td>
                    <td style="border:0px solid black">
                      <div class="common_style">全称</div>
                      <div class="common_style">账户</div>
                      <div style="height:50px;line-height: 50px;">开户银行</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td>
                <table width="100%" style="border-spacing: 0;border-collapse: collapse;">
                  <tr>
                    <td style="border:0px solid black">
                      <div class="common_style">
                        <el-select
                          v-model="paymentName"
                          filterable
                          clearable
                          @focus="getPayNameDateSource"
                          style="width: 75%;"
                          @change="changePayNameDateSource"
                        >
                          <el-option
                            v-for="item in paymentNameOptions"
                            :key="item.PNO"
                            :label="item.ENAME"
                            :value="item.PNO"
                          ></el-option>
                        </el-select>
                      </div>
                      <div class="common_style">{{paymentAccount}}</div>
                      <div style="height:50px;line-height: 50px;">{{paymentBankName}}</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td>
                <table
                  width="100%"
                  style="border-spacing: 0;border-collapse: collapse;    line-height: 50px;"
                >
                  <tr>
                    <td
                      style="width: 27px;line-height: 35px;padding: 8px;border: 0px;border-right: 1px solid #dbdbdc;"
                    >收款单位</td>
                    <td style="border:0px solid black">
                      <div class="common_style">
                        <span>全称</span>
                        <el-button type="primary" size="mini" @click="addReciveBankName">添加</el-button>
                      </div>
                      <div class="common_style">账户</div>
                      <div style="height:50px;    line-height: 50px;">开户银行</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td>
                <table width="100%" style="border-spacing: 0; border-collapse: collapse;">
                  <tr>
                    <td style="border:0px solid black">
                      <div style=" border-bottom: 1px solid #dbdbdc;height:50px">
                        <el-select
                          v-model="reciveName"
                          filterable
                          clearable
                          v-if="showFlag"
                          @focus="getreciveNameDateSource"
                          style="width: 60%;margin-right:10px"
                          @change="changeReciveNameDateSource"
                        >
                          <el-option
                            v-for="item in reciveNameOptions"
                            :key="item.PNO"
                            :label="item.RECNAME"
                            :value="item.PNO"
                          ></el-option>
                        </el-select>

                        <el-input
                          style="width: 60%;margin-right:10px"
                          v-if="!showFlag"
                          v-model="reciveName"
                          placeholder="请输入收款单位全称"
                        ></el-input>

                        <el-button type="primary" size="small" @click="switchValue">切换</el-button>
                      </div>
                      <div style=" border-bottom: 1px solid #dbdbdc;height:50px;line-height:50px">
                        <span v-if="showFlag">{{reciveAccount}}</span>
                        <el-input
                          style="width:80%"
                          v-if="!showFlag"
                          v-model="reciveAccount"
                          placeholder="请输入收款单位账户"
                        ></el-input>
                      </div>
                      <div style="height:50px;line-height:50px">
                        <span v-if="showFlag">{{reciveBankName}}</span>
                        <el-input
                          style="width:80%"
                          v-if="!showFlag"
                          v-model="reciveBankName"
                          placeholder="请输入开户银行"
                        ></el-input>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top:30px">
          <el-table
            style="width: 100%"
            border
             :data="saveTableData"
            max-height="200"
            :cell-style="{'text-align': 'center' }"
            :header-cell-style="{ 'background-color':'rgb(57, 135, 216)','color':' #fff','border-bottom': '1px solid #fff','text-align': 'center','border-right': '1px solid #fff',}" >
            <el-table-column label="编码" width="150" fixed>
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
                <el-table-column prop="ENAME" label="付款单位" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PAYBANKNO" label="付款账号" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PAYBANKNAME" label="付款银行" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="RECBANKNO" label="收款账号" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="RECNAME" label="收款单位" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="RECBANKNAME" label="收款银行" width="200" show-overflow-tooltip></el-table-column>
             <el-table-column prop="IMONEY" label="拨款金额" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PAYDATE" label="拨款时间" width="200" show-overflow-tooltip></el-table-column>
             <el-table-column prop="PURPOSE" label="用途" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CFUNCTIONCODE3" label="编码" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CFUNCTIONNAME3" label="名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click='deleteRow(scope.$index, saveTableData)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible1 = false">取 消</el-button>
        <el-button type="primary" @click='timeoutSave'>暂存</el-button>
        <el-button type="primary" @click='submitDate'>上传</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择上传的文件"
      :visible.sync="dialogTableVisible2"
      :before-close="clearBack"
      width="30%"
    >
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
        <el-button type="primary" @click="submitUpload" :loading="loadingFlag">确认上传</el-button>
        <el-button @click="clearBack">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getReceivingUnit } from "@/api/town/zdybkReport";
//获取数据
import { getZdybkList } from "@/api/town/zdybkReport";
import { MessageBox, Message } from "element-ui";
//审批
import { approvalZdybkList } from "@/api/town/zdybkReport";
//删除
import { deleteZdybkList } from "@/api/town/zdybkReport";
//获取用途
import { getPurposeZdybkList } from "@/api/town/zdybkReport";
//获取树状功能科目
import { getTreeFunctionZdybkList } from "@/api/town/zdybkReport";
//获取付款单位全称的数据
import { getPayNameZdybkList } from "@/api/town/zdybkReport";
//获取收款单位全称的数据
import { getReciveNameZdybkList } from "@/api/town/zdybkReport";
//更新数据
import { updateDateSourceZdybkList } from "@/api/town/zdybkReport";
//下载表格
import { downDateSourceZdybkList } from "@/api/town/zdybkReport";
//收款银行单条增加
import { addReciveBankName } from "@/api/town/zdybkReport";
//用途单挑增加
import { addPurposeNameList } from "@/api/town/zdybkReport";
//下载新中大模版
import { downTemplateList } from "@/api/town/zdybkReport";
//上传数据
import { submitList } from "@/api/town/zdybkReport";
//引入axios
import axios from "axios";
export default {
  data() {
    return {
      valueContent:"",
      //暂存数据的表格
      saveTableData:[],
      showFlag: true,
      showPurposeFlag:true,
      multipleSelection1: [],
      activeTabsName: "0",
      startDate: "",
      endDate: "",
      tableData: [],
      tableData1: [],
      tableData2: [],
      loading: false,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      purposeOptions: [],
      defaultExpandedKey: [],
      props: {
        children: "children",
        label: "ID",
        isbnCode: "IS_LOWEST",
        isLeaf: "isLeaf",
        b_acc_code: "B_ACC_CODE"
      },
      purpose: "",
      functionValue: "",
      functionOptions: [],
      savefunctionOptions: [],
      money: "",
      dateValue: "",
      cbmunitid: "",
      pno: "",
      nickName: "",
      year: "",
      month: "",
      power: "",

      currpage: 1,
      pageSize: 10,
      currpage1: 1,
      pageSize1: 10,
      currpage2: 1,
      pageSize2: 10,

      paymentName: "",
      paymentNameOptions: "",
      paymentAccount: "",
      paymentBankName: "",

      reciveName: "",
      reciveNameOptions: "",
      reciveAccount: "",
      reciveBankName: "",
      

      loadingFlag:false,
      //放置文件容器
      fileList: [],
    };
  },
  methods: {
    //删除
   deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //上传
      submitDate(){
          if(this.saveTableData.length==0){
             Message({
          message: "请先暂存，再上传",
          type: "warning"
        });
          }else{
 submitList(this.saveTableData).then(response=>{
            this.dialogTableVisible1=false;
            this.activeTabsName='0',
              this.getSourceDate(
                this.activeTabsName,
                this.startDate,
                this.endDate,
                this.valueContent
              );
              this.saveTableData=[]
            
    })
          }
       
      },
    
    //暂存
    timeoutSave(){
       //var b = this.money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      let changeMoney= this.toDoubleThousands(this.money)
      let functionValue=this.functionValue;
       if (
         this.functionValue==''||
        this.dateValue == '' ||
        this.money == '' ||
        this.purpose == '' ||
        this.paymentName == '' ||
        this.reciveName == ''|| this.functionValue==null||
        this.dateValue == null ||
        this.money == null ||
        this.purpose == null||
        this.paymentName == null ||
        this.reciveName == null

      ) {
        Message({
          message: "部分要素没有填写,无法暂存",
          type: "error"
        });
      }else{
              let result = this.functionOptions.find(o => {
          if (o.B_ACC_CODE == functionValue.split(" ")[0].substring(0,3)) {
            return o;
          }
        });
        let  result1 = result.children.find(o => {
            if (o.B_ACC_CODE == functionValue.split(" ")[0].substring(0,5)) {
              return o;
            }
          });
          let cbmunitname=localStorage.getItem("CBMUNITNAME");
            let cpostguid = localStorage.getItem("CPOSTGUID");
        let a={
           
             CFUNCTIONCODE1: result.B_ACC_CODE,
             CFUNCTIONNAME1: result.B_ACC_NAME,
              CFUNCTIONCODE2: result1.B_ACC_CODE,
             CFUNCTIONNAME2: result1.B_ACC_NAME,
             CFUNCTIONCODE3:functionValue.split(" ")[0],
             CFUNCTIONNAME3:functionValue.split(" ")[1],
             PAYDATE:this.dateValue,
             IMONEY:changeMoney,
             PURPOSE:this.purpose,
             
            ENAME: this.paymentName,
            PAYBANKNO: this.paymentAccount,
            PAYBANKNAME: this.paymentBankName,

            RECNAME: this.reciveName,
            RECBANKNO: this.reciveAccount,
            RECBANKNAME: this.reciveBankName,

            CXZPROGNAME:"",
            CBMUNITID:this.cbmunitid,
            CBMUNITNAME:cbmunitname,
            IYEAR:this.year,
            POWER:this.power,
            CPOSTGUID:cpostguid,
            OPERATOR:this.nickName,
           
        }
        this.saveTableData.push(a)
      }
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
      this.$message.warning("当前限制选择 1 个文件；");
    },
    //新中大模版上传
    upLoadTemplate() {
      this.dialogTableVisible2 = true;

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
      axios
        .request({
          url: "http://47.98.62.204:8080/CapitalAdmin/pay/customisze/import",
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



    //新中大模版下载
    downTemplate() {
      downTemplateList({
        STATUS: 2
      })
        .then(response => {
          var blob = new Blob([response], {
            type: "application/vnd.ms-excel;charset=utf-8"
          }); //指定格式为vnd.ms-excel
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "拨款单模板.xls"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});
    },
    //添加用途
    addPurposeName(){
       if (this.showPurposeFlag) {
        Message({
          message: "请切换到手动填写",
          type: "error"
        });
      }else{
        if (this.purpose==''){
           Message({
            message: "用途没添加！！！",
            type: "error"
          });
        }else{
            let a = [
            {
              C_YEAR: this.year,
              OPERATOR: this.nickName,
              POWER: this.power,
              PURPOSENAME:this.purpose,
              CBMUNITID: this.cbmunitid
            }
          ];
          //添加用途
          addPurposeNameList(a).then(response => {

          });
        }
      }
    },
    //增加收款单位
    addReciveBankName() {
      if (this.showFlag) {
        Message({
          message: "请切换到手动填写",
          type: "error"
        });
      } else {
        if (
          this.reciveName == "" ||
          this.reciveAccount == "" ||
          this.reciveBankName == ""
        ) {
          Message({
            message: "收款单位的部分要素没填写完整！！！",
            type: "error"
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
          addReciveBankName(a).then(response => {

          });
        }
      }

      console.log(this.reciveNameOptions);
    },
    //切换收款单位全程
    switchValue() {
      this.showFlag = !this.showFlag;
    },
    //切换用途
    switchPurposeValue(){
      this.showPurposeFlag = !this.showPurposeFlag;
    },
    //下载
    down_report() {
      let cpostguid = localStorage.getItem("CPOSTGUID");
      let co_name = localStorage.getItem("CO_NAME");
      downDateSourceZdybkList({
        BEGINDATE: this.startDate,
        ENDDATE: this.endDate,
        CBMUNITID: this.cbmunitid,
        IYEAR: this.year,
        FIS_PERD: this.month,
        STATE: this.activeTabsName,
        RECNAME: this.valueContent,
        POWER: this.power,
        CPOSTGUID: cpostguid,
        SORT: "0"
      })
        .then(response => {
          var blob = new Blob([response], {
            type: "application/vnd.ms-excel;charset=utf-8"
          }); //指定格式为vnd.ms-excel
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = `${co_name}拨款记录.xls`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(err => {});
    },
    //打印
    printingDate() {},
    //更新
    updateDateSource() {
      console.log(this.functionValue + "dff");
      if (
        this.dateValue == null ||
        this.money == null ||
        this.purpose == null ||
        this.paymentName == null ||
        this.reciveName == null
      ) {
        Message({
          message: "部分要素没有填写",
          type: "error"
        });
      } else {
        let number = this.functionValue.split(" ")[0].substring(0, 3);
        let number1 = this.functionValue.split(" ")[0].substring(0, 5);
        let result1 = "";
        let result = this.functionOptions.find(o => {
          if (o.B_ACC_CODE == number) {
            return o;
          }
        });

        if (result == null) {
          result = {
            B_ACC_CODE: "",
            B_ACC_NAME: ""
          };
        } else {
          result1 = result.children.find(o => {
            if (o.B_ACC_CODE == number1) {
              return o;
            }
          });
        }
        let a = [
          {
            PAYDATE: this.dateValue,
            IMONEY: this.money,
            PURPOSE: this.purpose,
            CFUNCTIONCODE1: result.B_ACC_CODE,
            CFUNCTIONNAME1: result.B_ACC_NAME,
            CFUNCTIONCODE2: result1.B_ACC_CODE,
            CFUNCTIONNAME2: result1.B_ACC_NAME,
            CFUNCTIONCODE3: this.functionValue.split(" ")[0],
            CFUNCTIONNAME3: this.functionValue.split(" ")[1],

            ENAME: this.paymentName,
            PAYBANKNO: this.paymentAccount,
            PAYBANKNAME: this.paymentBankName,

            RECNAME: this.reciveName,
            RECBANKNO: this.reciveAccount,
            RECBANKNAME: this.reciveBankName,

            CBMUNITID: this.cbmunitid,
            IYEAR: this.year,
            PNO: this.pno
          }
        ];
        //更新数据
        updateDateSourceZdybkList(a).then(response => {
          (this.dialogTableVisible = false),
            //重新调用
            this.getSourceDate(
              this.activeTabsName,
              this.startDate,
              this.endDate,
              this.valueContent
            );
        });
      }
    },
    handleNameFilter(val) {
      this.$refs.selectTree.filter(val);
    },
    //搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.ID.indexOf(value) !== -1;
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

    //审批
    approval() {
      console.log(this.multipleSelection1);
      if (this.multipleSelection1.length == 0) {
        Message({
          message: "您还没未选中任何数据！！！",
          type: "warning"
        });
      } else {
        let nickName = localStorage.getItem("NICKNAME");
        this.$confirm("是否审批这些拨款记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            approvalZdybkList({
              list: this.multipleSelection1,
              EXAMER: this.nickName
            }).then(response => {
              this.getSourceDate(
                this.activeTabsName,
                this.startDate,
                this.endDate,
                this.valueContent
              );
            });
          })
          .catch(() => {});
      }
    },
    //删除
    deleteDate() {
      if (this.multipleSelection1.length == 0) {
        Message({
          message: "您还没未选中任何数据！！！",
          type: "warning"
        });
      } else {
        let nickName = localStorage.getItem("NICKNAME");
        this.$confirm("是否删除这些拨款记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteZdybkList(this.multipleSelection1).then(response => {
              this.getSourceDate(
                this.activeTabsName,
                this.startDate,
                this.endDate,
                this.valueContent
              );
            });
          })
          .catch(() => {});
      }
    },
    //编辑
    deitDate() {
      if (this.multipleSelection1.length == 0) {
        Message({
          message: "您还没未选中任何数据！！！",
          type: "warning"
        });
      } else if (this.multipleSelection1.length == 1) {
        console.log(this.multipleSelection1);
        this.pno = this.multipleSelection1[0].PNO;
        this.dateValue = this.multipleSelection1[0].PAYDATE;
        this.money = this.multipleSelection1[0].IMONEY;
        this.purpose = this.multipleSelection1[0].PURPOSE;
        this.functionValue = this.multipleSelection1[0].CFUNCTION3;

        this.paymentName = this.multipleSelection1[0].ENAME;
        this.paymentAccount = this.multipleSelection1[0].PAYBANKNO;
        this.paymentBankName = this.multipleSelection1[0].PAYBANKNAME;

        this.reciveName = this.multipleSelection1[0].RECNAME;
        this.reciveAccount = this.multipleSelection1[0].RECBANKNO;
        this.reciveBankName = this.multipleSelection1[0].RECBANKNAME;
        this.dialogTableVisible = true;
        this.focusFunctionContent();
      } else {
        Message({
          message: "只能够单行进行编辑！！！",
          type: "warning"
        });
      }
    },
    //获取用途的数据
    getPurposeDateSource() {
     
        getPurposeZdybkList({
          STATUS: 1,
          C_YEAR: this.year,
          OPERATOR: this.nickName,
          POWER: this.power,
          CBMUNITID: this.cbmunitid
        }).then(response => {
          this.purposeOptions = response.dataList;
        });
     
    },
    //获取功能科目树状数据
    focusFunctionContent(e) {
      if (this.functionOptions.length == 0) {
        //聚焦的时候去获取数据
        let co_code = localStorage.getItem("CO_CODE");
        getTreeFunctionZdybkList({
          CO_CODE: co_code,
          FISCAL: "2019",
          FIS_PERD: "04"
        }).then(response => {
          this.functionOptions = response.dataList;
          this.savefunctionOptions = response.dataList;
        });
      } else {
      }
    },

    // 切换选项
    handleNodeClick(node) {
      if (node.IS_LOWEST == "N") {
      } else {
        this.functionValue = node[this.props.label];
        this.defaultExpandedKey = [];
      }
    },
    // 清除选中
    clearHandle() {
      this.functionValue = "";
      this.defaultExpandedKey = [];
    },
    //获取付款单位的名称数据
    getPayNameDateSource() {
      if (this.paymentNameOptions.length == 0) {
        getPayNameZdybkList({
          STATUS: 1,
          C_YEAR: this.year,
          OPERATOR: this.nickName,
          POWER: this.power,
          CBMUNITID: this.cbmunitid
        }).then(response => {
          this.paymentNameOptions = response.dataList;
        });
      } else {
      }
    },
    //付款单位的下拉框选中的数值改变
    changePayNameDateSource(e) {
      console.log(e);
      let a = this.paymentNameOptions.find(o => {
        if (o.PNO == e) {
          return o;
        }
      });
      this.paymentName = a.ENAME;
      this.paymentBankName = a.PAYBANKNAME;
      this.paymentAccount = a.PAYBANKNO;
    },
    //获取收款单位的名称数据
    getreciveNameDateSource() {
      // if (this.reciveNameOptions.length == 0) {
        getReciveNameZdybkList({
          STATUS: 1,
          C_YEAR: this.year,
          OPERATOR: this.nickName,
          POWER: this.power,
          CBMUNITID: this.cbmunitid
        }).then(response => {
          this.reciveNameOptions = response.dataList;
        });
      // } else {
      // }
    },
    //收款单位的下拉框选中的数值改变
    changeReciveNameDateSource(e) {
      console.log(e);
      let a = this.reciveNameOptions.find(o => {
        if (o.PNO == e) {
          return o;
        }
      });
      this.reciveName = a.RECNAME;
      this.reciveAccount = a.RECBANKNO;
      this.reciveBankName = a.RECBANKNAME;
    },

    //拨款单录入
    inputTable() {
      this.dateValue = "";
      this.money = "";
      this.purpose = "";
      this.functionValue = "";

      this.paymentName = "";
      this.paymentAccount = "";
      this.paymentBankName = "";

      this.reciveName = "";
      this.reciveAccount = "";
      this.reciveBankName = "";
      this.dialogTableVisible1 = true;
    },
    //搜索
    search() {
        let cpostguid=localStorage.getItem("CPOSTGUID");
        this.loading = true;
      if(this.valueContent==''||this.startDate==''||this.endDate==''){
         if(this.startDate==null){
             this.startDate=''
           }
             if(this.endDate==null){
             this.endDate=''
           }

        this.getSourceDate(
      this.activeTabsName,
      this.startDate,
      this.endDate,
      this.valueContent
    )
    
      }else if(this.startDate==null||this.endDate==null){
           if(this.startDate==null){
             this.startDate=''
           }
            if(this.endDate==null){
             this.endDate=''
           }
         
              this.getSourceDate(
      this.activeTabsName,
      this.startDate,
      this.endDate,
      this.valueContent
    )

      }else{
                this.getSourceDate(
      this.activeTabsName,
      this.startDate,
      this.endDate,
      this.valueContent
    )
      }
    
    },
    
    handleTabsClick(tab, event) {
      this.activeTabsName = tab.name;
      this.getSourceDate(tab.name, this.startDate, this.endDate, this.valueContent);
    },

    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },
    getSourceDate(activeTabs, beginTime, endTime, recname) {
      this.loading = true;
      let cpostguid = localStorage.getItem("CPOSTGUID");
      if(beginTime==null){
        beginTime=''
      }else if(endTime==null){
          endTime=''
      }
      getZdybkList({
        STATUS: 1,
        BEGINDATE: beginTime,
        ENDDATE: endTime,
        CBMUNITID: this.cbmunitid,
        IYEAR: this.year,
        STATE: activeTabs,
        RECNAME: recname,
        POWER: this.power,
        CPOSTGUID: cpostguid,
        SORT: "0"
      })
        .then(response => {
          if (activeTabs == "0") {
            this.tableData = response.dataList;
          } else if (activeTabs == "1") {
            this.tableData1 = response.dataList;
          } else if (activeTabs == "2") {
            this.tableData2 = response.dataList;
          }
          this.loading = false;
        })
        .catch(() => {
          if (activeTabs == "0") {
            this.tableData = [];
          } else if (activeTabs == "1") {
            this.tableData1 = [];
          } else if (activeTabs == "2") {
            this.tableData2 = [];
          }
          this.loading = false;
        });
    },
 toDoubleThousands(num) {//可以传入number或者string
	//判断是否有小数点
	var s = num.toString().indexOf(".");
	if(s == -1){//是整数
		return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+".00";
	}else{//是小数
		var arr = num.toString().split(".");
		if(arr.length > 1 && arr[1].length < 2){//一位小数
			return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1] + "0";
		}else{//两位小数
			return (arr[0] || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + "." + arr[1];
		}
	}
}
  },
  created() {
    this.cbmunitid = localStorage.getItem("CBMUNITID");
    this.power = localStorage.getItem("POWER");
    this.nickName = localStorage.getItem("NICKNAME");
    let nowDate = new Date();
    this.year = nowDate.getFullYear();
    this.month = nowDate.getMonth() + 1;
    this.getSourceDate(
      this.activeTabsName,
      this.startDate,
      this.endDate,
      this.valueContent
    );
  }
};
</script>
<style lang='scss' scope >
.choose_wrap {
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.do_wrap {
  margin-top: 3rem;
  text-align: right;
  padding-right: 0.5rem;
  margin-right: 10px;
}
.header_content {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-top: 1rem;
}
.content1_show {
  padding: 15px;
}
.date_wrap {
  margin-top: 2rem;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
}

.tableContent {
  .table {
    border-spacing: 0;
    border-collapse: collapse;
    margin-top: 1px;

    td {
      height: 40px;
      line-height: 40px;
      border: 1px solid #dbdbdc;
      color: black;
      font-weight: 500;
      text-align: center;
    }
  }
}

.el-dialog__header {
  border-bottom: 1px solid #e6e6e6;
}
.common_style {
  border-bottom: 1px solid #dbdbdc;
  height: 50px;
  line-height: 50px;
}
.pagination_wrap {
  margin-top: 20px;
}
</style>