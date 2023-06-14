<template>
  <el-pagination
    class="i-page"
    v-model:current-page="pageNum"
    v-model:page-size="size"
    :page-sizes="[20, 50, 100, 200]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    style="justify-content: right"
  />
</template>

<script setup>
import {computed} from "vue";
import {Page} from "@/utils/page-utils";

const emits = defineEmits(["refresh"])

const props = defineProps({
  page: {type: Page, required: true},
  total: {type: Number, default: 0}
})

const size = computed({
  get() {
    return !props.page.size || props.page.size < 20 ? 20 : props.page.size
  },
  set(val) {
    props.page.size = !val || val < 20 ? 20 : val
    reload()
  }
})

const pageNum = computed({
  get() {
    return !props.page.page || props.page.page < 1 ? 1 : props.page.page
  },
  set(val) {
    props.page.page = !val || val < 1 ? 1 : val
    reload()
  }
})

function reload() {
  if (!props.page.size || props.page.size < 20) return
  if (!props.page.page || props.page.page < 1) return
  emits("refresh")
}
</script>

<style>
</style>