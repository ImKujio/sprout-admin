<template>
  <i-dialog :dialog="dialog" @save="onSave">
    <el-upload ref="uploadRef" drag :action="url" :auto-upload="false" :headers="request.constant.headers()" style="min-width: 400px"
               :multiple="false" :limit="1"
               :on-success="onSuccess" :on-error="onError" accept=".xls,.xlsx">
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          仅允许导入xls、xlsx格式文件，
          <a :href="'src/assets/template/' + template">下载模板</a>
        </div>
      </template>
    </el-upload>
  </i-dialog>
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import {Dialog} from "@/utils/page-utils";
import {ref, watch} from "vue";
import request, {handleResponse} from "@/api/request.js";
import {ElMessage} from "element-plus";

const emits = defineEmits(["refresh"])

const props = defineProps({
  dialog: {type: Dialog, required: true},
  url: {type: String, required: true},
  template: {type: String, required: true}
})

const uploadRef = ref()


watch(() => props.dialog.isOpen, () => {
  uploadRef.value && uploadRef.value.clearFiles()
})

function onError(err) {
  ElMessage.error(err.message)
  uploadRef.value.clearFiles()
  props.dialog.loading = false
}

function onSuccess(res) {
  handleResponse(res).then(() => {
    ElMessage.success("导入成功")
    props.dialog.close()
    emits("refresh")
  }).catch(() => {
    props.dialog.loading = false
    uploadRef.value.clearFiles()
  })
}

function onSave() {
  props.dialog.loading = true
  uploadRef.value.submit()
}
</script>

<style scoped>

</style>