import request from "@/api/request.js";
import {SyncLock} from "@/utils/async-utils";
import {Query} from "@/utils/page-utils"

/**
 * @typedef {Object} SysDict
 * @property {number} id - id
 * @property {string} name - 字典名
 * @property {string} label - 显示名
 * @property {string} remark - 备注
 * @property {number} owner - 所属类型
 */

const getByNameLock = new SyncLock()

export default {
    /**
     * 所属类型
     */
    OWNER: {
        SYS: 1,
        USER: 2
    },
    /**
     * 获取新的对象
     * @param {Object} def
     * @returns {SysDict}
     */
    new(def = null) {
        if (!def) return {}
        else return def
    },
    /**
     * 查询系统字典列表
     * @param {Query} query
     * @returns {Promise<SysDict[]>}
     */
    list(query) {
        return request({
            url: '/sys/dict/list',
            method: 'get',
            params: query
        })
    },
    /**
     * 查询系统字典总数量
     * @returns {Promise<number>}
     */
    total() {
        return request({
            url: '/sys/dict/total',
            method: 'get'
        })
    },
    /**
     * 查询系统字典详情
     * @param {number} id
     * @returns {Promise<SysDict>}
     */
    get(id) {
        return request({
            url: '/sys/dict/' + id,
            method: 'get'
        })
    },
    /**
     * 按字段查询所有系统字典
     * @param {string[]} fields
     * @returns {Promise<Object.<number,SysDict>>}
     */
    all(fields) {
        return request({
            url: '/sys/dict/all',
            method: 'get',
            params: {fields}
        })
    },
    /**
     * 添加或修改系统字典
     * @param {SysDict} data
     */
    put(data) {
        return request({
            url: '/sys/dict',
            method: 'put',
            data: data
        })
    },
    /**
     * 删除系统字典
     * @param {number} id
     */
    del(id) {
        return request({
            url: '/sys/dict/' + id,
            method: 'delete'
        })
    },
    /**
     * 获取所有字典数据
     * @return {Promise<Object.<String,Object.<number,SysDictItem>>>}
     */
    allDict() {
        return request({
            url: '/sys/dict/all-dict',
            method: 'get'
        })
    },
    allDictData: null,
    /**
     * 通过字典名获取所有字典项
     * @param {String} name
     * @return {Promise<Object.<number,SysDict>>}
     */
    getByName(name) {
        return new Promise((resolve, reject) => {
            getByNameLock.lock().then(() => {
                if (this.allDictData == null) {
                    this.allDict().then(value => {
                        this.allDictData = value
                        const dict = this.allDictData[name]
                        resolve(!!dict ? dict : {})
                    }).catch(() => {
                        resolve({})
                    })
                } else {
                    const dict = this.allDictData[name]
                    resolve(!!dict ? dict : {})
                }
                getByNameLock.unlock()
            })
        })
    }
}