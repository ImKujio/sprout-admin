<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <el-cascader class="i-form-input" v-model="value" :disabled="disabled" :options="optionsTree"
                 :show-all-levels="false" clearable
                 :props="{value:valueKey,label:labelKey,emitPath:false,checkStrictly: true}"/>
  </el-form-item>
</template>

<script setup>
import {computed} from "vue";
import {list2Tree, map2Tree, sortTree} from "@/utils/collection-utils.js";

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

const optionsTree = computed(() => {
  if (props.options instanceof Array) {
    const tree = list2Tree(props.options)
    if (!!props.sort) sortTree(tree, props.sort)
    return tree
  } else {
    const tree = map2Tree(props.options)
    if (!!props.sort) sortTree(tree, props.sort)
    return tree
  }
})
</script>

<style scoped>

</style>