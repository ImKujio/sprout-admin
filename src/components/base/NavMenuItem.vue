<template>
  <el-sub-menu v-if="!!item.children">
    <template #title>
      <el-icon>
        <location/>
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <nav-menu-item v-for="child in item.children" :key="child.path" :item="child"/>
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">{{ item.name }}</el-menu-item>
</template>

<script setup>
import {Location} from '@element-plus/icons-vue'

const props = defineProps({
  item:{type:Object,required:true}
})

</script>

<style scoped>

</style>