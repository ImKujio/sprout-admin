import axios from 'axios'
import Cookies from 'js-cookie'
import {ElMessage} from "element-plus";
import router from "@/router.js";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const TokenKey = 'Sprout-Token'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10 * 1000
})

service.constant = {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10 * 1000,
    headers() {
        return {
            'Authorization': Cookies.get(TokenKey)
        }
    }
}

export function putToken(token) {
    Cookies.set(TokenKey, token)
}

service.interceptors.request.use(config => {
    config.headers['Authorization'] = Cookies.get(TokenKey)
    if ((config.method === 'get' || config.method === 'del') && config.params) {
        config.url = config.url + '?' + encodeParams(config.params);
        config.params = {};
    }
    return config
})

service.interceptors.response.use(response => {
    if (response.status === 200) {
        return handleResponse(response.data)
    } else {
        ElMessage({message: response.statusText, type: 'error', grouping: true})
        return Promise.reject(response.statusText)
    }
})

const responseLock = new SyncLock()

const lastResponse = {
    msg: null,
    login: false,
}

export async function handleResponse(data) {
    if (data.code === 200) {
        lastResponse.msg = null
        lastResponse.login = false
        return data.data
    }
    await responseLock.lock()
    let msg = data.msg
    if (data.code === 401) {
        console.log(router.currentRoute)
        if (!!Cookies.get(TokenKey)) {
            Cookies.remove(TokenKey)
            msg = '登录已过期，请重新登录'
        }
        if (!lastResponse.login) {
            router.push("/login").finally()
            lastResponse.login = true
        }
    }
    if (data.code === 403) {
        msg = '您没有权限访问该数据'
    }
    if (lastResponse.msg !== data.msg) {
        ElMessage({message: msg, type: 'error'})
        lastResponse.msg = data.msg
    }
    await responseLock.unlock()
    throw new Error(msg)
}

export function encodeParams(obj, prefix = null) {
    const str = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const finalKey = prefix ? `${prefix}[${key}]` : key;
            if (value !== null && Array.isArray(value)) {
                const encodedKey = encodeURIComponent(finalKey);
                const encodedValues = value.map((val) => encodeURIComponent(val)).join(",");
                str.push(`${encodedKey}=${encodedValues}`);
            } else if (value !== null && typeof value === "object") {
                str.push(encodeParams(value, finalKey));
            } else if (value !== undefined) {
                str.push(`${encodeURIComponent(finalKey)}=${encodeURIComponent(value)}`);
            }
        }
    }
    return str.join("&");
}

export default service