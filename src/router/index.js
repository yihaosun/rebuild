import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
    /* Layout */
import Layout from '@/layout'
//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面


export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true,
        name: 'login'
    },
    {
        path: '/',
        name: 'firstPage',
        component: () =>
            import ('@/views/user/firstPage/firstPage'),
    },

    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () =>
                import ('@/views/user/dashboard/index'),
            meta: { title: '数据展示', icon: 'home', affix: true }
        }]
    },

]
export const asyncRoutes1 = [{
        path: '/xmReport',
        component: Layout,
        redirect: '/xmReport/xmReport',
        meta: { roles: ['town'], title: '页面需要权限', }, //页面需要的权限
        children: [{
            path: 'xmReport',
            name: 'xmReport',
            component: () =>
                import ('@/views/user/xmReport/xmReport'),
            meta: { title: '项目库', icon: 'xiangmu', affix: true }
        }]
    },

    // {

    //     path: '/yusuanxiangmu',
    //     component: Layout,
    //     redirect: '/yusuanxiangmu/zyzjReport',
    //     alwaysShow: true,
    //     name: 'yusuanxiangmu',

    //     meta: { title: '预算项目滚动库', icon: 'ku', roles: ['town'], },
    //     children: [{
    //         path: 'zyzjReport',
    //         name: 'zyzjReport',
    //         component: () =>
    //             import ('@/views/user/ysxmgdReport/zyzjReport'),
    //         meta: { title: '自有资金项目' }
    //     }]
    // },
    {
        path: '/ybzxReport',
        redirect: '/ybzxReport/example/zcgnreport',
        component: Layout,

        meta: { title: '月报中心', icon: 'wenjian', roles: ['town'], },
        name: "ybzxReport",
        children: [{
                path: 'example',
                redirect: '/ybzxReport/example/zcgnreport',
                name: 'example',
                meta: { title: '上报中心' },
                component: () =>
                    import ('@/views/user/ybzxReport/reportappear/index'),
                children: [{
                        path: 'zcgnreport',
                        name: 'zcgnreport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportappear/ZcgnReport'),
                        meta: { title: '支出功能月报' }
                    },
                    {
                        path: 'jjkmreport',
                        name: 'jjkmreport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportappear/JjkmReport'),
                        meta: { title: '经济科目月报' }
                    },
                    {
                        path: 'jbzcreport',
                        name: 'jbzcreport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportappear/JbzcReport'),
                        meta: { title: '基本支出月报' }
                    },
                ]
            },
            {
                path: 'caizheng',
                component: Layout,
                redirect: '/ybzxReport/caizheng/yszxReport',
                name: 'caizheng',
                component: () =>
                    import ('@/views/user/ybzxReport/reportecon/index'),
                meta: { title: '财政账' },
                children: [{
                        path: 'zcfzReport',
                        name: 'zcfzReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/zcfzReport'),
                        meta: { title: '资产负债表' }
                    },
                    {
                        path: 'yszxReport',
                        name: 'yszxReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/yszxReport'),
                        meta: { title: '预算执行表' }
                    },
                    {
                        path: 'yszcReport',
                        name: 'yszcReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/yszcReport'),
                        meta: { title: '预算支出表' }
                    },
                    {
                        path: 'zhszReport',
                        name: 'zhszReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/zhszReport'),
                        meta: { title: '专户收支表' }
                    },
                    {
                        path: 'jyszReport',
                        name: 'jyszReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/jyszReport'),
                        meta: { title: '教育收支表' }
                    },
                    {
                        path: 'czsrReport',
                        name: 'czsrReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/czsrReport'),
                        meta: { title: '财政收入表' }
                    },
                    {
                        path: 'ndysReport',
                        name: 'ndysReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportecon/ndysReport'),
                        meta: { title: '年度预算表' }
                    },

                ]
            },
            {
                path: 'zhenfu',
                redirect: '/ybzxReport/zhenfu/zcfzGovReport',
                component: () =>
                    import ('@/views/user/ybzxReport/reportecon/index'),
                name: 'zhenfu',
                meta: { title: '政府账' },
                children: [{
                        path: 'zcfzGovReport',
                        name: 'zcfzGovReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportgov/zcfzGovReport'),
                        meta: { title: '资产负债表' }
                    },
                    {
                        path: 'grhjtGovReport',
                        name: 'grhjtGovReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportgov/grhjtGovReport'),
                        meta: { title: '个人和家庭补助表' }
                    },
                    {
                        path: 'gzflGovReport',
                        name: 'gzflGovReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportgov/gzflGovReport'),
                        meta: { title: '工资福利支出表' }
                    },
                    {
                        path: 'qtzbGovReport',
                        name: 'qtzbGovReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportgov/qtzbGovReport'),
                        meta: { title: '其他资本性支出表' }
                    },
                    {
                        path: 'sphfwGovReport',
                        name: 'sphfwGovReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportgov/sphfwGovReport'),
                        meta: { title: '商品和服务支出表' }
                    },
                    {
                        path: 'jfzcGovReport',
                        name: 'jfzcGovReport',
                        component: () =>
                            import ('@/views/user/ybzxReport/reportgov/jfzcGovReport'),
                        meta: { title: '经费支出表' }
                    },
                ]
            },
        ]
    },
    {
        path: '/bkglReport',
        component: Layout,
        redirect: '/bkglReport/zdybkReport',
        alwaysShow: true,
        name: 'bkglReport',

        meta: { title: '拨款管理', icon: 'bokuan', roles: ['town'], },
        children: [{
                path: 'zdybkReport',
                name: 'zdybkReport',
                component: () =>
                    import ('@/views/user/bkglReport/zdybkReport'),
                meta: { title: '自定义拨款单' }
            },
            {
                path: 'jcpzReport',
                name: 'jcpzReport',
                component: () =>
                    import ('@/views/user/bkglReport/jcpzReport'),
                meta: { title: '基础配置' }
            }

        ]
    },

    {
        path: '/duizhangdan',
        component: Layout,
        redirect: '/duizhangdan/bzdzReport',
        alwaysShow: true,
        name: 'duizhangdan',

        meta: { title: '区级资金对账单', icon: 'duizhang', roles: ['town'], },
        children: [{
                path: 'bzdzReport',
                name: 'bzdzReport',
                component: () =>
                    import ('@/views/user/reportqjzj/bzdzReport'),
                meta: { title: '补助对账' }
            },
            {
                path: 'zcdzReport',
                name: 'zcdzReport',
                component: () =>
                    import ('@/views/user/reportqjzj/zcdzReport'),
                meta: { title: '暂存对账' }
            },

        ]
    }

]



