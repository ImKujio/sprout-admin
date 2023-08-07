<template>
  <div class="query-bar">
    <slot></slot>
    <div style="flex: 1"/>
    <el-button v-if="reset" plain>
      <svg-icon icon="refresh" class="el-icon"/>
      <span>重置</span>
    </el-button>
    <el-button v-if="query" plain @click="onQuery">
      <svg-icon icon="refresh" class="el-icon"/>
      <span>搜索</span>
    </el-button>
  </div>
</template>

<script setup>
const emits = defineEmits(["query"])

const props = defineProps({
  query: {type: Boolean, default: true},
  reset: {type: Boolean, default: true}
})

function onQuery() {
  emits("query")
}

</script>

<style lang="scss">
.query-bar {
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