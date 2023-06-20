import {defineStore} from 'pinia'
import {ref} from "vue";


export const useNavMenuStore = defineStore('navMenu',() => {
    const menus = []
    function setMenus(val){
        menus.length = 0
        menus.push(...val)
    }
    const current = ref(null)
    function setCur(val){
        current.value = val
    }
    return {menus,current,setMenus,setCur}
})

export const useRouteStore = defineStore('routeState', () => {
    const path = ref("")
    function updatePath(val) {
        path.value = val
    }
    return {path,updatePath}
})

export const useLoginUserStore = defineStore('loginUser',() => {
})