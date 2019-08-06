import request from '@/utils/request'

/*----------------------------------------支出功能月报---------------------------------------------*/
//获取下拉框的内容
export function dropDownGnkmList(params) {
    return request({
        url: 'cbmunits/query',
        method: 'get',
        params
    })
}


//获取支出功能月报(查看)
export function lookGnkmList(data) {
    return request({
        url: 'GNKM/list',
        method: 'post',
        data
    })
}
//更新支出功能月报
export function saveGnkmList(data) {
    return request({
        url: 'GNKM/qcz/edit',
        method: 'post',
        data
    })
}


//确认支出功能月报
export function commitGnkmList(data) {
    return request({
        url: 'GNKM/qcz/enter',
        method: 'post',
        data
    })
}
//退回报表
export function backGnkmList(data) {
    return request({
        url: 'GNKM/qcz/goback',
        method: 'post',
        data
    })
}


/*----------------------------------------经济科目报表---------------------------------------------*/

//获取经济科目报表(查看)
export function lookJjkmList(data) {
    return request({
        url: 'JJKM/list',
        method: 'post',
        data
    })
}
//更新经济科目报表
export function saveJjkmList(data) {
    return request({
        url: 'JJKM/qcz/edit',
        method: 'post',
        data
    })
}
//确认经济科目报表
export function commitJjkmList(data) {
    return request({
        url: 'JJKM/qcz/enter',
        method: 'post',
        data
    })
}

//退回经济科目报表
export function backJjkmList(data) {
    return request({
        url: 'JJKM/qcz/goback',
        method: 'post',
        data
    })
}



/*----------------------------------------基本支出月报---------------------------------------------*/


//获取基本支出月报表(查看)
export function lookJbzcList(data) {
    return request({
        url: 'JBZC/list',
        method: 'post',
        data
    })
}
//更新基本支出
export function saveJbzcList(data) {
    return request({
        url: 'JBZC/qcz/edit',
        method: 'post',
        data
    })
}
//确认基本支出
export function commitJbzcList(data) {
    return request({
        url: 'JBZC/qcz/enter',
        method: 'post',
        data
    })
}

//退回基本支出
export function backJbzcList(data) {
    return request({
        url: 'JBZC/qcz/goback',
        method: 'post',
        data
    })
}