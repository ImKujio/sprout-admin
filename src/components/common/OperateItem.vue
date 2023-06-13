<template>
  <el-button :type="type" plain @click="emits('click')" :disabled="disabled">
    <svg-icon :icon="icon" class="el-icon"/>
    <span>{{ label }}</span>
  </el-button>
</template>
<script setup>
const emits = defineEmits(['click'])
const props = defineProps({
  type: {type:String,default: "info"}, // primary, success, danger, warning, info
  icon: {type:String,default:null},
  label: String,
  disabled: {type: Boolean, default: false}
})

</script>

<style scoped>

</style>