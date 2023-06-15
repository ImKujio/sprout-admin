<template>
  <section>
    <i-card padding="10px 16px">
      <operate-bar :filter="false" @refresh="reload">
        <operate-item type="primary" icon="add" label="新增" @click="onAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!list.select" @click="onEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!list.select" @click="onDel"/>
      </operate-bar>
    </i-card>
    <i-card fill margin="4px 0 0" padding="0 16px">
      <i-table :list="list" sort="sort" tree>
        <el-table-column label="菜单">
          <template #default="{row}">
            <svg-icon style="margin-right: 4px" v-if="!!row.icon" :icon="row.icon"/>
            <span>{{row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路径"/>
        <el-table-column prop="component" label="组件"/>
        <el-table-column prop="sort" label="排序"/>
      </i-table>
    </i-card>
    <i-dialog :dialog="dialog" @save="onSave">
      <i-form :form="form">
        <i-radio v-model="form.data.type" prop="type" label="类型" :options="types"/>
        <i-tree-select v-model="form.data.pid" prop="pid" label="上级菜单" :options="menus" label-key="name" sort="sort" required/>
        <i-input v-model="form.data.name" prop="name" label="菜单名" required/>
        <i-input v-model="form.data.icon" prop="icon" label="图标"/>
        <i-input v-if="form.data.type === sysMenu.TYPE.ITEM" v-model="form.data.path" prop="path" label="路径" required/>
        <i-input v-if="form.data.type === sysMenu.TYPE.ITEM" v-model="form.data.component" prop="component" label="组件"
                    required/>
        <i-input v-model="form.data.sort" prop="sort" label="排序" number/>
      </i-form>
    </i-dialog>
  </section>
</template>

<script setup>
import {computed} from "vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {defDialog, defList, allQuery, defForm} from "@/utils/page-utils";
import sysMenu from "@/api/sys/sys-menu.js";
import sysDict from "@/api/sys/sys-dict.js";

const query = allQuery()
const dialog = defDialog()
const form = defForm(sysMenu.new())
const list = defList(() => sysMenu.list(query))
const types = asyncRef(sysDict.getByName("admin_menu_type"), {})

const menus = computed(() => {
  const data = list.data.filter(i => i.type === sysMenu.TYPE.MENU)
  data.splice(0,0,sysMenu.new({id:0,pid:-1,name:"主目录"}))
  return data
})

function onAdd() {
  form.add(def => def.pid = 0)
  dialog.open("新增菜单")
}

function onEdit() {
  form.edit(list.select)
  dialog.open("编辑菜单")
}

function onDel() {
  list.del(sysMenu.del,reload)
}

async function onSave() {
  if (!await form.valid()) return
  dialog.loading = true
  await sysMenu.put(form.data)
  dialog.close()
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