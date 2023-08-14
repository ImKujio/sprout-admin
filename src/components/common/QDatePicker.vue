<template>
  <el-form-item class="i-query-item" :label="label">
    <el-date-picker class="i-query-input" v-model="value" :placeholder="'请选择'+label"
                    type="daterange" value-format="YYYY-MM-DD" range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" clearable/>
  </el-form-item>
</template>
<script setup>
import {computed} from "vue";
import {Query, ValueSeparator} from "@/utils/page-utils";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  label: {type: String, required: true},
  prop: {type: String, required: true},
  query: {type: Query, required: true},
})

const value = computed({
  get() {
    const value = props.query.whereVal(props.prop)
    if (value === null) return null
    if (typeof value !== 'string') return null
    const arr = value.split(ValueSeparator)
    if (arr.length !== 2 || arr[0] === '' || arr[1] === '') return null
    return arr
  },
  set(val) {
    if (!val || val.length !== 2) updateWhere(null)
    else updateWhere(val.join(ValueSeparator))
  }
})

function updateWhere(val) {
  props.query.putWhere(props.prop, "between", val)
}
</script>

<style scoped>

</style>