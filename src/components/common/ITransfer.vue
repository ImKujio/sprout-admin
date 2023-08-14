<template>
  <el-transfer
      class="i-transfer"
      v-model="value"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="输入关键字检索"
      :data="data"
      :titles="titles"
  />
</template>

<script setup>
import {computed} from "vue";

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: {type: Array, default: () => []},
  titles: {type: Array, default: () => ['所有数据', '已选择数据']},
  source: {type: Array, default: () => []},
  srcCvt: {type: Function, required: true},
  tarCvt: {type: Function, required: true},
  valCvt: {type: Function, required: true}
})

const data = computed(() => {
  if (props.source == null || props.source.length === 0) return []
  return props.source.map(value => props.srcCvt(value))
})

const filterMethod = (query, item) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

const value = computed({
  get() {
    if (props.modelValue == null || props.modelValue.length === 0) return []
    return props.modelValue.map(value => props.tarCvt(value))
  },
  set(val) {
    if (val == null || val.length === 0) {
      emits("update:modelValue", [])
      return []
    }
    emits("update:modelValue", val.map(m => props.valCvt(m)))
    return val
  }
})

</script>

<style lang="scss">
.i-transfer {
  --el-transfer-panel-width: 480px !important;
  --el-transfer-panel-body-height: 480px !important;
}
</style>