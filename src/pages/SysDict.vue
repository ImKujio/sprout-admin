<template>
  <section>
    <i-card padding="10px 16px">
      <operate-bar @refresh="reload">
        <operate-item type="primary" icon="add" label="新增" @click="onDictAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!dictList.select" @click="onDictEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!dictList.select" @click="onDictDel"/>
      </operate-bar>
    </i-card>
    <i-card fill margin="4px 0" padding="0 16px">
      <i-table :list="dictList">
        <el-table-column prop="name" label="字典名"/>
        <el-table-column prop="label" label="显示名"/>
        <el-table-column prop="remark" label="备注"/>
        <el-table-column label="所属类型">
          <template #default="{row}">
            <span>{{ owners[row.owner].label }}</span>
          </template>
        </el-table-column>
      </i-table>
    </i-card>
    <i-card padding="10px 16px">
      <i-page :page="dictQuery.page" :total="dictTotal" @refresh="reload"/>
    </i-card>
    <i-dialog :dialog="dictDialog" @save="onSave">
      <i-form :form="dictForm" :cols="3">
        <i-input v-model="dictForm.data.name" prop="name" label="字典名" required/>
        <i-input v-model="dictForm.data.label" prop="label" label="显示名" required/>
        <i-input v-model="dictForm.data.remark" prop="remark" label="备注"/>
      </i-form>
      <operate-bar style="margin:8px 0" :refresh="false" :filter="false">
        <operate-item type="primary" icon="add" label="新增" @click="onItemAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!itemList.select" @click="onItemEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!itemList.select" @click="onItemDel"/>
      </operate-bar>
      <i-card>
        <i-table height="400px" :list="itemList">
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="label" label="显示名"/>
          <el-table-column prop="style" label="样式名"/>
          <el-table-column prop="remark" label="备注"/>
        </i-table>
      </i-card>
    </i-dialog>
    <i-dialog :dialog="itemDialog" @save="onItemSave">
      <i-form :form="itemForm">
        <i-input v-model="itemForm.data.name" prop="name" label="名称" required/>
        <i-input v-model="itemForm.data.label" prop="label" label="显示名" required/>
        <i-input v-model="itemForm.data.style" prop="style" label="样式名" />
        <i-input v-model="itemForm.data.remark" prop="remark" label="备注"/>
      </i-form>
    </i-dialog>
  </section>
</template>

<script setup>
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {allQuery, defDialog, defForm, defList, defQuery, tempList} from "@/utils/page-utils";
import sysDict from "@/api/sys/sys-dict.js";
import sysDictItem from "@/api/sys/sys-dict-item.js";

const dictQuery = defQuery()
const dictDialog = defDialog()
const dictForm = defForm(sysDict.new())
const dictList = defList(() => sysDict.list(dictQuery))
const dictTotal = asyncRef(() => sysDict.total(), 0)

const itemQuery = allQuery()
const itemDialog = defDialog()
const itemForm = defForm(sysDictItem.new())
const itemList = tempList(() => sysDictItem.list(itemQuery))

const owners = asyncRef(sysDict.getByName("sys_owner"), {})

function onDictAdd() {
  dictForm.add(def => def.owner = sysDict.OWNER.USER)
  itemList.clear()
  dictDialog.open("新增字典")
}

function onDictEdit() {
  dictForm.edit(dictList.select)
  itemQuery.putWhere("dict","=",dictList.select.id)
  itemList.load()
  dictDialog.open("编辑字典")
}

async function onDictDel() {
  dictList.del(sysDict.del,reload)
}

async function onSave() {
  if (!await dictForm.valid()) return
  dictDialog.loading = true
  await sysDict.putWithItems(dictForm.data,itemList.data)
  dictDialog.close()
  reload()
}

function onItemAdd() {
  itemForm.add()
  itemDialog.open("新增字典项")
}

function onItemEdit() {
  itemForm.edit(itemList.select)
  itemDialog.open("编辑字典项")
}

function onItemDel() {
  itemList.del()
}

async function onItemSave() {
  if (!await itemForm.valid()) return
  itemList.put(itemForm.data,itemForm.isEdit())
  itemDialog.close()
}

const reload = loadAsyncRef(() => {
  dictList.loading = true
}, () => {
  dictList.loading = false
})
</script>

<style scoped>

</style>