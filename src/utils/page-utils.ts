import {ElMessage, ElMessageBox} from "element-plus";
import {asyncRef, methodProvide} from "./vue-utils";
import {reactive, shallowReactive, ShallowReactive, UnwrapNestedRefs, watch} from "vue";

export class Dialog {
    open: boolean = false
    loading: boolean = false
    title: string = ""
}

export class Where {
    type: string
    value: number | string | boolean
}

export class Page {
    page: number = 1
    size: number = 20
}

export class Query {
    where: Record<string, Where> = {}
    order: Record<string, string> = {}
    page: Page = new Page()
}

export class List<T> {
    data : T[]
    select: T | null = null
    loading: boolean = false
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

export function defQuery() : UnwrapNestedRefs<Query> {
    return reactive(new Query())
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