<template>
  <el-form-item class="i-form-item" :label="label" :prop="prop" :required="required">
    <div class="i-image-cropper" @click="onSelect">
      <el-image :style="style" :src="value" fit="contain"/>
      <div class="i-image-cropper-container" :style="coverStyle">
        <svg-icon class="i-image-cropper-add" icon="add"/>
      </div>
    </div>
    <i-dialog :dialog="dialog" @save="onSave">
      <div class="flex-fill-row" style="align-items: center">
        <div class="flex-fill-col">
          <div style="width: 300px;height: 300px">
            <vue-cropper
                ref="cropperRef"
                :img="options.img"
                :info="true"
                :autoCrop="options.autoCrop"
                :autoCropWidth="options.autoCropWidth"
                :autoCropHeight="options.autoCropHeight"
                :fixedBox="options.fixedBox"
                :outputType="options.outputType"
                @realTime="preview"
            />
          </div>
          <div style="display: flex;flex-direction: row;margin-top: 16px">
            <el-upload action="#" :show-file-list="false" accept=".png,.jpg" :http-request="requestUpload">
              <el-button type="primary">选择</el-button>
            </el-upload>
          </div>
        </div>
        <div class="i-image-cropper-preview" :style="previewStyle">
          <el-image :src="imagePreview && imagePreview.url"
                    :style="imagePreview && imagePreview.img" #error>
            {{ }}
          </el-image>
        </div>
      </div>
    </i-dialog>
  </el-form-item>
</template>

<script setup>
import {computed, ref} from "vue";
import request from "@/api/request.js";
import SvgIcon from "@/components/base/SvgIcon.vue";
import IDialog from "@/components/common/IDialog.vue";
import {defDialog} from "@/utils/page-utils";
import {VueCropper} from "vue-cropper";
import {ElMessage} from "element-plus";
import 'vue-cropper/dist/index.css';

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {type: String, default: null},
  label: {type: String, default: null},
  prop: {type: String, default: null},
  required: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  action: {type: Function, required: true},

  size: {type: Number, default: 100},
  width: {type: Number, default: 256},
  height: {type: Number, default: 256},
  radius: {type: Number, default: 0}
})

const dialog = defDialog()
const cropperRef = ref()
const imageFile = ref(null)
const imagePreview = ref(null)

const value = computed({
  get() {
    if (!props.modelValue || props.modelValue === '') return null
    else return request.constant.baseURL + props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const style = computed(() => {
  const scale = props.size / Math.max(props.width, props.height)
  const width = Math.round(scale * props.width)
  const height = Math.round(scale * props.height)
  return {
    width: width + 'px',
    height: height + 'px',
  }
})

const previewStyle = computed(() => {
  const scale = 200 / Math.max(props.width, props.height)
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    zoom: scale
  }
})

const options = computed(() => {
  return {
    img: imageFile.value, //裁剪图片的地址
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: props.width, // 默认生成截图框宽度
    autoCropHeight: props.height, // 默认生成截图框高度
    fixedBox: true, // 固定截图框大小 不允许改变
    outputType: "png" // 默认生成截图为PNG格式
  }
})

const coverStyle = computed(() => {
  return {
    backgroundColor: value.value ? 'var(--el-overlay-color)' : 'transparent',
    opacity: value.value ? 0 : 1
  }
})


function onSelect() {
  imageFile.value = props.modelValue && request.constant.baseURL + props.modelValue
  dialog.open("选择" + props.label)
}

function requestUpload(data) {
  const {file} = data
  if (!file.type.includes("image/")) {
    ElMessage.error("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件")
    return
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imageFile.value = reader.result
  };
}

function preview(data) {
  imagePreview.value = data
}

function onSave() {
  if (!cropperRef.value) return
  dialog.loading = true
  cropperRef.value.getCropBlob(file => {
    if (file == null) return
    props.action(file).then((path) => {
      emits("update:modelValue", path)
      dialog.close()
    }).catch(err => {
      ElMessage.error(err)
      dialog.loading = false
    })
  })
}
</script>

<style lang="scss">
.i-image-cropper {
  position: relative;
  border-radius: var(--el-border-radius-base);
  transition: var(--el-transition-box-shadow);
  box-shadow: 0 0 0 1px var(--el-border-color);
  line-height: 0;
  cursor: pointer;

  .el-image {
    border-radius: var(--el-border-radius-base);
  }

  .i-image-cropper-container {
    position: absolute;
    border-radius: var(--el-border-radius-base);
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--el-overlay-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }

  .i-image-cropper-container:hover {
    opacity: 1 !important;
    box-shadow: 0 0 0 1px var(--el-border-color-hover);
  }

  .i-image-cropper-add {
    width: 32px;
    height: 32px;
    color: var(--el-color-primary);
  }
}

.i-image-cropper-preview {
  margin-left: 32px;
  overflow: hidden;
  border-radius: var(--el-border-radius-base);
  box-shadow: 0 0 0 1px var(--el-border-color);
  position: relative;
  transform: none !important;
}
</style>