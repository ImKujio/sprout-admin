<template>
  <el-form ref="formRef" :style="{width:width}" :model="form" label-width="auto" :show-message="false">
    <slot></slot>
  </el-form>
</template>

<script setup>
import {computed, inject, ref} from "vue";
import {ElMessage} from "element-plus";
import {methodInject} from "@/utils/vue-utils";

const formRef = ref()
const wSize = [320, 672, 1024]

const props = defineProps({
  form: {type: Object, required: true},
  cols: {type: Number, default: 1},
  name: {type: String, required: true}
})

const width = computed(() => {
  const col = props.cols < 1 || props.cols > 3 ? 2 : props.cols
  return wSize[col - 1] + 'px'
})

methodInject(props.name+"Validate",async () => {
  await formRef.value.validate(((valid) => {
    if (!valid){
      ElMessage.error('校验失败，请检查填写的数据！')
    }
  }))
})
</script>

<style>
.form-input-item {
  margin-bottom: 0;
}

.form-item-input {
  margin-bottom: 24px;
}

.form-input-item .el-input {
  width: 100%;
}

.form-item-input .el-textarea__inner {
  min-height: 86px !important;
}

.form-input-item .el-input-number .el-input__inner {
  text-align: unset;
}

.form-input-tip {
  position: absolute;
  line-height: 1.6;
  bottom: 3px;
  left: 2px;
  font-size: 13px;
}
</style>