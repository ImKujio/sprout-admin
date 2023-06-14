<template>
  <section>
    <i-card>
      <operate-bar @refresh="reload">
        <operate-item type="primary" icon="add" label="新增" @click="onAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!list.select" @click="onEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!list.select" @click="onDel"/>
      </operate-bar>
      <list-full :list="list">
        <el-table-column prop="name" label="字典名"/>
        <el-table-column prop="label" label="显示名"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column label="所属类型">
          <template #default="{row}">
            <span>{{ owners[row.owner].label }}</span>
          </template>
        </el-table-column>
      </list-full>
      <pager :page="query.page" :total="total" @refresh="reload"/>
    </i-card>
    <i-dialog :dialog="dialog" @save="onSave">
      <input-form ref="formRef" :form="form">
        <input-text v-model="form.name" prop="name" label="字典名" required/>
        <input-text v-model="form.label" prop="label" label="显示名" required/>
        <input-text v-model="form.remark" prop="remark" label="备注"/>
      </input-form>
    </i-dialog>
  </section>
</template>

<script setup>
import {ref} from "vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {defDialog, defList, defQuery, handleDel} from "@/utils/page-utils";
import sysDict from "@/api/sys/sys-dict.js";
import Pager from "@/components/common/Pager.vue";

const formRef = ref()

const query = defQuery()
const dialog = defDialog()
const form = ref(sysDict.new())
const list = defList(() => sysDict.list(query))
const total = asyncRef(() => sysDict.total(), 0)
const owners = asyncRef(sysDict.getByName("sys_owner"), {})

function onAdd() {
  form.value = sysDict.new({owner: sysDict.OWNER.USER})
  dialog.title = "新增字典"
  dialog.open = true
}

function onEdit() {
  form.value = list.select
  dialog.title = "编辑字典"
  dialog.open = true
}

async function onDel() {
  await handleDel(sysDict.del(list.select.id))
  reload()
}

async function onSave() {
  if (!await formRef.value.validate()) return
  dialog.loading = true
  await sysDict.put(form.value)
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