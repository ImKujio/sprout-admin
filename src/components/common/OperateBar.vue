<template>
  <div class="operate-bar">
    <slot></slot>
    <div style="flex: 1"/>
    <el-button v-if="props.filter" plain>
      <svg-icon icon="filter" class="el-icon"/>
      <span>筛选</span>
    </el-button>
    <el-button v-if="props.refresh" plain @click="onRefresh">
      <svg-icon icon="refresh" class="el-icon"/>
    </el-button>
  </div>
</template>

<script setup>
const emits = defineEmits(["refresh"])

const props = defineProps({
  filter: {type: Boolean, default: true},
  refresh: {type: Boolean, default: true}
})

function onRefresh() {
  emits("refresh")
}

</script>

<style lang="scss">
.operate-bar {
  display: flex;
  flex-direction: row;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-top: 10px;
  margin-bottom: 10px;

  .el-button {
    padding: 8px 10px;
  }
}
</style>