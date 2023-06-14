<template>
  <div class="i-card" :style="style">
    <slot></slot>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  fill: {type: Boolean, default: false},
  margin: {type: String, default: '0'},
  padding: {type: String, default: '0'},
})

const style = computed(() => {
  return {
    flex: props.fill ? 1 : 'unset',
    margin: props.margin,
    padding: props.padding,
  };
})
</script>

<style lang="scss">
.i-card {
  display: flex;
  flex-direction: column;
  background-color: var(--el-bg-color);
  border-radius: var(--el-border-radius-small);
  border: 1px solid var(--el-border-color);
}
</style>