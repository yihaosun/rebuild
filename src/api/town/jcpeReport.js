/*---------------------------基础配置------------------------------*/

import request from '@/utils/request'

//获取用途模块的信息
export function getpurposeList(data) {
    return request({
        url: '/purpose/list',
        method: 'post',
        data　　
    })
}

//获取收款单位的信息
export function getReciveBankList(data) {
    return request({
        url: '/recbank/list',
        method: 'post',
        data　　
    })
}
//获取付款单位的信息
export function getPayBankList(data) {
    return request({
        url: 'paybank/list',
        method: 'post',
        data　　
    })
}


//收款单位添加
export function addReciveBankName(data) {
    return request({
        url: '/recbank/add',
        method: 'post',
        data
    })
}
//付款单位添加
export function payBankName(data) {
    return request({
        url: '/paybank/add',
        method: 'post',
        data
    })
}

//用途添加
export function addPurposeNameList(data) {
    return request({
        url: '/purpose/insertone',
        method: 'post',
        data
    })
}

//用途模块下载
export function downPurposeList(data) {
    return request({
        url: '/purpose/list',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}
//下载付款单位的信息
export function downPayBankList(data) {
    return request({
        url: '/paybank/list',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}

//下载收款单位的信息
export function downReciveBankList(data) {
    return request({
        url: '/recbank/list',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}



//用途模块删除
export function deletePurposeList(data) {
    return request({
        url: '/purpose/delete',
        method: 'post',
        data,

    })
}
//付款单位模块删除
export function deletePayBankList(data) {
    return request({
        url: '/paybank/delete',
        method: 'post',
        data,
    })
}
//收款单位模块删除
export function deleteReciveBankList(data) {
    return request({
        url: '/recbank/delete',
        method: 'post',
        data,
    })
}