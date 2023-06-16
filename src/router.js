import {createRouter, createWebHistory} from 'vue-router'
import {useNavMenuStore, useRouteStore} from "@/store.js";
import sysMenu from "@/api/sys/sys-menu.js";
import Index from '@/pages/base/Index.vue'
import Main from "@/pages/base/Main.vue";

const routes = [
    {path: '', redirect: '/index'},
    {
        path: '/index',
        component: Main,
        children: [
            {name: 'index', path: '', component: Index}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// const pages = import.meta.glob("./pages/**/*.vue", {eager: true, import: 'default'})
let hasLoadMenu = false

router.beforeEach(async (to, from, next) => {
    useRouteStore().updatePath(to.path)
    if (!hasLoadMenu) {
        const menus = await sysMenu.userMenus()
        for (let menu of menus) {
            if (menu.type !== sysMenu.TYPE.ITEM) continue
            // const page = pages[`./pages/${menu.component}.vue`]
            // if (!page) continue
            routes[1].children.push({
                path: menu.path,
                // component: page
                component: () => import(`./pages/${menu.component}.vue`)
            })
        }
        router.addRoute(routes[1])
        useNavMenuStore().setMenus(menus)
        hasLoadMenu = true
        return next({...to})
    }
    next()
})

export default router
