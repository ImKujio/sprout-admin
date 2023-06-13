<template>
  <section class="page-container">
    <i-card class="flex-fill-col">
      <operate-bar :filter="false" @refresh="reload">
        <operate-item type="primary" icon="add" label="新增" @click="onAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!list.select" @click="onEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!list.select" @click="onDel"/>
      </operate-bar>
      <list-full :list="list" tree>
        <el-table-column prop="name" label="菜单"/>
        <el-table-column prop="path" label="路径"/>
        <el-table-column prop="component" label="组件"/>
        <el-table-column prop="sort" label="排序"/>
      </list-full>
    </i-card>
    <i-dialog :dialog="dialog" @save="onSave">
      <input-form ref="formRef" :form="form">
        <input-radio v-model="form.type" prop="type" label="类型" :options="types"/>
        <input-cascader v-model="form.pid" prop="pid" label="上级菜单" :options="menus" label-key="name"/>
        <input-text v-model="form.name" prop="name" label="菜单名" required/>
        <input-text v-if="form.type === sysMenu.TYPE.ITEM" v-model="form.path" prop="path" label="路径" required/>
        <input-text v-if="form.type === sysMenu.TYPE.ITEM" v-model="form.component" prop="component" label="组件"
                    required/>
        <input-text v-model="form.sort" prop="sort" label="排序" number/>
      </input-form>
    </i-dialog>
  </section>
</template>

<script setup>
import {computed, ref} from "vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {defDialog, defList, defQuery, handleDel} from "@/utils/page-utils";
import sysMenu from "@/api/sys/sys-menu.js";
import sysDict from "@/api/sys/sys-dict.js";
import InputCascader from "@/components/common/InputCascader.vue";

const query = defQuery()
const dialog = defDialog()
const form = ref({})
const list = defList(() => sysMenu.list({}))

const types = asyncRef(sysDict.getByName("admin_menu_type"), {})

const formRef = ref()

const menus = computed(() => {
  const data = list.data.filter(i => i.type === sysMenu.TYPE.MENU)
  data.splice(0,0,{id:0,pid:-1,name:"主目录"})
  return data
})

function onAdd() {
  form.value = {pid: 0}
  dialog.title = "新增菜单"
  dialog.open = true
}

function onEdit() {
  form.value = list.selRow()
  dialog.title = "编辑菜单"
  dialog.open = true
}

async function onDel() {
  await handleDel(sysMenu.del(list.selRow().id))
  reload()
}

async function onSave() {
  if (!await formRef.value.validate()) return
  dialog.loading = true
  await sysMenu.put(form.value)
  dialog.open = false
  dialog.loading = false
  reload()
}

const reload = loadAsyncRef(() => {
  list.loading = true
}, () => {
  list.loading = false
})
</script>

<style scoped>

</style>