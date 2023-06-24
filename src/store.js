import {defineStore} from 'pinia'
import {ref} from "vue";
import sysUser from "@/api/sys/sys-user.js";


export const useNavMenuStore = defineStore('navMenu', () => {
    const menus = []

    function setMenus(val) {
        menus.length = 0
        menus.push(...val)
    }

    const current = ref(null)

    function setCur(val) {
        current.value = val
    }

    return {menus, current, setMenus, setCur}
})

export const useRouteStore = defineStore('routeState', () => {
    const path = ref("")

    function updatePath(val) {
        path.value = val
    }

    return {path, updatePath}
})

export const useLoginUserStore = defineStore('loginUser', () => {
    const user = ref(sysUser.new())

    function setUser(val) {
        user.value = val
    }

    return {user, setUser}
})