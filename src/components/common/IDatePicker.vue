<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <el-date-picker class="i-form-input" v-model="value" :placeholder="'请选择'+label"
                    :type="datetime?'datetime':'date'"
                    :value-format="datetime?'YYYY-MM-DD HH:mm:ss':'YYYY-MM-DD'" :disabled="disabled" clearable/>
  </el-form-item>
</template>
<script setup>
import {computed} from "vue";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: String, default: ""},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  datetime: {type: Boolean, default: false}
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