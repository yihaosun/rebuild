/*-------------------------------补助对账--------------------------------------------*/
import request from '@/utils/request'


//获取补助对账的数据
export function getBzdzList(data) {
    return request({
        url: 'fileno/xz/getList',
        method: 'post',
        data
    })
}

//获取补助对账的数据
export function getBzdzFile(data) {
    return request({
        url: 'fileno/xz/getFile',
        method: 'post',
        data
    })
}

//下载补助对账的数据
export function downBzdzFile(data) {
    return request({
        url: '/fileno/down1',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}