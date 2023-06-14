<template>
  <div class="i-card">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style>
.i-card{
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-bg-color);
  margin: 12px;
}
</style>