<template>
  <fill-container width="220px">
    <el-scrollbar class="nav-menu-scroll">
      <el-menu
          class="nav-menu"
          :default-active="active"
          unique-opened
          router
      >
        <el-menu-item index="/index">
          <svg-icon icon="home" class="menu-icon"/>
          <span>首页</span>
        </el-menu-item>
        <nav-menu-item v-for="item in menuTree" :key="item.id" :item="item"/>
      </el-menu>
    </el-scrollbar>
  </fill-container>
</template>

<script setup>
import FillContainer from "@/components/base/FillContainer.vue";
import {list2Tree, sortTree} from "@/utils/collection-utils";
import NavMenuItem from "@/components/base/NavMenuItem.vue";
import {computed} from "vue";
import {useNavMenuStore, useRouteStore} from "@/store.js";

const {menus} = useNavMenuStore()
const menuTree = list2Tree(menus)
sortTree(menuTree,"sort")

const route = useRouteStore()

const active = computed(() => {
  if (!route.path || route.path === "" || route.path === "/") return "/index"
  return route.path
})
</script>

<style lang="scss">
.nav-menu {
  --el-menu-item-height: 48px;
  --el-menu-sub-item-height: 48px;
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

  .menu-icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    margin-left: 3px;
  }

}

.nav-menu-scroll {
  position: relative;
  border-right: solid 1px var(--el-menu-border-color);
  background-color: var(--el-bg-color);
}

</style>