<template>
  <input-form name="sysMenu" :form="form" :cols="1">
    <input-radio v-model="form.type" prop="type" label="类型" :options="types"/>
    <input-text v-model="form.name" prop="name" label="菜单名" required/>
    <input-text v-if="form.type === sysMenu.TYPE.ITEM" v-model="form.path" prop="path" label="路径" required/>
    <input-text v-if="form.type === sysMenu.TYPE.ITEM" v-model="form.component" prop="component" label="组件" required/>
    <input-text v-model="form.sort" prop="sort" label="排序" number/>
  </input-form>
</template>

<script setup>
import {watch} from "vue";
import {asyncRef, loadAsyncRef, methodInject, methodProvide} from "@/utils/vue-utils";
import sysMenu from "@/api/sys/sys-menu.js";
import sysDict from "@/api/sys/sys-dict.js";

const props = defineProps({
  form: {type: Object, required: true},
  visible: {type: Boolean, default: true}
})

const types = asyncRef(sysDict.getByName("admin_menu_type"), {})

const formValidate = methodProvide('sysMenuValidate')

methodInject("sysMenuSubmit",async () => {
  await formValidate()
  await sysMenu.put(props.form)
})

watch(() => props.visible, (n) => {
  if (n) reload()
})

const reload = loadAsyncRef()
</script>

<style scoped>

</style>