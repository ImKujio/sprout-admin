<template>
  <div class="operate-bar">
    <slot></slot>
    <div style="flex: 1"/>
    <el-button plain>
      <svg-icon icon="filter" class="el-icon"/>
      <span>筛选</span>
    </el-button>
    <el-button plain @click="onRefresh">
      <svg-icon icon="refresh" class="el-icon"/>
      <span>刷新</span>
    </el-button>
  </div>
</template>

<script setup>
const emits = defineEmits(["refresh"])

function onRefresh() {
  emits("refresh")
}

</script>

<style>
.operate-bar{
  display: flex;
  flex-direction: row;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.list-operate-bar{
  padding: 12px 16px;
  border-bottom: 4px solid var(--theme-background);
}
</style>