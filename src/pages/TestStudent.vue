<template>
  <section>
    <i-card padding="0 16px">
      <operate-bar @refresh="reload">
        <operate-item type="primary" icon="add" label="新增" @click="onAdd"/>
        <operate-item type="success" icon="edit" label="编辑" :disabled="!list.select" @click="onEdit"/>
        <operate-item type="danger" icon="del" label="删除" :disabled="!list.select" @click="onDel"/>
      </operate-bar>
    </i-card>
    <i-card fill margin="4px 0" padding="0 16px">
      <i-table :list="list" sort="sort" tree>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column prop="stay" label="是否在校"/>
        <el-table-column prop="score" label="成绩"/>
        <el-table-column prop="birthday" label="生日"/>
        <el-table-column prop="schoolDismissalTime" label="放学时间"/>
        <el-table-column prop="registrationTime" label="注册时间"/>
      </i-table>
    </i-card>
    <i-card padding="10px 16px">
      <i-page :page="query.page" :total="total" @refresh="reload"/>
    </i-card>
    <i-dialog :dialog="dialog" @save="onSave">
      <i-form :form="form">
        <i-input v-model="form.data.name" prop="name" label="姓名" required/>
        <i-input v-model="form.data.age" prop="age" label="年龄" number/>
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
import testStudent from "@/api/test/test-student.js";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import IInput from "@/components/common/IInput.vue";
import ISwitch from "@/components/common/ISwitch.vue";
import IDatePicker from "@/components/common/IDatePicker.vue";
import ITimePicker from "@/components/common/ITimePicker.vue";

const query = defQuery()
const dialog = defDialog()
const form = defForm(testStudent.new())
const list = defList(() => testStudent.list(query))
const total = asyncRef(() => testStudent.total(), 0)


const reload = loadAsyncRef(() => {
  dialog.loading = true
}, () => {
  dialog.loading = false
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
  if (!await form.valid()) return
  dialog.loading = true
  await testStudent.put(form.data)
  dialog.close()
  reload()
}
</script>

<style scoped>

</style>