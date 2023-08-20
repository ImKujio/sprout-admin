import request from "../request.js";
import {Query} from "@/utils/page-utils"

/**
 * 系统用户
 * @typedef {Object} SysUser
 * @property {string} name - 用户名
 * @property {string} nickName - 昵称
 * @property {string} avatar - 头像
 * @property {string} createTime - 创建时间
 * @property {string} owner - 所属类型
 */

export default {
    /**
     * 获取新的对象
     * @param {Object} def
     * @returns {SysUser}
     */
    new(def = {}) {
        return def
    },
    /**
     * 查询系统用户列表
     * @param {Query} query
     * @returns {Promise<SysUser[]>}
     */
    list(query) {
        return request({
            url: '/sys-user/list',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询系统用户总数量
     * @returns {number}
     */
    total() {
        return request({
            url: '/sys-user/total',
            method: 'get'
        })
    },
    /**
     * 查询系统用户详情
     * @param {number} id
     * @returns {Promise<SysUser>}
     */
    get(id) {
        return request({
            url: '/sys-user/' + id,
            method: 'get'
        })
    },
    /**
     * 按字段查询所有系统用户
     * @param {string[]} fields
     * @returns {Promise<Object.<number,SysUser>>}
     */
    dict(fields) {
        return request({
            url: '/sys-user/dict',
            method: 'get',
            params: {fields}
        })
    },
    /**
     * 添加或修改系统用户
     * @param {SysUser} data
     * @returns {Promise<void>}
     */
    put(data) {
        return request({
            url: '/sys-user',
            method: 'put',
            data: data
        })
    },
    /**
     * 删除系统用户
     * @param {number} id
     * @returns {Promise<void>}
     */
    del(id) {
        return request({
            url: '/sys-user/' + id,
            method: 'delete'
        })
    },

    /**
     * 上传头像
     * @param file
     * @returns {*}
     */
    uploadAvatar(file) {
        const form = new FormData()
        form.append("file", file)
        return request({
            url: '/sys-user/upload-avatar',
            method: 'post',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}