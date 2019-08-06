/*--------------------------  自定义拨款单-----------------------*/
import request from '@/utils/request'

//获取收款单位的数据
export function getReceivingUnit(data) {
    return request({
        url: '/recbank/list',
        method: 'post',
        data　　
    })
}

//搜索获取数据
export function getZdybkList(data) {
    return request({
        url: '/pay/customisze/getlist',
        method: 'post',
        data　　
    })
}
//审批
export function approvalZdybkList(data) {
    return request({
        url: '/pay/customisze/exam',
        method: 'post',
        data　　
    })
}
//删除
export function deleteZdybkList(data) {
    return request({
        url: '/pay/customisze/delete',
        method: 'post',
        data　　
    })
}
//获取用途的数据
export function getPurposeZdybkList(data) {
    return request({
        url: '/purpose/list',
        method: 'post',
        data　　
    })
}

//获取树状的功能科目的数据
export function getTreeFunctionZdybkList(data) {
    return request({
        url: '/GNKM/getGNKMList',
        method: 'post',
        data
    })
}
//获取付款单位全称的数据
export function getPayNameZdybkList(data) {
    return request({
        url: '/paybank/list',
        method: 'post',
        data
    })
}
//获取收款单位全称的数据
export function getReciveNameZdybkList(data) {
    return request({
        url: '/recbank/list',
        method: 'post',
        data
    })
}


//更新数据
export function updateDateSourceZdybkList(data) {
    return request({
        url: '/pay/customisze/edit',
        method: 'post',
        data
    })
}


//下载表格
export function downDateSourceZdybkList(data) {
    return request({
        url: 'pay/customisze/export',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}

//收款银行单条增加
export function addReciveBankName(data) {
    return request({
        url: '/recbank/add',
        method: 'post',
        data
    })
}
export function addPurposeNameList(data) {
    return request({
        url: '/purpose/insertone',
        method: 'post',
        data
    })
}
//新中大模版下载
export function downTemplateList(data) {
    return request({
        url: '/pay/customisze/getlist',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}
//上传模版
export function submitList(data) {
    return request({
        url: '/pay/customisze',
        method: 'post',
        data,

    })
}