import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创造一个请求
const service = axios.create({
        // 47.98.62.204
        //192.168.0.105
        baseURL: 'http://47.98.62.204:8080/CapitalAdmin', // url = base url + request url
        // withCredentials: true, // send cookies when cross-domain requests
        timeout: 10000000000 // 设置延迟

    })
    // 拦截器
service.interceptors.request.use(
        config => {
            // 在发送请求之前设置头部
            if (store.getters.token) {
                config.headers['X-Token'] = getToken()
            }

            return config
        },
        error => {
            // 输出错误信息
            console.log(error) // for debug
            return Promise.reject(error);
        }
    )
    // 拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
            //excel文件下载时候的提示
        if (response.headers['content-type'] == 'application/ms-excel;charset=UTF-8') {
            Message({
                message: '下载中...',
                type: 'success',
            })
            return res;
        } else if (response.headers['content-type'] == 'multipart/form-data;charset=UTF-8') {
            Message({
                message: '下载中...',
                type: 'success',
            })
            return res;
        } else {
            if (!res.code) {
                if (res.size == '67') {
                    Message({
                        message: '未生成该报表',
                        type: 'error',
                    })
                } else {
                    Message({
                        message: res.msg || 'Error',
                        type: 'error',
                    })
                }
                return Promise.reject(new Error(res.msg || 'Error'))
            } else {
                // console.log(res.msg)
                if (res.msg == '数据不存在') {
                    res.msg = '数据生成中'
                }
                if (res.msg == '成功') {

                } else {
                    Message({
                        message: res.msg,
                        type: 'success'
                    })
                }
                return res
            }
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service