<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <el-select class="i-form-input" v-model="value" :placeholder="'请选择'+label" :disabled="disabled" clearable>
      <el-option
          v-for="item in sortedOptions"
          :key="item[valueKey]"
          :label="item[labelKey]"
          :value="item[valueKey]"
      />
    </el-select>
  </el-form-item>
</template>

<script setup>
import {computed, toRaw} from "vue";
import {sortArray} from "@/utils/collection-utils.js";

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: {type: Number, default: null},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  options: {type: [Object, Array], default: () => []},
  valueKey: {type: String, default: "id"},
  labelKey: {type: String, default: "label"},
  sort: {type: String, default: null}
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const sortedOptions = computed(() => {
  if (props.options == null) return []
  if (props.options instanceof Array) {
    const array = toRaw(props.options)
    if (!!props.sort) sortArray(array, props.sort)
    return array
  }
  if (props.options instanceof Object) {
    const array = Object.values(props.options)
    if (!!props.sort) sortArray(array, props.sort)
    return array
  }
})
</script>

<style scoped>

</style>