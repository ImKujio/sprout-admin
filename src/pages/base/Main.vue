<template>
  <div class="flex-fill-col">
    <head-bar/>
    <div class="flex-fill-row main-container">
      <nav-menu/>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import HeadBar from "@/components/base/HeadBar.vue";
import NavMenu from "@/components/base/NavMenu.vue";
</script>

<style>
.main-container{
  background-color: var(--el-bg-color-page);
}

.main-container > section{
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 12px;
}

.fade-enter-active{
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.fade-enter-to{
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>