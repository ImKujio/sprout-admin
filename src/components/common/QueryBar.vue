<template>
  <div v-show="query.visible" class="query-bar">
    <div ref="formRef" class="flex-fill-row">
      <el-form class="query-bar-form" :style="style" :model="query.where" label-width="auto"
               label-position="right" :show-message="false" @keydown.enter.prevent="onQuery">
        <slot></slot>
      </el-form>
    </div>
    <el-button type="primary" style="margin-left: 16px" plain @click="onQuery">
      <svg-icon icon="query" class="el-icon"/>
      <span>搜索</span>
    </el-button>
    <el-button v-if="reset" plain @click="onReset">
      <svg-icon icon="refresh" class="el-icon"/>
      <span>重置</span>
    </el-button>
  </div>
</template>

<script setup>
import {Query} from "@/utils/page-utils";
import {onMounted, onUnmounted, reactive, ref} from "vue";

const emits = defineEmits(["query"])

const props = defineProps({
  query: {type: Query, default: true},
  reset: {type: Boolean, default: true},
  itemWidth: {type: Number, default: 280}
})

const formRef = ref()
const style = reactive({
  gridTemplateColumns: "1fr 1fr 1fr"
})

const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const width = entry.contentRect.width
    if (width === 0) return
    let times = Math.floor(width / props.itemWidth)
    console.log(times)
    times = times > 1 ? times : 1
    const array = []
    for (let i = 0; i < times; i++) {
      array.push("1fr")
    }
    style.gridTemplateColumns = array.join(" ")
  }
})

onMounted(() => {
  console.log(formRef.value)
  resizeObserver.observe(formRef.value)
})

onUnmounted(() => {
  resizeObserver.unobserve(formRef.value)
})

function onReset() {
  props.query.resetWhere()
  props.query.resetPage()
  onQuery()
}

function onQuery() {
  emits("query")
}

</script>

<style lang="scss">
.query-bar {
  display: flex;
  flex-direction: row;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--el-border-color);
  align-items: end;

  .el-button {
    padding: 8px 10px;
  }

  .query-bar-form {
    flex: 1;
    display: grid;
    grid-column-gap: 32px;
    grid-row-gap: 12px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .i-query-item {

      margin-bottom: 0;

      .el-form-item__content {
        flex-direction: row;
        flex: 1;
      }

      .el-input-number .el-input__inner {
        text-align: unset;
      }

      .i-query-input {
        flex: 1;

        .el-textarea__inner {
          min-height: 86px !important;
        }

      }

    }
  }
}
</style>