/** 财政账 网络请求 */

import request from '@/utils/request'
/*------------------------------------------        财政账             -------------------------------------------*/
/*

/*------------------------------------------ 预算执行  -------------------------------------------*/


// 判断预算执行表之前是否生成过
export function isExist(data) {
    return request({
        url: 'report/exceute/isExist',
        method: 'post',
        data　　
    })
}
//获取预算执行的数据
export function getYszxList(data) {
    return request({
        url: 'report/exceute/getData',
        method: 'post',
        data　　
    })
}
//查看预算执行的数据
export function lookYszxList(data) {
    return request({
        url: 'report/exceute/getlist',
        method: 'post',
        data　　
    })
}
//保存预算执行的数据
export function updateYszxList(data) {
    return request({
        url: 'report/exceute/update',
        method: 'post',
        data　　
    })
}
//下载预算执行的数据
export function downYszxList(data) {
    return request({
        url: 'report/exceute/getlist',
        method: 'post',
        data　,
        responseType: "blob",
    })
}


/*

/*------------------------------------------预算支出-------------------------------------------*/


// 判断预算支出表之前是否生成过
export function isYszcExist(data) {
    return request({
        url: 'report/outgoings/isExist',
        method: 'post',
        data　　
    })
}

//获取预算支出的数据
export function getYszcList(data) {
    return request({
        url: 'report/outgoings/getData',
        method: 'post',
        data　　
    })
}
//保存预算支出表的数据
export function updateYszcList(data) {
    return request({
        url: '/report/outgoings/update',
        method: 'post',
        data　　
    })
}
//查看预算支出的数据
export function lookYszcList(data) {
    return request({
        url: '/report/outgoings/getlist',
        method: 'post',
        data　　
    })
}

//下载预算支出的数据
export function downYszcList(data) {
    return request({
        url: '/report/outgoings/getlist',
        method: 'post',
        data　,
        responseType: "blob",
    })
}







/*------------------------------------------资产负债表-------------------------------------------*/

//获取资产负债表的数据（生成报表）
export function getZcfzList(data) {
    return request({
        url: 'report/debt/getlist',
        method: 'post',
        data　　
    })
}
//下载资产负债表的数据
export function downZcfzList(data) {
    return request({
        url: '/report/debt/getlist',
        method: 'post',
        data,
        //  header: { "Content-Type": "application/xls" }, // http请求类型
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}



/*------------------------------------------专户收支-------------------------------------------*/
//获取专户收支的数据（生成报表）
export function getZhszList(data) {
    return request({
        url: 'report/specialr/getData',
        method: 'post',
        data　　
    })
}
//下载专户收支的数据
export function downZhszList(data) {
    return request({
        url: '/report/debt/getlist',
        method: 'post',
        data,
        //  header: { "Content-Type": "application/xls" }, // http请求类型
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}

/*------------------------------------------教育收支-------------------------------------------*/

// 判断教育收支表之前是否生成过
export function isJyszExist(data) {
    return request({
        url: 'report/education/isExist',
        method: 'post',
        data　　
    })
}


//获取教育收支表的数据
export function getJyszList(data) {
    return request({
        url: 'report/education/getData',
        method: 'post',
        data　　
    })
}

//查看教育收支表数据
export function lookJyszExist(data) {
    return request({
        url: 'report/education/getlist',
        method: 'post',
        data　　
    })
}


//保存教育收支表数据
export function updateJyszList(data) {
    return request({
        url: 'report/education/update',
        method: 'post',
        data　　
    })
}

//下载教育收支表数据
export function downJyszList(data) {
    return request({
        url: 'report/education/getlist',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream

    })
}



/*------------------------------------------财政收入-------------------------------------------*/

//查看财政收入表数据
export function lookCzsrList(data) {
    return request({
        url: 'report/income/getList',
        method: 'post',
        data　　
    })
}
//下载财政收入表数据
export function downCzsrList(data) {
    return request({
        url: 'report/income/getList',
        method: 'post',
        data　,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream　
    })
}



/*------------------------------------------年度预算-------------------------------------------*/

//查看年度预算表数据
export function lookNdysList(data) {
    return request({
        url: 'report/earlyYear/getlist',
        method: 'post',
        data　　
    })
}
//保存年度预算表数据
export function updateNdysList(data) {
    return request({
        url: 'report/earlyYear/update',
        method: 'post',
        data　　
    })
}