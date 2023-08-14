import './style.css'
import {createApp} from 'vue'
import router from './router'
import {createPinia} from 'pinia'

import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import SvgIcon from '@/components/base/SvgIcon.vue'

import App from './App.vue'

import ICard from "@/components/common/ICard.vue"
import ITable from "@/components/common/ITable.vue";
import IPage from "@/components/common/IPage.vue";
import IDialog from "@/components/common/IDialog.vue";
import IForm from "@/components/common/IForm.vue";
import ICascader from "@/components/common/ICascader.vue";
import IDatePicker from "@/components/common/IDatePicker.vue";
import IRadio from "@/components/common/IRadio.vue";
import ISwitch from "@/components/common/ISwitch.vue";
import IInput from "@/components/common/IInput.vue";
import ISelect from "@/components/common/ISelect.vue";
import ITreeSelect from "@/components/common/ITreeSelect.vue";
import ITimePicker from "@/components/common/ITimePicker.vue";

import QInput from "@/components/common/QInput.vue";
import QSelect from "@/components/common/QSelect.vue";
import QDatePicker from "@/components/common/QDatePicker.vue";


import OperateBar from "@/components/common/OperateBar.vue";
import OperateItem from "@/components/common/OperateItem.vue";
import QueryBar from "@/components/common/QueryBar.vue";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale: zhCn})

app.component("ICard", ICard)
app.component("ITable", ITable);
app.component("IPage", IPage);
app.component("IDialog", IDialog);
app.component("IForm", IForm);
app.component("ICascader", ICascader);
app.component("IDatePicker", IDatePicker);
app.component("IRadio", IRadio);
app.component("ISwitch", ISwitch);
app.component("IInput", IInput);
app.component("ISelect",ISelect)
app.component("ITreeSelect", ITreeSelect);
app.component("ITimePicker",ITimePicker)

app.component("QInput",QInput)
app.component("QSelect",QSelect)
app.component("QDatePicker",QDatePicker)

app.component("OperateBar", OperateBar);
app.component("OperateItem", OperateItem);
app.component("QueryBar", QueryBar);

app.component('SvgIcon', SvgIcon)

app.mount('#app')
