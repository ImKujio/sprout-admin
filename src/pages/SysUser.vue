<template>
  <section>
    <i-card padding="0 16px">
      <operate-bar @refresh="reload" @query="query.toggle()">
        <operate-item type="primary" icon="add" label="新增" @click="onAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!list.select" @click="onEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!list.select" @click="onDel"/>
      </operate-bar>
      <query-bar :query="query" @query="reload">
        <q-input :query="query" prop="name" label="用户名"/>
        <q-input :query="query" prop="nickName" label="昵称"/>
        <q-select :query="query" prop="owner" label="所属类型" :options="owner"/>
      </query-bar>
    </i-card>
    <i-card fill margin="4px 0" padding="16px">
      <i-table :list="list">
        <el-table-column label="头像" #default="{row}" width="68px" align="center" >
          <el-avatar shape="square" :size="40" :src="getPath(row.avatar)" />
        </el-table-column>
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="nickName" label="昵称"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column #default="{row}" label="所属类型">
          {{row.owner && owner[row.owner].label}}
        </el-table-column>
      </i-table>
    </i-card>
    <i-card padding="10px 16px">
      <i-page :page="query.page" :total="count" @refresh="reload"/>
    </i-card>
    <i-dialog :dialog="dialog" @save="onSave">
      <i-form :form="form">
        <i-input v-model="form.data.name" prop="name" label="用户名"/>
        <i-input v-model="form.data.nickName" prop="nickName" label="昵称"/>
        <i-input v-model="form.data.avatar" prop="avatar" label="头像"/>
        <i-date-picker v-model="form.data.createTime" prop="createTime" label="创建时间" datetime/>
        <i-input v-model="form.data.owner" prop="owner" label="所属类型" number/>
      </i-form>
    </i-dialog>
  </section>
</template>
<script setup>
import {defDialog, defForm, defList, defQuery} from "@/utils/page-utils";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import sysUser from "@/api/sys/sys-user.js";
import sysDict from "@/api/sys/sys-dict.js";
import QSelect from "@/components/common/QSelect.vue";
import {getPath} from "@/api/request.js";

const query = defQuery()
const dialog = defDialog()
const form = defForm(sysUser.new())
const list = defList(() => sysUser.list(query))
const count = asyncRef(() => sysUser.count(query), 0)

const owner = asyncRef(sysDict.getByName("sys_owner"),{})

const reload = loadAsyncRef(() => {
  list.loading = true
}, () => {
  list.loading = false
})

function onAdd() {
  form.add()
  dialog.open("新增系统用户")
}

function onEdit() {
  form.edit(list.select)
  dialog.open("编辑系统用户")
}

function onDel() {
  list.del(sysUser.del, reload)
}

async function onSave() {
  await form.valid()
  dialog.load(async () => {
    await sysUser.put(form.data)
    reload()
  })
}
</script>
<style scoped>
</style>