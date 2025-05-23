import {ElMessage, ElMessageBox} from "element-plus";
import {asyncRef} from "./vue-utils";
import {reactive, ref, shallowReactive, ShallowReactive, toRaw, UnwrapNestedRefs, watch} from "vue";

export class Dialog {
    isOpen: boolean = false
    loading: boolean = false
    title: string = ""

    open(title: string = "") {
        this.title = title
        this.isOpen = true
    }

    close() {
        this.isOpen = false
        this.loading = false
    }

    load(asyncFun: () => Promise<void>) {
        this.loading = true
        asyncFun().then(() => {
            this.close()
        }).catch().finally(() => {
            this.loading = false
        })
    }
}

export const ValueSeparator = "┆"

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
    visible: Boolean = false

    putWhere(field, type, value) {
        this.where[field] = value == null || value === '' ? null : new Where(type, value)
    }

    putOrder(field: string, des: boolean = false) {
        this.order[field] = des ? 'DESC' : 'ASC'
    }

    whereVal(field): null | string | number | boolean {
        const w = this.where[field]
        return !!w ? w.value : null
    }

    resetWhere() {
        this.where = {}
    }

    resetOrder() {
        this.order = {}
    }

    resetPage() {
        this.page.page = 1
    }

    toggle() {
        this.visible = !this.visible
    }
}

export class List<T> {
    data: T[]
    select: T | null = null
    loading: boolean = false

    del(promise: ((number) => Promise<void>), after: (() => void)) {
        ElMessageBox.confirm('是否删除选中数据？', '删除确认', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            promise(this.select['id']).then(() => {
                ElMessage.success("删除成功!")
                after()
            }).catch(reason => {
                ElMessage.error("删除失败! 原因：" + reason)
            })
        })
    }
}

export class TempList<T> extends List<T> {
    promise: (() => Promise<T[]>)

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

    put(form: T, isEdit: boolean) {
        form = toRaw(form)
        console.log(form)
        const data = Array.of(...this.data)
        console.log(data)
        if (!isEdit) {
            data.push(form)
            this.data = data
            return;
        }
        const index = data.indexOf(toRaw(this.select))
        if (index >= 0) {
            data.splice(index, 1, form)
            this.data = data
        }
    }

    del() {
        if (!!this.select) {
            const data = Array.of(...this.data)
            const index = data.indexOf(toRaw(this.select))
            if (index < 0) return
            data.splice(index, 1)
            this.data = data
        }
    }
}

export class Form<T> {
    data: T
    private readonly _raw: T
    private _editMode: boolean = false
    private _valid: (() => Promise<boolean>) | null

    constructor(raw: T) {
        this._raw = raw;
        this.data = Object.assign({}, raw)
    }

    add(defSetter: ((def: T) => void) = null) {
        const def = Object.assign({}, this._raw)
        if (!!defSetter) defSetter(def)
        this.data = def
        this._editMode = false
    }

    edit(form: T) {
        form = toRaw(form)
        this.data = Object.assign({}, form)
        this._editMode = true
    }

    isEdit(): boolean {
        return this._editMode
    }

    setValid(valid: (() => Promise<boolean>)) {
        this._valid = valid
    }

    async valid(): Promise<void> {
        if (!this._valid) throw new Error("IForm组件未初始化校验方法")
        try {
            const valid = await this._valid()
            if (!valid) {
                ElMessage.error('校验失败，请检查填写的数据！')
                throw new Error("校验失败，请检查填写的数据！")
            }
        } catch (e) {
            ElMessage.error('校验失败，请检查填写的数据！')
            throw new Error("校验失败，请检查填写的数据！")
        }
    }
}

export function defForm<T>(raw: T) {
    return reactive(new Form(raw))
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

export function emptyList<T>(def: T) {
    return ref<T[]>([])
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
