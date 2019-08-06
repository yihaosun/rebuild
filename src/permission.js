import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar


const whiteList = ['/login', '/auth-redirect'] //白名单，不需要登录就能够访问的
router.beforeEach(async(to, from, next) => {

    // start progress bar
    NProgress.start();
    let CBMUNITID = localStorage.getItem('CBMUNITID');
    let id = localStorage.getItem('id');
    //如果有token 值，那就走这边
    if (CBMUNITID) {
        //用户token存在，就直接从登录页面跳到首页了
        if (to.path == '/login') {

            next({ path: '/' })

            // if is logged in, redirect to the home page
            //  NProgress.done()
        } else {
            // next()
            //是否有路由表生成
            if (id != '1') {

                console.log("dfdf")
                next()
            } else {
                // next()
                try {
                    let CPOSTGUID = localStorage.getItem('CPOSTGUID');
                    let roles = []
                        //获取用户信息
                        //注意：角色必须是数组对象！搜索为：['admin']或['developer'、'editor']
                    if (CPOSTGUID == '04') {
                        roles = ['gov']
                    } else if (CPOSTGUID == '01') {
                        roles = ['town']
                    } else {
                        roles = []
                    }
                    // this.$store.getters.roles = '1233';

                    // console.log(roles)
                    // let roles = await store.dispatch('user/getInfo')
                    //根据角色生成可访问的路由映射
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                        // console.log(accessRoutes)
                    router.addRoutes(accessRoutes)

                    localStorage.setItem('id', '2');
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true })

                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next('/login')
                    NProgress.done()
                }
            }

        }
    } else {



        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {

            // // 在免登录白名单，直接进入
            next()
        } else {
            //访问别的页面，如果没有权限，则跳转到登录页面
            next('/login')
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})