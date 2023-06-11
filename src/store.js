import {defineStore} from 'pinia'
import {ref} from "vue";


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