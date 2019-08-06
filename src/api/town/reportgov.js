/**政府账 网络请求 */


import request from '@/utils/request'

/*-----------------------------------------------------------------------------政府账--------------------------*/


/*---------------------------------------------资产负债表--------------------------*/


//获取资产负债表的数据
export function getZcfzGovList(data) {
    return request({
        url: 'report/debtgov/getlist',
        method: 'post',
        data　　
    })
}
//下载资产负债表表的数据
export function downZcfzGovList(data) {
    return request({
        url: 'report/debtgov/getlist',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}



/*---------------------------------------------个人和家庭补助表--------------------------*/


//获取个人和家庭补助表的数据
export function getGrhjtList(data) {
    return request({
        url: 'report/gov/subsidy',
        method: 'post',
        data　　
    })
}
//下载个人和家庭补助表的数据
export function downGrhjtList(data) {
    return request({
        url: 'report/gov/subsidy',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}




/*---------------------------------------------工资福利支出表--------------------------*/

//获取工资福利支出表的数据
export function getGzflList(data) {
    return request({
        url: 'report/gov/salary',
        method: 'post',
        data　　
    })
}
//下载工资福利支出表的数据
export function downGzflList(data) {
    return request({
        url: 'report/gov/salary',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}



/*---------------------------------------------其他资本性支出表--------------------------*/

//获取其他资本性支出表的数据
export function getQtzbList(data) {
    return request({
        url: 'report/gov/otherpay',
        method: 'post',
        data　　
    })
}
//下载其他资本性支出表的数据
export function downQtzbList(data) {
    return request({
        url: 'report/gov/otherpay',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}



/*---------------------------------------------商品和服务支出表--------------------------*/

//获取商品和服务支出表表的数据
export function getSphfwList(data) {
    return request({
        url: 'report/gov/goods',
        method: 'post',
        data　　
    })
}
//下载商品和服务支出表表的数据
export function downSphfwList(data) {
    return request({
        url: 'report/gov/goods',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}




/*---------------------------------------------经费支出表--------------------------*/

//获取经费支出表的数据
export function getJfzcList(data) {
    return request({
        url: 'report/gov/jfzc',
        method: 'post',
        data　　
    })
}
//下载经费支出表的数据
export function downJfzcList(data) {
    return request({
        url: 'report/gov/jfzc',
        method: 'post',
        data,
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
    })
}