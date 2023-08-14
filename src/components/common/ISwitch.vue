<template>
  <el-col :span="span">
    <el-form-item class="i-form-item" :label="label" :prop="prop">
      <el-switch class="i-form-input" v-model="value" :disabled="disabled"/>
    </el-form-item>
  </el-col>
</template>
<script setup>
import {computed, onMounted} from "vue";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: Boolean, default: false},
  label: {type: String, default: null},
  prop: {type: String, default: null},

  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},

  default: {type: Boolean, default: false}
})

const value = computed({
  get() {
    return props.modelValue || props.default
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

onMounted(() => {
  if (props.modelValue || props.default)
    emits('update:modelValue', true)
  else
    emits('update:modelValue', false)
})
</script>

<style scoped>

</style>