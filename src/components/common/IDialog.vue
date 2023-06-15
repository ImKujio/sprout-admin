<template>
  <el-dialog class="i-dialog" :closeOnPressEscape=false :closeOnClickModal=false :show-close="false"
             :title="dialog.title" clearable
             :model-value="dialog.isOpen" @update:modelValue="val => dialog.isOpen = val"
             @open="onOpen" @close="onClose" :width="width" append-to-body>
    <template #footer>
      <span class="i-dialog-footer">
        <el-button @click="dialog.isOpen = false">取消</el-button>
        <slot name="right">
          <el-button :disabled="dialog.loading" type="primary" @click="emits('save')">保存</el-button>
        </slot>
      </span>
    </template>
    <div v-loading="dialog.loading">
      <slot :open="open"></slot>
    </div>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import {Dialog} from "@/utils/page-utils";

const emits = defineEmits(["save"])
const props = defineProps({
  dialog: {type: Dialog, required: true},
  width: {type: String, default: "fit-content"},
})
const open = ref(false)

function onOpen() {
  open.value = true
}

function onClose() {
  open.value = false
  props.dialog.loading = false
}
</script>

<style lang="scss">
.i-dialog {
  .el-dialog__header {
    margin-right: 0;
  }

  .el-dialog__body {
    padding: 10px 20px;
  }

  .el-dialog__footer {
    padding: 10px 20px 20px;
  }

  .i-dialog-footer {
    display: flex;
    flex-direction: row-reverse;

    .el-button {
      margin-left: 16px;
    }
  }
}
</style>