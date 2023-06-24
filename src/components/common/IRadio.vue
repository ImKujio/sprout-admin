<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <el-radio-group class="i-form-input" v-model="value" :disabled="disabled">
      <el-radio
          v-for="(item,index) in options"
          :key="index"
          :label="Number.parseInt(item[valueKey])"
      >
        {{ item[labelKey] }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
<script setup>
import {computed} from "vue";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: Number, default: 0},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  options: {type: Object, required: true},
  valueKey: {type: String, default: "id"},
  labelKey: {type: String, default: "label"}
})

const value = computed({
  get() {
    if (!props.modelValue) {
      const keys = Object.keys(props.options)
      if (!!keys.length) {
        emits('update:modelValue', Number.parseInt(keys[0]))
      }
      return 0
    } else {
      return props.modelValue
    }
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<style scoped>

</style>