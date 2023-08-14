import request from "@/api/request.js";

/**
 * @typedef {Object} LoginInfo
 * @property {string} name - id
 * @property {string} password - 字典名
 * @property {string} key - 显示名
 * @property {string} captcha - 备注
 */

/**
 * @typedef {Object} Captcha
 * @property {string} key
 * @property {string} img
 */

export default {
    /**
     * @returns {LoginInfo}
     */
    new(def = {}) {
        return def
    },
    /**
     * 登录
     * @param {LoginInfo} data
     * @returns {Promise<void>}
     */
    login(data) {
        return request({
            url: '/login',
            method: 'post',
            data: data
        })
    },
    /**
     * 验证码
     * @returns {Promise<Captcha>}
     */
    captcha() {
        return request({
            url: '/captcha',
            method: 'get',
        })
    },
    /**
     * 退出登录
     * @returns {Promise<void>}
     */
    logout() {
        return request({
            url: '/user-logout',
            method: 'post',
            data: {}
        })
    },
    /**
     * 获取当前是否登录
     * @returns {Promise<boolean>}
     */
    isLogin() {
        return request({
            url: '/is-login',
            method: "get"
        })
    },

    /**
     * 修改登录用户的密码
     * @param {string} old
     * @param {string} fresh
     */
    changePassword(old, fresh) {
        return request({
            url: '/change-password',
            method: "post",
            data: {old, fresh}
        })
    },

    /**
     * 重置密码
     * @param {string} username 用户名
     */
    resetPassword(username) {
        return request({
            url: '/reset-password',
            method: 'post',
            data: username
        })
    },

    /**
     * 登录用户信息
     * @returns {Promise<SysUser>}
     */
    loginInfo() {
        return request({
            url: '/login-info',
            method: "get"
        })
    },
}