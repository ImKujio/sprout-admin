<template>
  <el-form ref="formRef" :style="{width:width}" :model="form" label-width="auto" :show-message="false">
    <slot></slot>
  </el-form>
</template>

<script setup>
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

const formRef = ref()
const wSize = [320, 672, 1024]

const props = defineProps({
  form: {type: Object, required: true},
  cols: {type: Number, default: 1},
})

const width = computed(() => {
  const col = props.cols < 1 || props.cols > 3 ? 2 : props.cols
  return wSize[col - 1] + 'px'
})

async function validate() {
  try {
    const valid = await formRef.value.validate()
    if (!valid) {
      ElMessage.error('校验失败，请检查填写的数据！')
      return false
    }else {
      return true
    }
  }catch (e) {
    ElMessage.error('校验失败，请检查填写的数据！')
    return false
  }
}

defineExpose({
  validate
})
</script>

<style lang="scss">
.form-input-item {
  margin-bottom: 0;

  .el-form-item__content {
    flex-direction: row;
    flex: 1;
  }

  .el-input-number .el-input__inner {
    text-align: unset;
  }

  .form-item-input {
    margin-bottom: 24px;
    flex: 1;

    .el-textarea__inner {
      min-height: 86px !important;
    }

  }

  .form-input-tip {
    position: absolute;
    line-height: 1.6;
    bottom: 3px;
    left: 2px;
    font-size: 13px;
  }
}



</style>