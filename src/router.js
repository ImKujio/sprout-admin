import {createRouter, createWebHistory} from 'vue-router'
import {useLoginUserStore, useNavMenuStore, useRouteStore} from "@/store.js";
import sysMenu from "@/api/sys/sys-menu.js";
import Index from '@/pages/base/Index.vue'
import Main from "@/pages/base/Main.vue";
import Login from "@/pages/base/Login.vue"
import sysUser from "@/api/sys/sys-user.js";
import sysLogin from "@/api/sys/sys-login.js";

const routes = [
    {
        path: '',
        component: Main,
        children: [
            {path: '', redirect: "/index"},
            {name: 'index', path: '/index', component: Index}
        ]
    },
    {path: '/login', component: Login}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// const pages = import.meta.glob("./pages/**/*.vue", {eager: true, import: 'default'})
let hasLoadMenu = false

router.beforeEach(async (to, from, next) => {
    useRouteStore().updatePath(to.path)
    if (to.path === '/login' && from.path !== '/login') {
        try {
            if (await sysLogin.isLogin())
                return next('/index')
            else hasLoadMenu = false
        } catch (e) {
            hasLoadMenu = false
        }
    }
    if (!hasLoadMenu && !['/login'].includes(to.path)) {
        const data = await Promise.all([
            sysLogin.loginInfo(),
            sysMenu.userMenus(),
        ])
        for (let menu of data[1]) {
            if (menu.type !== sysMenu.TYPE.ITEM) continue
            // const page = pages[`./pages/${menu.component}.vue`]
            // if (!page) continue
            routes[0].children.push({
                path: menu.path,
                // component: page
                component: () => import(`./pages/${menu.component}.vue`)
            })
        }
        router.addRoute(routes[0])
        useLoginUserStore().setUser(data[0])
        useNavMenuStore().setMenus(data[1])
        hasLoadMenu = true
        return next({...to})
    }
    next()
})

export default router