//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRoutes = [



    {
        path: '/zhengfushangchuan',
        component: Layout,
        meta: { roles: ['gov'], title: '页面需要权限', }, //页面需要的权限
        children: [{
            path: 'wjscReport',
            component: () =>
                import ('@/views/gov/wjscReport/wjscReport'),
            name: 'wjscReport',
            meta: { title: '(政府)文件上传', icon: 'zip' },
        }]
    },
    {
        path: '/zhengfuyuebao',
        component: Layout,
        redirect: '/zhengfuyuebao/zcgnReport',
        alwaysShow: true,
        name: 'zhenfuyuebao',
        meta: { title: '(政府的)月报中心', icon: 'zip', roles: ['gov'], },
        children: [{
                path: 'zcgnReport',
                name: 'zcgnReport',
                component: () =>
                    import ('@/views/gov/reportappear/zcgnReport'),
                meta: { title: '支出功能月报', icon: 'table' }
            },

            {
                path: 'jjkmReport',
                name: 'jjkmReport',
                component: () =>
                    import ('@/views/gov/reportappear/jjkmReport'),
                meta: { title: '经济科目报表', icon: 'table' }
            },
            {
                path: 'jbzcReport',
                name: 'jbzcReport',
                component: () =>
                    import ('@/views/gov/reportappear/jbzcReport'),
                meta: { title: '基本支出月报', icon: 'table' }
            },

        ]
    },
    {
        path: '/zhengfuhuizong',
        component: Layout,
        meta: { roles: ['gov'], title: '页面需要权限', }, //页面需要的权限
        redirect: '/zhengfuhuizong/zcgnAllReport',
        alwaysShow: true,
        name: 'zhenfuhuizong',
        meta: { title: '(政府的)月报汇总查询', icon: 'zip' },
        children: [{
                path: 'zcgnAllReport',
                name: 'zcgnAllReport',
                component: () =>
                    import ('@/views/gov/allMonthReport/zcgnAllReport'),
                meta: { title: '支出功能汇总月报', icon: 'table' }
            },
            {
                path: 'jjkmAllReport',
                name: 'jjkmAllReport',
                component: () =>
                    import ('@/views/gov/allMonthReport/jjkmAllReport'),
                meta: { title: '经济科目汇总月报', icon: 'table' }
            },
            {
                path: 'jbzcAllReport',
                name: 'jbzcAllReport',
                component: () =>
                    import ('@/views/gov/allMonthReport/jbzcAllReport'),
                meta: { title: '基本支出汇总月报', icon: 'table' }
            }
        ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];





//实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router