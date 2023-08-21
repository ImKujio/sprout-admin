<template>
  <section>
    <i-card padding="0 16px">
      <operate-bar @refresh="reload" @query="query.toggle()">
        <operate-item type="primary" icon="add" label="新增" @click="onAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!list.select" @click="onEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!list.select" @click="onDel"/>
      </operate-bar>
      <query-bar :query="query" @query="reload">
        <q-input :query="query" prop="name" label="姓名"/>
        <q-input :query="query" prop="age" label="年龄" number/>
        <q-select :query="query" prop="sex" label="性别" :options="sex"/>
        <q-select :query="query" prop="stay" label="是否在校" bool/>
        <q-date-picker :query="query" prop="birthday" label="生日"/>
      </query-bar>
    </i-card>
    <i-card fill margin="4px 0" padding="16px">
      <i-table :list="list" sort="sort" tree>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column label="头像" #default="{row}">
          <el-avatar shape="square" :size="40" :src="getPath(row.avatar)" />
        </el-table-column>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column label="性别" #default="{row}">
          {{ row.sex && sex[row.sex].label }}
        </el-table-column>
        <el-table-column prop="stay" label="是否在校"/>
        <el-table-column prop="score" label="成绩"/>
        <el-table-column prop="birthday" label="生日"/>
        <el-table-column prop="schoolDismissalTime" label="放学时间"/>
        <el-table-column prop="registrationTime" label="注册时间"/>
      </i-table>
    </i-card>
    <i-card padding="10px 16px">
      <i-page :page="query.page" :total="count" @refresh="reload"/>
    </i-card>
    <i-dialog :dialog="dialog" @save="onSave">
      <i-form :form="form">
        <i-input v-model="form.data.name" prop="name" label="姓名" required/>
        <i-image-cropper v-model="form.data.avatar" prop="avatar" label="头像" :action="testStudent.uploadAvatar"/>
        <i-input v-model="form.data.age" prop="age" label="年龄" number/>
        <i-select v-model="form.data.sex" prop="sex" label="性别" :options="sex"/>
        <i-switch v-model="form.data.stay" prop="stay" label="是否在校"/>
        <i-input v-model="form.data.score" prop="score" label="成绩" decimal/>
        <i-date-picker v-model="form.data.birthday" prop="birthday" label="生日"/>
        <i-time-picker v-model="form.data.schoolDismissalTime" prop="schoolDismissalTime" label="放学时间"/>
        <i-date-picker v-model="form.data.registrationTime" prop="registrationTime" label="注册时间" datetime/>
      </i-form>
    </i-dialog>
  </section>
</template>

<script setup>
import {defDialog, defForm, defList, defQuery} from "@/utils/page-utils";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import testStudent from "@/api/test/test-student.js";
import sysDict from "@/api/sys/sys-dict.js";
import QDatePicker from "@/components/common/QDatePicker.vue";
import IImageCropper from "@/components/common/IImageCropper.vue";
import {getPath} from "@/api/request.js";

const query = defQuery()
const dialog = defDialog()
const form = defForm(testStudent.new())
const list = defList(() => testStudent.list(query))
const count = asyncRef(() => testStudent.count(query), 0)

const sex = asyncRef(sysDict.getByName("global_sex"), [])

const reload = loadAsyncRef(() => {
  list.loading = true
}, () => {
  list.loading = false
})

function onAdd() {
  form.add(def => def.pid = 0)
  dialog.open("新增测试学生")
}

function onEdit() {
  form.edit(list.select)
  dialog.open("编辑测试学生")
}

function onDel() {
  list.del(testStudent.del, reload)
}

async function onSave() {
  await form.valid()
  dialog.load(async () => {
    await testStudent.put(form.data)
    reload()
  })
}
</script>

<style scoped>

</style>