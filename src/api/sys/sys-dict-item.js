import request from "@/api/request.js";
import {Query} from "@/utils/page-utils"

/**
 * @description 系统字典项
 * @typedef {Object} SysDictItem
 * @property {number} id - id
 * @property {string} name - 名称
 * @property {string} label - 显示名
 * @property {string} style - 样式
 * @property {string} remark - 备注
 */

export default {
    /**
     * 获取新的对象
     * @param {Object} def
     * @returns {SysDictItem}
     */
    new(def = {}) {
        return def
    },
    /**
     * 查询系统字典项列表
     * @param {Query} query
     * @returns {Promise<SysDictItem[]>}
     */
    list(query) {
        return request({
            url: '/sys-dict-item/list',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询数量
     * @param {Query} query
     * @returns {Promise<number>}
     */
    count(query) {
        return request({
            url: '/sys-dict-item/count',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询系统字典项详情
     * @param {number} id
     * @returns {Promise<SysDictItem>}
     */
    get(id) {
        return request({
            url: '/sys-dict-item/' + id,
            method: 'get'
        })
    },
    /**
     * 按字段查询所有系统字典项
     * @param {string[]} fields
     * @returns {Promise<Object.<number,SysDictItem>>}
     */
    dict(fields) {
        return request({
            url: '/sys-dict-item/dict',
            method: 'get',
            params: {fields}
        })
    },
    /**
     * 添加或修改系统字典项
     * @param {SysDictItem} data
     */
    put(data) {
        return request({
            url: '/sys-dict-item',
            method: 'put',
            data: data
        })
    },
    /**
     * 删除系统字典项
     * @param {number} id
     */
    del(id) {
        return request({
            url: '/sys-dict-item/' + id,
            method: 'delete'
        })
    }
}