<template>
  <fill-container width="200px">
    <el-scrollbar class="nav-menu-scroll">
      <el-menu
        class="nav-menu"
        default-active="/index"
        router
      >
        <!--        <el-menu-item index="/index">-->
        <!--          首页-->
        <!--        </el-menu-item>-->
        <nav-menu-item v-for="item in menusTree" :item="item"/>
      </el-menu>
    </el-scrollbar>
  </fill-container>
</template>

<script setup>
import FillContainer from "@/components/base/FillContainer.vue";
import {map2Tree} from "@/utils/collection-utils";
import sysMenu from "@/api/sys/sys-menu.js";
import NavMenuItem from "@/components/base/NavMenuItem.vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {computed, watch} from "vue";
import {useRouter} from "vue-router";

const index = {
  id: 1,
  pid: 0,
  type: 4,
  name: '首页',
  path: '/index',
  page: 'Index',
  sort: 0,
}

const router = useRouter()

const sysMenus = asyncRef(sysMenu.all(['pid', 'type', 'name', 'path', 'page', 'sort']), {"1": index})

const menusTree = computed(() => {
  const tree = map2Tree(sysMenus.value)
  tree.splice(0, 0, index)
  console.log(tree);
  return tree
});

watch(menusTree, (n) => {

})

loadAsyncRef(() => {
}, () => {
  console.log(sysMenus.value);
  Object.values(sysMenus.value).forEach(i => {
    router.addRoute({
      path: i.path,
      component: () => import(`../../pages/${i.page}.vue`)
    })
  })
})
</script>

<style lang="scss">
.nav-menu {
  --el-menu-item-height: 52px;
  --el-menu-sub-item-height: 52px;

  //--el-menu-hover-bg-color: var(--el-fill-color-light);
  --el-menu-base-level-padding: 16px;
  --el-menu-level-padding: 29px;

  border: none !important;
  padding-top: 3px;
  padding-bottom: 3px;

  .el-sub-menu__title {
    z-index: 0;
    background-color: unset !important;
  }

  .el-sub-menu__title::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 6px;
    right: 6px;
    bottom: 3px;
    z-index: -1;
    border-radius: 6px;
    transition: background-color var(--el-transition-duration);
  }

  .el-menu-item::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 6px;
    right: 6px;
    bottom: 3px;
    z-index: -1;
    border-radius: 6px;
    transition: background-color var(--el-transition-duration);
  }

  .el-sub-menu__title:hover::before {
    background-color: var(--el-fill-color-light);
  }

  .el-menu-item {
    z-index: 0;
    background-color: unset !important;
  }

  .el-menu-item:hover::before {
    background-color: var(--el-fill-color-light);
  }

  .el-menu-item.is-active::before {
    background-color: var(--el-menu-hover-bg-color);
  }

}


.nav-menu-scroll {
  position: relative;
  border-right: solid 1px var(--el-menu-border-color);
}

</style>