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
import {computed, ref, watch} from "vue";
import {list2Tree, sortTree} from "@/utils/collection-utils.js";
import {List} from "@/utils/page-utils";

const props = defineProps({
  list: {type: List, required: true},
  tree: {type: Boolean, default: false},
  sort: {type: String, default: null}
})

const tableRef = ref()

const listData = computed(() => {
  if (props.tree) {
    const tree = list2Tree(props.list.data)
    if (!!props.sort) sortTree(tree,props.sort)
    return tree
  } else {
    return props.list.data
  }
})

const selRow = computed(() => {
  if (!tableRef.value) return null
  if (!props.list.data || props.list.data.length === 0) return null
  return props.list.select
})

watch(() => selRow.value, (val) => {
  if (!val) {
    tableRef.value.setCurrentRow()
  } else {
    tableRef.value.setCurrentRow(val)
  }
})

function onSelect(row) {
  props.list.select = row
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