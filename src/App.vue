<template>
  <suspense class="flex-fill-col">
    <div class="flex-fill-col">
      <head-bar/>
      <div class="flex-fill-row">
        <nav-menu/>
        <section class="page-container">
          <router-view/>
        </section>
      </div>
    </div>
  </suspense>
</template>

<script setup>
import HeadBar from "@/components/base/HeadBar.vue";
import NavMenu from "@/components/base/NavMenu.vue";
</script>

<style>
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--el-fill-color-light);
}

</style>
