import request from '@/utils/request'

/*-------------------------------------项目库请求-------------------------------*/

//获取项目库的数据

//获取项目库表格的数据
export function getXmList(params) {
    return request({
        url: '/project/getList',
        method: 'get',
        params
    })
}


//暂存新建项目库表格的数据
export function addXmList(data) {
    return request({
        url: '/project/add',
        method: 'post',
        data
    })
}