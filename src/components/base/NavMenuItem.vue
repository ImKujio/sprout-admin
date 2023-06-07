<template>
  <el-sub-menu v-if="!!item.children" :index="`${item.id}`">
    <template #title>
      <svg-icon v-if="!!item.icon" :icon="item.icon" class="menu-icon"/>
      <span>{{ item.name }}</span>
    </template>
    <nav-menu-item v-for="child in item.children" :key="child.path" :item="child"/>
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">
    <svg-icon v-if="!!item.icon" :icon="item.icon" class="menu-icon"/>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>

<script setup>
import {Location} from '@element-plus/icons-vue'

const props = defineProps({
  item: {type: Object, required: true}
})

</script>

<style scoped>

</style>