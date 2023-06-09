import {defineStore} from 'pinia'
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils.ts";
import sysDictItem from "@/api/sys/sys-dict-item.js";
import {ref} from "vue";


export const useSysDictItemStore = defineStore('sysDictItem', () => {
    const sysDicts = asyncRef(() => sysDictItem.all(['label', 'style']), {})
    loadAsyncRef()
    return {sysDicts}
})

export const useRouterStateStore = defineStore('routerState', () => {
    const pathData = ref("")
    function updatePath(path) {
        pathData.value = path
    }

    const hasLoadMenu = ref(false)
    function menuLoaded() {
        hasLoadMenu.value = true
    }

    return {path: pathData, updatePath,hasLoadMenu,menuLoaded}
})