<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <el-cascader class="i-form-input" v-model="value" :disabled="disabled" :options="optionsTree"
                 :show-all-levels="false" clearable
                 :props="{value:valueKey,label:labelKey,emitPath:false,checkStrictly: true}"/>
  </el-form-item>
</template>

<script setup>
import {computed} from "vue";
import {list2Tree, map2Tree} from "@/utils/collection-utils.js";

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: {type: Number, default: null},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  options: {type: [Object, Array], default: () => []},
  valueKey: {type: String, default: "id"},
  labelKey: {type: String, default: "label"}
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    console.log("select", val)
    emits('update:modelValue', val)
  }
})

const optionsTree = computed(() => {
  console.log("options", props.options)
  if (props.options instanceof Array) {
    return list2Tree(props.options)
  } else {
    return map2Tree(props.options)
  }
})
</script>

<style scoped>

</style>