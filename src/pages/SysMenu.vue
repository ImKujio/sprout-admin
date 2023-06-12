<template>
  <section class="page-container">
    <i-card class="flex-fill-col">
      <List @onAdd="onAdd" @onEdit="onEdit"/>
    </i-card>
    <i-dialog v-model="dialog.open" :loading="dialog.loading" :title="dialog.title" v-slot="{open}" @save="onSave">
      <From :form="form" :visible="open"/>
    </i-dialog>
  </section>
</template>

<script setup>
import {reactive, ref} from "vue";
import {methodProvide} from "@/utils/vue-utils";
import {defDialog} from "@/utils/idialog-utils";
import List from "@/components/sys-menu/List.vue";
import From from "@/components/sys-menu/Form.vue"

const dialog = defDialog()
const form = ref(reactive({}))
const listReload = methodProvide('sysMenuReload')
const formSubmit = methodProvide('sysMenuSubmit')

function onAdd() {
  dialog.title = "新增菜单"
  form.value = reactive({pid: 0})
  dialog.open = true
}

async function onEdit(row) {
  dialog.title = "编辑菜单"
  form.value = reactive(row)
  dialog.open = true
}

async function onSave() {
  dialog.loading = true
  try {
    await formSubmit()
    await listReload()
    dialog.open = false
  } finally {
    dialog.loading = false
  }
}
</script>

<style scoped>

</style>