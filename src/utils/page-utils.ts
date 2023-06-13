import {ElMessage, ElMessageBox} from "element-plus";
import {asyncRef, methodProvide} from "./vue-utils";
import {shallowReactive, ShallowReactive, watch} from "vue";

export class Dialog {
    open: boolean = false
    loading: boolean = false
    title: string = ""
}

class Where {
    type: string
    value: number | string | boolean
}

class Page {
    page: number
    size: number
}

export class Query {
    where: Map<string, Where>
    order: Map<string, string>
    page: Page
}

export class List<T> {
    data : T[]
    select: string | null = null
    loading: boolean = false

    selRow(): T{
        return this.data[this.select]
    }
}

export function defList<T>(listPromise : (() => Promise<T[]>)) : ShallowReactive<List<T>>{
    const ref = asyncRef(listPromise,[])
    const list = shallowReactive(new List<T>())
    list.data = ref.value
    watch(ref,n => {
        list.data = n
    })
    return list
}

export function defQuery() : ShallowReactive<Query> {
    return shallowReactive(new Query())
}

export function defDialog() : ShallowReactive<Dialog>{
    return shallowReactive(new Dialog())
}

/**
 *
 * @param {Promise<void>} promise
 */
export async function handleDel(promise) {
    await ElMessageBox.confirm('是否删除选中数据？', '删除确认',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
    await promise
    ElMessage.success("删除成功!")
}

export async function handleValidate(name) {
    const formValidate = methodProvide(name + 'Validate')
    await formValidate
}