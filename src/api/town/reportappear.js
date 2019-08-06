import request from '@/utils/request'



/*----------------------------------------上报中心---------------------------------------------*/

/**上报中心 网络请求 */

//获取经济科目(生成报表)
export function getList(params) {
    return request({
        url: '/JJKM/getlist',
        method: 'get',
        params,
    })
}
//获取经济科目(查看)
export function lookList(data) {
    return request({
        url: '/JJKM/list',
        method: 'post',
        data
    })
}
//更新经济科目
export function saveList(data) {
    return request({
        url: '/JJKM/update',
        method: 'post',
        data
    })
}
//上传经济科目
export function commotList(data) {
    return request({
        url: '/JJKM/setid',
        method: 'post',
        data
    })
}
// 下载经济科目
export function downList(data) {
    return request({
        url: '/JJKM/list',
        method: 'post',
        data,
        //  header: { "Content-Type": "application/xls" }, // http请求类型
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
        　　
    })
}
//获取支出功能月报(生成报表)
export function getPayList(params) {
    return request({
        url: '/GNKM/getlist',
        method: 'get',
        params,
    })
}
//获取支出功能月报(查看)
export function lookPayList(data) {
    return request({
        url: '/GNKM/list',
        method: 'post',
        data
    })
}
//上传支出功能月报
export function commitpayList(data) {
    return request({
        url: '/GNKM/setid',
        method: 'post',
        data
    })
}
//更新支出功能月报
export function savePayList(data) {
    return request({
        url: '/GNKM/update',
        method: 'post',
        data
    })
}

// 下载支出功能月报
export function downPayList(data) {
    return request({
        url: '/GNKM/list',
        method: 'post',
        data,
        //  header: { "Content-Type": "application/xls" }, // http请求类型
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
        　　
    })
}


//获取基本支出报表(生成报表)
export function getBasePayList(params) {
    return request({
        url: '/JBZC/getlist',
        method: 'get',
        params,
    })
}
//获取基本支出报表(查看)
export function lookBasePayList(data) {
    return request({
        url: '/JBZC/list',
        method: 'post',
        data,
    })
}

// //更新基本支出报表
export function saveBasePayList(data) {
    return request({
        url: '/JBZC/update',
        method: 'post',
        data
    })
}

//上传基本支出功能月报
export function commitBasepayList(data) {
    return request({
        url: '/JBZC/setid',
        method: 'post',
        data
    })
}
// 下载基本支出功能月报
export function downBasePayList(data) {
    return request({
        url: '/JBZC/list',
        method: 'post',
        data,
        //  header: { "Content-Type": "application/xls" }, // http请求类型
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
        　　
    })
}
//基本支出功能月报对应关系查看
export function responseBasePayList(data) {
    return request({
        url: 'report/outgoings/page',
        method: 'post',
        data,
        　　
    })
}







//测试

// export function test(data) {
//     return request({
//         url: '/fileno/xz/getList',
//         method: 'post',
//         data
//     })
// }