<template>
  <el-form ref="formRef" class="i-form" :style="style" :model="form.data" label-width="auto" label-position="right"
           :show-message="showMessage">
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
  showMessage: {type: Boolean, default: false}
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

    .el-form-item__content {
      flex-direction: row;
      flex: 1;
    }

    .el-input-number .el-input__inner {
      text-align: unset;
    }

    .i-form-input {
      flex: 1;

      .el-textarea__inner {
        min-height: 86px !important;
      }

    }

  }
}
</style>