<template>
  <div class="list-full-wrapper">
    <el-table ref="tableRef" height="100%" :data="list" v-loading="loading"
              highlight-current-row @current-change="onSelect">
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: Number, default: null},
  list: {type: Array, default: []},
  loading: {type: Boolean, default: false},
})

const tableRef = ref()

const selRow = computed(() => {
  if (!tableRef.value) return null
  if (props.modelValue == null || props.modelValue === 0) return null
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
  emits("update:modelValue", !row ? null : props.list.indexOf(row))
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