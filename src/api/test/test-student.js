import request from "@/api/request.js";

/**
 * 系统菜单接口
 * @typedef {Object} TestStudent
 * @property {number} id - 编号
 * @property {string} name - 姓名
 * @property {string} avatar - 头像
 * @property {number} sex - 性别
 * @property {number} age - 年龄
 * @property {boolean} stay - 是否在校
 * @property {number} score - 成绩
 * @property {string} birthday - 生日
 * @property {string} schoolDismissalTime - 放学时间
 * @property {string} registrationTime - 注册时间
 */

export default {
    /**
     * 获取新的对象
     * @param {Object} def
     * @returns {TestStudent}
     */
    new(def = {}) {
        return def
    },
    /**
     * 查询系统菜单列表
     * @param {Query} query
     * @returns {Promise<TestStudent[]>}
     */
    list(query) {
        return request({
            url: '/test-student/list',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询系统菜单数量
     * @param {Query} query
     * @returns {Promise<number>}
     */
    count(query) {
        return request({
            url: '/test-student/count',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询系统菜单详情
     * @param {number} id
     * @returns {Promise<TestStudent>}
     */
    get(id) {
        return request({
            url: '/test-student' + id,
            method: 'get'
        })
    },
    /**
     * 按字段查询所有系统菜单
     * @returns {Promise<Object.<number,TestStudent>>}
     */
    dict(fields) {
        return request({
            url: '/test-student/dict',
            method: 'get',
            params: {fields}
        })
    },
    /**
     * 添加或修改系统菜单
     * @param {TestStudent} data
     */
    put(data) {
        return request({
            url: '/test-student',
            method: 'put',
            data: data
        })
    },
    /**
     * 删除系统菜单
     * @param {number} id
     */
    del(id) {
        return request({
            url: '/test-student/' + id,
            method: 'delete'
        })
    },
    uploadAvatar(file) {
        const form = new FormData()
        form.append("file", file)
        return request({
            url: '/test-student/upload-avatar',
            method: 'post',
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}