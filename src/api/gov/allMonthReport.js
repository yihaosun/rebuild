import request from '@/utils/request'

/*----------------------------------------支出功能汇总月报---------------------------------------------*/




//获取支出功能汇总月报(一体化取数)
export function lookZcgnByYthList(data) {
    return request({
        url: 'GNKM/getAllMoney',
        method: 'post',
        data
    })
}


//获取支出功能汇总月报(用友取数)
export function lookZcgnByYyList(data) {
    return request({
        url: 'yykjhs/getGnkmAllMoney',
        method: 'post',
        data
    })
}
//下载支出功能汇总月报(一体下载)
export function downZcgnByYthList(data) {
    return request({
        url: 'GNKM/getAllMoney',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}
//下载支出功能汇总月报(用友下载)
export function downZcgnByYyList(data) {
    return request({
        url: 'yykjhs/getGnkmAllMoney',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}





/*----------------------------------------经济科目汇总月报---------------------------------------------*/


//获取经济科目汇总月报(一体化取数)
export function lookJjkmByYthList(data) {
    return request({
        url: 'JJKM/getAllMoney',
        method: 'post',
        data
    })
}

//获取经济科目汇总月报(用友取数)
export function lookJjkmByYyList(data) {
    return request({
        url: 'yykjhs/getJjkmAllMoney',
        method: 'post',
        data
    })
}


//下载经济科目汇总月报(一体下载)
export function downJjkmByYthList(data) {
    return request({
        url: 'JJKM/getAllMoney',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}
//下载经济科目月报(用友下载)
export function downJjkmByYyList(data) {
    return request({
        url: 'yykjhs/getJjkmAllMoney',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}




/*----------------------------------------基本支出汇总月报---------------------------------------------*/


//获取基本支出汇总月报(一体化取数)
export function lookJbzcByYthList(data) {
    return request({
        url: 'JBZC/getAllMoney',
        method: 'post',
        data
    })
}

//获取基本支出汇总月报(用友取数)
export function lookJbzcByYyList(data) {
    return request({
        url: 'yykjhs/getJbzcAllMoney',
        method: 'post',
        data
    })
}


//下载基本支出汇总月报(一体下载)
export function downJbzcByYthList(data) {
    return request({
        url: 'JBZC/getAllMoney',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}
//下载基本支出汇总月报(用友下载)
export function downJbzcByYyList(data) {
    return request({
        url: 'yykjhs/getJbzcAllMoney',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}