<template>
  <div class="list-full-wrapper">
    <el-table ref="tableRef" height="100%" :data="listData" v-loading="list.loading"
              row-key="id" default-expand-all highlight-current-row
              @current-change="onSelect">
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup>
import {computed, ref, toRaw, watch} from "vue";
import {list2Tree} from "@/utils/collection-utils.js";
import {List} from "@/utils/page-utils";

const props = defineProps({
  list: {type: List, required: true},
  tree: {type: Boolean, default: false}
})

const tableRef = ref()

const listData = computed(() => {
  if (props.tree) {
    return list2Tree(props.list.data)
  } else {
    return props.list.data
  }
})

const selRow = computed(() => {
  if (!tableRef.value) return null
  if (!props.list.select) return null
  if (!props.list.data || props.list.data.length === 0) return null
  return props.list.selRow()
})

watch(() => selRow.value, (val) => {
  if (!val) {
    tableRef.value.setCurrentRow()
  } else {
    tableRef.value.setCurrentRow(val)
  }
})

function onSelect(row) {
  props.list.select = !row ? null : '' + props.list.data.indexOf(toRaw(row))
}
</script>

<style>
.list-full-wrapper {
  flex: 1;
  position: relative;
  margin-left: 12px;
  margin-right: 12px;
}

.list-full-wrapper .el-table {
  position: absolute;
  width: 100%;
}

</style>