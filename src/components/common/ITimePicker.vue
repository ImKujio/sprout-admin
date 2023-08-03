<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <el-time-picker class="i-form-input" v-model="value" :placeholder="'请选择'+label"
                    :disabled="disabled" clearable/>
  </el-form-item>
</template>
<script setup>
import {computed} from "vue";
import {date2Hms, hms2Date} from "@/utils/time-utils.js";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: String, default: ""},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
})

const value = computed({
  get() {
    if (props.modelValue == null) return null
    return hms2Date(props.modelValue)
  },
  set(val) {
    if (val == null) emits('update:modelValue', val)
    else emits('update:modelValue', date2Hms(val))
  }
})
</script>

<style scoped>

</style>