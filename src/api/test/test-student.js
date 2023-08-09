import request from "@/api/request.js";

/**
 * 系统菜单接口
 * @typedef {Object} TestStudent
 * @property {number} id - 编号
 * @property {string} name - 姓名
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
            url: '/test/student/list',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询系统菜单总数量
     * @returns {Promise<number>}
     */
    total() {
        return request({
            url: '/test/student/total',
            method: 'get'
        })
    },
    /**
     * 查询系统菜单详情
     * @param {number} id
     * @returns {Promise<TestStudent>}
     */
    get(id) {
        return request({
            url: '/test/student' + id,
            method: 'get'
        })
    },
    /**
     * 按字段查询所有系统菜单
     * @returns {Promise<Object.<number,TestStudent>>}
     */
    all(fields) {
        return request({
            url: '/test/student/all',
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
            url: '/test/student',
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
            url: '/test/student/' + id,
            method: 'delete'
        })
    }
}