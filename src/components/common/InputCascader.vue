<template>
  <el-form-item class="form-input-item" :label="label" :prop="prop" :required="required">
    <el-cascader class="form-item-input" v-model="value" :disabled="disabled" :options="optionsTree"
                 :props="{value:valueKey,label:labelKey}"/>
    <div v-if="tip" class="form-input-tip">{{ tip }}</div>
  </el-form-item>
</template>

<script setup>
import {computed} from "vue";
import {list2Tree, map2Tree} from "@/utils/collection-utils.js";

const props = defineProps({
  modelValue: {type: Number, default: null},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  disabled: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  tip: {type: String, default: null},
  options: {type: [Object, Array], default: () => []},
  valueKey: {type: String, default: "id"},
  labelKey: {type: String, default: "label"}
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
  console.log("options",props.options)
  if (props.options instanceof Array) {
    return list2Tree(props.options)
  } else {
    return map2Tree(props.options)
  }
})
</script>

<style scoped>

</style>