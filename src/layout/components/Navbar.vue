<template>

  <div class="navbar">

    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
   
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

import SizeSelect from '@/components/SizeSelect'
export default {
  //注册
  components: {
    Breadcrumb,
    Hamburger,
   
    SizeSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  }, 
  data() {
    return {
       NICKNAME:""
    }
  },


  methods: {
      //设置缓存
    getToken(name) {
     return localStorage.getItem(name);
    },
    //清除浏览器所有缓存
    removeToken(){
window.localStorage.clear()
    },
    toggleSideBar() {
       this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
       this.removeToken();
      this.$router.push('/login')
    }
  },
  created(){
     this.NICKNAME=this.getToken('NICKNAME')
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  
}
</style>
