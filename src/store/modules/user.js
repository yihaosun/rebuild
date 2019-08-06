import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
}

const mutations = {

    SET_ROLES: (state, roles) => {
        state.roles = roles
    }

}

const actions = {


    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {

            let CPOSTGUID = localStorage.getItem('CPOSTGUID');
            let data = []
                //获取用户信息
                //注意：角色必须是数组对象！搜索为：['admin']或['developer'、'editor']
            if (CPOSTGUID == '04') {
                data = ['admin']
            } else if (CPOSTGUID == '01') {
                data = ['town']
            } else {
                data = []
            }

            if (!data) {
                reject('Verification failed, please Login again.')
            }
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
                reject('getInfo: roles must be a non-null array!')
            }
            commit('SET_ROLES', 'wwewe')
            resolve(data)

        })
    },




}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}