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
      <i-form ref="dictFormRef" :form="dictForm" :cols="3">
        <i-input v-model="dictForm.name" prop="name" label="字典名" required/>
        <i-input v-model="dictForm.label" prop="label" label="显示名" required/>
        <i-input v-model="dictForm.remark" prop="remark" label="备注"/>
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
      <i-form ref="itemFormRef" :form="itemForm">
        <i-input v-model="itemForm.name" prop="name" label="名称" required/>
        <i-input v-model="itemForm.label" prop="label" label="显示名" required/>
        <i-input v-model="itemForm.style" prop="style" label="样式名" />
        <i-input v-model="itemForm.remark" prop="remark" label="备注"/>
      </i-form>
    </i-dialog>
  </section>
</template>

<script setup>
import {ref} from "vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {allQuery, defDialog, defList, defQuery, handleDel, tempList} from "@/utils/page-utils";
import sysDict from "@/api/sys/sys-dict.js";
import ICard from "@/components/common/ICard.vue";
import sysDictItem from "@/api/sys/sys-dict-item.js";
import IDialog from "@/components/common/IDialog.vue";

const dictFormRef = ref()

const dictQuery = defQuery()
const dictDialog = defDialog()
const dictForm = ref(sysDict.new())
const dictList = defList(() => sysDict.list(dictQuery))
const dictTotal = asyncRef(() => sysDict.total(), 0)

const itemFormRef = ref()

const itemQuery = allQuery()
const itemDialog = defDialog()
const itemForm = ref(sysDictItem.new())
const itemList = tempList(() => sysDictItem.list(itemQuery))

const owners = asyncRef(sysDict.getByName("sys_owner"), {})

function onDictAdd() {
  dictForm.value = sysDict.new({owner: sysDict.OWNER.USER})
  dictDialog.title = "新增字典"
  itemList.clear()
  dictDialog.open = true
}

function onDictEdit() {
  dictForm.value = dictList.select
  dictDialog.title = "编辑字典"
  itemQuery.putWhere("dict","=",dictList.select.id)
  itemList.load()
  dictDialog.open = true
}

async function onDictDel() {
  await handleDel(sysDict.del(dictList.select.id))
  reload()
}

async function onSave() {
  if (!await dictFormRef.value.validate()) return
  dictDialog.loading = true
  await sysDict.put(dictForm.value)
  dictDialog.open = false
  dictDialog.loading = false
  reload()
}

function onItemAdd() {
  itemList.edit = false
  itemForm.value = sysDictItem.new()
  itemDialog.title = "新增字典项"
  itemDialog.open = true
}

function onItemEdit() {
  itemList.edit = true
  itemForm.value = Object.assign({},itemList.select)
  itemDialog.title = "编辑字典项"
  itemDialog.open = true
}

function onItemDel() {
  itemList.del()
}

async function onItemSave() {
  if (!await  itemFormRef.value.validate()) return
  itemList.put(itemForm.value)
  itemDialog.open = false
}

const reload = loadAsyncRef(() => {
  dictList.loading = true
}, () => {
  dictList.loading = false
})
</script>

<style scoped>

</style>