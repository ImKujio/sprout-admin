<template>
  <div id="head-bar">
    <span id="title">
      <svg-icon icon="sprout" style="width: 28px;height: 28px"/>
      <span>{{ title }}</span>
    </span>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item v-for="item in breadcrumb">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="flex: 1"/>
    <el-button class="btn-round-svg-icon right-btn" round text bg @click="onHelp">
      <svg-icon icon="question"/>
    </el-button>
    <el-button class="btn-round-svg-icon right-btn mr16" round text bg @click="onScreenFull">
      <svg-icon :icon="screenFull ? 'screen-reset' : 'screen-full'"/>
    </el-button>
    <el-avatar class="avatar" :size="32" :src="resource(user.avatar)" @click="userDialog.open('用户中心')"/>
    <i-dialog :dialog="userDialog">
      <template #right>
        <el-button :disabled="userDialog.loading" type="danger" @click="onLogout">退出登录</el-button>
      </template>
      123
    </i-dialog>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useLoginUserStore, useNavMenuStore, useRouteStore} from "@/store.js";
import {defDialog} from "@/utils/page-utils";
import {resource} from "@/utils/files-utils.js";
import {ElMessage, ElMessageBox} from "element-plus";
import sysLogin from "@/api/sys/sys-login.js";
import router from "@/router.js";

const title = import.meta.env.VITE_APP_TITLE
const {user} = useLoginUserStore()
const screenFull = ref(false)
const userDialog = defDialog()
const route = useRouteStore()
const {menus} = useNavMenuStore()

const breadcrumb = computed(() => {
  if (route.path === '' || route.path === '/' || route.path === '/index')
    return [{name: "首页"}]
  const arr = []
  for (let menu of menus) {
    if (menu.path === route.path) {
      arr.splice(0, 0, menu)
      getPathNames(arr, menus, menu)
    }
  }
  return arr
})

function getPathNames(arr, menus, menu) {
  for (let m of menus) {
    if (m.id === menu.pid) {
      arr.splice(0, 0, m)
      if (!!m.pid) getPathNames(arr, menus, m)
    }
  }
}

function onLogout() {
  ElMessageBox.confirm('是否退出登录？', '退出确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    sysLogin.logout().then(() => {
      router.push('/login')
    }).catch(reason => {
      ElMessage.error("退出失败! 原因：" + reason)
    })
  })
}

function onHelp() {
}

function enterFullscreen() {
  const element = document.documentElement; // 获取整个文档的根元素
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // 兼容 Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // 兼容 Chrome, Safari 和 Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // 兼容 IE/Edge
    element.msRequestFullscreen();
  }
}

// 退出全屏模式
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // 兼容 Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // 兼容 Chrome, Safari 和 Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // 兼容 IE/Edge
    document.msExitFullscreen();
  }
}

function onScreenFull() {
  if (screenFull.value) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }
  screenFull.value = !screenFull.value
}


</script>

<style lang="scss" scoped>
#head-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
  background-color: var(--el-bg-color);
}

#title {
  width: 188px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--el-border-color);

  span {
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
  }
}

.mr16 {
  margin-right: 16px;
}

.right-btn {
  width: 28px;
  height: 28px;
}

.avatar {
  margin-right: 16px;
  border: 1px solid var(--el-border-color);

  &:hover {
    cursor: pointer;
  }
}

.breadcrumb {
  margin-left: 16px;
  font-size: 15px;
}

</style>