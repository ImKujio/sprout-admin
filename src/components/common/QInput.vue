<template>
  <el-form-item class="i-query-item" :label="label">
    <el-input class="i-query-input" v-model="value" :placeholder="'请输入'+label" @blur="onblur" clearable>
      <template v-if="slotPrepend" #prepend>
        <slot name="prepend"/>
      </template>
      <template v-if="slotAppend" #append>
        <slot name="append"/>
      </template>
    </el-input>
  </el-form-item>
</template>
<script setup>
import {computed, useSlots} from "vue";
import {Query} from "@/utils/page-utils";

const slotPrepend = !!useSlots().prepend
const slotAppend = !!useSlots().append

const props = defineProps({
  query: {type: Query, required: true},
  prop: {type: String, required: true},
  label: {type: String, required: true},

  number: {type: Boolean, default: false},
  decimal: {type: Boolean, default: false},
})

const value = computed({
  get() {
    const value = props.query.whereVal(props.prop)
    if (value === null) return null
    if (props.number) {
      let num = null
      if (typeof value === 'boolean') num = value ? 1 : 0
      else if (typeof value === 'number') num = Math.round(value)
      else num = parseInt(value)
      return isNaN(num) || num == null ? null : num
    }
    if (props.decimal) {
      let dec = null
      if (typeof value === 'boolean') dec = value ? 1 : 0
      else if (typeof value === 'number') dec = value
      else dec = parseFloat(value)
      return isNaN(dec) || dec == null ? null : dec
    }
    return value
  },
  set(val) {
    if (val === null) {
      updateWhere(val)
      return;
    }
    if (props.number) {
      const num = parseInt(val)
      updateWhere(isNaN(num) || num == null ? null : num)
      return;
    }
    if (props.decimal) {
      const dec = findFloat(val + "")
      updateWhere(isNaN(dec) || dec == null ? null : dec)
      return;
    }
    updateWhere(val)
  }
})

function updateWhere(val) {
  if (props.number || props.decimal) {
    props.query.putWhere(props.prop, "=", val)
  } else {
    props.query.putWhere(props.prop, "like", val)
  }
}

function onblur() {
  if (props.decimal) {
    let dec
    if (typeof value === 'boolean') dec = value ? 1 : 0
    else if (typeof value === 'number') dec = value
    else dec = parseFloat(findFloat(value))
    updateWhere(isNaN(dec) || dec == null ? null : dec)
  }
}

function findFloat(str) {
  if (!str || str === '') return str
  const matches = str.match(/[\d\\.]*/g);
  str = ""
  for (let i = 0; i < matches.length; i++) {
    str = str + matches[i]
  }
  str = str.replaceAll(/\.+/g, ".")
  if (str.startsWith(".")) str = str.substring(1)
  const di = str.indexOf(".")
  if (di === -1) return str
  str = str.replaceAll(".", "")
  str = str.substring(0, di) + "." + str.substring(di)
  return str;
}
</script>

<style scoped>

</style>