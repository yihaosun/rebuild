import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n


import directives from "./utils/directives.js"

import '@/styles/index.scss' // global css


import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control



//打印
import Print from 'vue-print-nb'　　
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */




// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(Print); //注册
Vue.use(directives);
Vue.config.productionTip = false

localStorage.setItem('id', '1');

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})