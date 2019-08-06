<template>
  <el-table-column 
    align="center"
    :label="col.label"
    :property="col.property"
    width="120"
    fixed
    v-if='index==0||index==1'
    >
  </el-table-column>
  <el-table-column 
    align="center"
    :label="col.label"
    :property="col.property"
    width="160"
    v-else
    >
     <template  slot-scope="scope" >
       <div v-if='col.property=="MONEY1"'>
         <div    v-if='isEditor'>
         <el-input 
                  v-model="scope.row.MONEY1"
                   :disabled="true"
                ></el-input>
         </div>
           <div v-if='!isEditor'>
            {{scope.row.MONEY1}}
          </div> 
       </div>
         <div v-if='col.property=="MONEY2"'>
             <div    v-if='isEditor'>
         <el-input 
                  v-model="scope.row.MONEY2"
                   clearable
                   type='number'
                      size='small '
                    @input="handleClick(scope.$index,scope.row)"
                ></el-input>
             </div>
                  <div v-if='!isEditor'>
            {{scope.row.MONEY2}}
          </div>
       </div>
         <div v-if='col.property=="MONEY3"'>
           {{scope.row.MONEY3}}
       </div>
        <div v-if='col.property=="MONEY4"'>
           <div v-if='isEditor'>
         <el-input 
                  v-model="scope.row.MONEY4"
                   :disabled="true"
                      size='small '
                      
                ></el-input>
           </div>
                  <div v-if='!isEditor'>
            {{scope.row.MONEY4}}
          </div>
       </div>
        <div v-if='col.property=="MONEY6"'>
           {{scope.row.MONEY6}}
       </div>
         <div v-if='col.property=="PLAN"'>
           <div v-if='isEditor'>
         <el-input 
                  v-model="scope.row.PLAN"
                   :disabled="true"
                      size='small '
                ></el-input>
           </div>
                <div v-if='!isEditor'>
            {{scope.row.PLAN}}
          </div>
       </div>
        <div v-if='col.property=="MONEY8"'>
           <div v-if='isEditor'>
         <el-input 
                  v-model="scope.row.MONEY8"
                     size='small '
                         type='number'
                ></el-input>
           </div>
                 <div v-if='!isEditor'>
            {{scope.row.MONEY8}}
          </div>
       </div>
        <div v-if='col.property=="INDECREASE2"'>
          <div v-if='isEditor'>
         <el-input 
                  v-model="scope.row.INDECREASE2"
                     size='small '
                        type='number'
                ></el-input>
          </div>
                  <div v-if='!isEditor'>
            {{scope.row.INDECREASE2}}
          </div>
       </div>
    </template>
<!--   :key='Math.random()' 解决当切换tab时各表格的表头会受前一个tab下的表格影响 -->
    <template v-if="col.children">
      <v-column v-for="(item1, index1) in col.children"
       :key='index1'
        :col="item1"
          :isEditor='isEditor'
        ></v-column>
    </template>
  </el-table-column>
</template>
<script>
import { setInterval } from 'timers';
export default {
  name: 'v-column',
  props: ['col','index','isEditor'],
  data(){
    return{
    }
  },
  created(){
  },

  methods: {
    handleClick(e,e1){
      console.log(e1.MONEY2)
      if(e1.MONEY1==null){
e1.MONEY1=0;
      }
       if(e1.MONEY2==null){
e1.MONEY2=0;
      }

   if(e1.MONEY3==null){
e1.MONEY3=0;
      }
      if(e1.MONEY6==null){
        e1.MONEY6=0;
      }
     let result=Number(e1.MONEY1)+Number(e1.MONEY2)+Number(e1.MONEY3);
      e1.MONEY4=result.toFixed(2);
        let pre= Number(e1.MONEY6)/Number( e1.MONEY4)
        console.log(pre);
        e1.PLAN= pre.toFixed(2)*100;
    }
  
  },

}
</script>
<style >

</style>