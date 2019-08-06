<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  
}
</script>
<style>
#app .sidebar-container {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 210px !important;
    height: 105%;
    position: absolute;
    font-size: 0px;
    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    border-right: 1px solid #dedede;
}
.header_all{
            height: 61px;
    /* padding: 0 50px; */
    line-height: 60px;
    background: #4ea9ff;
    text-align: left;
    padding-left: 25px;
    font-size: 1.6rem;
    color: white;
    font-weight: 500;
    border-bottom: 1px solid #dedede;
   
}
.el-table td, .el-table th {
    padding: 6px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
}
.el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    font-size: 14px;
}
.el-table__footer-wrapper tbody td,
.el-table__header-wrapper tbody td {
  background-color: #409eff;
  color: white;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
}

.el-table__fixed-footer-wrapper tbody td {
   background-color: #409eff;
  color: white;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
}
.el-table_1_column_3 {
  text-align: right !important;
}
.el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 22px!important;
}
.svg-icon[data-v-c8a70580] {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 1.2rem;
}

</style>
