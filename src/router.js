import Index from '@/pages/Index.vue'
import {createRouter, createWebHistory} from 'vue-router'
import sysMenu from "@/api/sys/sys-menu.js";
import {useRouterStateStore} from "@/store.js";

const staticRoutes = [
    {path: '', redirect: '/index'},
    {path: '/index', component: Index}
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes: staticRoutes, // `routes: routes` 的缩写
})


router.beforeEach(async (to, from, next) => {
    const {updatePath,hasLoadMenu,menuLoaded} = useRouterStateStore()
    updatePath(to.path)
    if (!hasLoadMenu) {
        const menus = await sysMenu.all(['type','path','component'])
        for (let id in menus) {
            const menu = menus[id]
            if (menu.type !== sysMenu.TYPE.ITEM) continue
            router.addRoute({
                path: menu.path,
                component: () => import(`./pages/${menu.component}.vue`)
            })
        }
        menuLoaded()
        return next({...to})
    }
    next()
})

export default router
