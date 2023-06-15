<template>
  <el-form ref="formRef" class="i-form" :style="style" :model="form.data" label-width="auto" :show-message="false">
    <slot></slot>
  </el-form>
</template>

<script setup>
import {computed, nextTick, ref} from "vue";
import {Form} from "@/utils/page-utils";

const formRef = ref()
const wSize = [320, 672, 1024]

const props = defineProps({
  form: {type: Form, required: true},
  cols: {type: Number, default: 1},
})

const style = computed(() => {
  const col = props.cols < 1 || props.cols > 3 ? 2 : props.cols
  const fr = []
  for (let i = 0; i < col; i++) {
    fr.push("1fr")
  }
  return {
    width: wSize[col - 1] + "px",
    gridTemplateColumns: fr.join(" ")
  }
})

nextTick(() => {
  props.form.setValid(formRef.value.validate)
})
</script>

<style lang="scss">
.i-form {
  display: grid;
  grid-column-gap: 32px;

  .i-form-item {
    margin-bottom: 0;

    .el-form-item__content {
      flex-direction: row;
      flex: 1;
    }

    .el-input-number .el-input__inner {
      text-align: unset;
    }

    .i-form-input {
      margin-bottom: 24px;
      flex: 1;

      .el-textarea__inner {
        min-height: 86px !important;
      }

    }

    .i-form-tip {
      position: absolute;
      line-height: 1.6;
      bottom: 3px;
      left: 2px;
      font-size: 13px;
    }
  }
}
</style>