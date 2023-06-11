<template>
  <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[20, 50, 100, 200]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="justify-content: right;padding: 12px 16px"
  />
</template>

<script setup>
import {computed} from "vue";

const emits = defineEmits(["load", "update:modelValue"])
const props = defineProps({
  modelValue: {type: Object, default: () => {}},
  total: {type: Number, default: 0}
})

const size = computed({
  get() {
    return !props.modelValue || !props.modelValue.size ? 20 : props.modelValue.size
  },
  set(val) {
    emits('update:modelValue', {size:val, page:page.value})
    emits("load")
  }
})

const page = computed({
  get() {
    return !props.modelValue || !props.modelValue.page ? 1 : props.modelValue.page
  },
  set(val){
    emits('update:modelValue', {size:size.value, page:val})
    emits("load")
  }
})
</script>

<style>
.list-pager{
  padding: 12px 16px;
  border-top: 4px solid var(--theme-background);
}
</style>