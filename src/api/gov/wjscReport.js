/*-------------------------------政府文件上传--------------------------------------------*/
import request from '@/utils/request'


//获取数据
export function getWjDataList(data) {
    return request({
        url: 'fileno/getList',
        method: 'post',
        data
    })
}


//选择文件下载
export function chooseWjDataList(data) {
    return request({
        url: '/fileno/xz/getFile',
        method: 'post',
        data,

    })
}
//文件下载
export function downWjDataList(data) {
    return request({
        url: '/fileno/down1',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}




//文件删除
export function deleteWjDataList(data) {
    return request({
        url: '/fileno/deletefile',
        method: 'post',
        data,
    })
}