<template>
  <section class="page-container">
    <query-bar v-model="query.where" @load="reload">

    </query-bar>
    <operate-bar>
      <el-button type="primary" plain>
        <svg-icon icon="add" class="el-icon"/>
        <span>添加</span>
      </el-button>
      <el-button type="success" plain>
        <svg-icon icon="edit" class="el-icon"/>
        <span>编辑</span>
      </el-button>
      <el-button type="danger" plain>
        <svg-icon icon="del" class="el-icon"/>
        <span>删除</span>
      </el-button>
    </operate-bar>
    <list-full v-model="select" :list="list" :loading="loading">
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="name" label="菜单名"/>
      <el-table-column prop="path" label="路径"/>
      <el-table-column prop="component" label="组件"/>
      <el-table-column prop="sort" label="排序"/>
    </list-full>
    <pager v-model="query.page" :total="total"/>
  </section>
</template>

<script setup>
import {reactive, ref} from "vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import sysMenu from "@/api/sys/sys-menu.js";
import SvgIcon from "@/components/base/SvgIcon.vue";

const query = reactive({
  where: {},
  order: {},
  page: {}
})
const select = ref(null)
const loading = ref(false)
const total = asyncRef(() => sysMenu.total(), 0)
const list = asyncRef(() => sysMenu.list({}), [])

const reload = loadAsyncRef(() => {
  loading.value = true
}, () => {
  loading.value = false
})
</script>

<style scoped>

</style>