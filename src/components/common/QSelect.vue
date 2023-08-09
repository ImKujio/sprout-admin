<template>
  <el-form-item class="i-query-item" :label="label">
    <el-select class="i-query-input" v-model="value" :placeholder="'请选择'+label" clearable>
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
import {Query} from "@/utils/page-utils";

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  label: {type: String, required: true},
  prop: {type: String, required: true},
  query: {type: Query, required: true},

  options: {type: [Object, Array], default: () => []},

  bool: {type: Boolean, default: false},

  valueKey: {type: String, default: "id"},
  labelKey: {type: String, default: "label"},
  sort: {type: String, default: null}
})

const value = computed({
  get() {
    const value = props.query.whereVal(props.prop)
    if (value === null) return null
    if (props.bool) {
      return !!value ? 1 : 0
    } else if (Number.isInteger(value)) {
      return value
    } else {
      return null
    }
  },
  set(val) {
    updateWhere(val)
  }
})

function updateWhere(val) {
  if (val != null && props.bool) props.query.putWhere(props.prop, "=", val === 1)
  else props.query.putWhere(props.prop, "=", val)
}

const sortedOptions = computed(() => {
  if (props.bool) return [{id: 0, label: "否"}, {id: 1, label: "是"}]
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