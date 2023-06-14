<template>
  <el-col :span="span">
    <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
      <el-date-picker class="i-form-input" v-model="value" :placeholder="'请选择'+label"
                      value-format="YYYY-MM-DD" :disabled="disabled" clearable/>
      <div v-if="tip" class="i-form-tip">{{ tip }}</div>
    </el-form-item>
  </el-col>
</template>
<script setup>
import {computed} from "vue";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: String, default: ""},
  span: {type: Number, default: 5},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  tip: {type: String, default: null},
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<style scoped>

</style>