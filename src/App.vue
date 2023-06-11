<template>
  <suspense class="flex-fill-col">
    <div class="flex-fill-col">
      <head-bar/>
      <div class="flex-fill-row" style="background-color: var(--theme-background)">
        <nav-menu/>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>
    </div>
  </suspense>
</template>

<script setup>
import HeadBar from "@/components/base/HeadBar.vue";
import NavMenu from "@/components/base/NavMenu.vue";
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--el-transition-duration-fast) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
