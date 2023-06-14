import {ElMessage, ElMessageBox} from "element-plus";
import {asyncRef, methodProvide} from "./vue-utils";
import {reactive, shallowReactive, ShallowReactive, toRaw, UnwrapNestedRefs, watch} from "vue";

export class Dialog {
    open: boolean = false
    loading: boolean = false
    title: string = ""
}

export class Where {
    type: string
    value: number | string | boolean

    constructor(type: string, value: number | string | boolean) {
        this.type = type;
        this.value = value;
    }
}

export class Page {
    page: number = 1
    size: number = 20
}

export class Query {
    where: Record<string, Where> = {}
    order: Record<string, string> = {}
    page: Page = new Page()

    putWhere(field, type, value) {
        this.where[field] = new Where(type, value)
    }
}

export class List<T> {
    data: T[]
    select: T | null = null
    loading: boolean = false
}

export class TempList<T> extends List<T> {
    promise: (() => Promise<T[]>)
    edit: boolean = false


    constructor(promise: () => Promise<T[]>) {
        super();
        this.data = []
        this.promise = promise;
    }

    load() {
        this.loading = true
        this.promise().then(value => {
            this.data = value
            this.loading = false
        })
    }

    clear() {
        this.data = []
    }

    put(form: T) {
        const data = Array.of(...this.data)
        if (this.edit) {
            const index = data.indexOf(this.select)
            if (index < 0)
                data.push(form)
            else
                data.splice(index, 1, form)
        } else {
            data.push(form)
        }
        this.data = data
    }

    del() {
        if (!!this.select) {
            const index = this.data.indexOf(this.select)
            if (index < 0) return
            const data = Array.of(...this.data)
            data.splice(index, 1)
            this.data = data
        }
    }

}

export function defList<T>(listPromise: (() => Promise<T[]>)): ShallowReactive<List<T>> {
    const ref = asyncRef(listPromise, [])
    const list = shallowReactive(new List<T>())
    list.data = ref.value
    watch(ref, n => {
        list.data = n
    })
    return list
}

export function tempList<T>(listPromise: (() => Promise<T[]>)): ShallowReactive<TempList<T>> {
    return shallowReactive(new TempList(listPromise))
}

export function defQuery(): UnwrapNestedRefs<Query> {
    return reactive(new Query())
}

export function allQuery(): UnwrapNestedRefs<Query> {
    const query = new Query()
    query.page.size = -1
    return reactive(query)
}

export function defDialog(): ShallowReactive<Dialog> {
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