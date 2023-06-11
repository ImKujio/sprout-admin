<template>
  <operate-bar class="list-operate-bar" @refresh="reload" :filter="false">
    <el-button type="primary" plain @click="emits('onAdd')">
      <svg-icon icon="add" class="el-icon"/>
      <span>添加</span>
    </el-button>
    <el-button type="success" plain :disabled="!select" @click="emits('onEdit',list[select],select)">
      <svg-icon icon="edit" class="el-icon"/>
      <span>编辑</span>
    </el-button>
    <el-button type="danger" plain :disabled="!select" @click="onDel">
      <svg-icon icon="del" class="el-icon"/>
      <span>删除</span>
    </el-button>
  </operate-bar>
  <list-full v-model="select" :list="list" tree :loading="loading">
    <el-table-column prop="name" label="菜单"/>
    <el-table-column prop="path" label="路径"/>
    <el-table-column prop="component" label="组件"/>
    <el-table-column prop="sort" label="排序"/>
  </list-full>
</template>

<script setup>
import {ref} from "vue";
import {asyncRef, loadAsyncRef, methodInject} from "@/utils/vue-utils";
import {defQuery} from "@/utils/query-utils";
import sysMenu from "@/api/sys/sys-menu.js";

import {ElMessage, ElMessageBox} from "element-plus";
import sysDict from "@/api/sys/sys-dict.js";

const emits = defineEmits(["onAdd","onEdit"])

const types = asyncRef(sysDict.getByName("admin_menu_type"), {})

const query = defQuery()
const select = ref(null)
const loading = ref(false)
const list = asyncRef(() => sysMenu.list({}), [])

const reload = loadAsyncRef(() => {
  loading.value = true
}, () => {
  loading.value = false
})

async function onDel() {
  await ElMessageBox.confirm('是否删除选中数据？','删除确认',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
  await sysMenu.del(list.value[select.value].id)
  ElMessage.success("删除成功!")
  reload()
}

methodInject("sysMenuReload",async () => reload())
</script>

<style scoped>
</style>