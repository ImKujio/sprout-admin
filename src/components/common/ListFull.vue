<template>
  <div class="list-full-wrapper">
    <el-table ref="tableRef" height="100%" :data="listData" v-loading="loading"
              row-key="id" default-expand-all highlight-current-row
              @current-change="onSelect">
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {list2Tree} from "@/utils/collection-utils.js";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: String, default: null},
  list: {type: Array, default: []},
  loading: {type: Boolean, default: false},
  tree: {type: Boolean, default: false}
})

const tableRef = ref()

const listData = computed(() => {
  if (props.tree){
    return list2Tree(props.list)
  }else {
    return props.list
  }
})

const selRow = computed(() => {
  if (!tableRef.value) return null
  if (!props.modelValue) return null
  if (!props.list || props.list.length === 0) return null
  return props.list[props.modelValue]
})

watch(selRow, (val) => {
  if (!val) {
    tableRef.value.setCurrentRow()
  } else {
    tableRef.value.setCurrentRow(val)
  }
})

function onSelect(row) {
  emits("update:modelValue", !row ? null : '' + props.list.indexOf(row))
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