import './style.css'
import {createApp} from 'vue'
import router from './router'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import SvgIcon from '@/components/base/SvgIcon.vue'

import App from './App.vue'

import ICard from "@/components/common/ICard.vue"
import IDialog  from "@/components/common/IDialog.vue";
import InputArea  from "@/components/common/InputArea.vue";
import InputCascader  from "@/components/common/InputCascader.vue";
import InputDate  from "@/components/common/InputDate.vue";
import InputForm  from "@/components/common/InputForm.vue";
import InputRadio  from "@/components/common/InputRadio.vue";
import InputSelect  from "@/components/common/InputSelect.vue";
import InputSwitch  from "@/components/common/InputSwitch.vue";
import InputText  from "@/components/common/InputText.vue";
import InputTime  from "@/components/common/InputTime.vue";
import ListFull  from "@/components/common/ListFull.vue";
import ListSize  from "@/components/common/ListSize.vue";
import OperateBar  from "@/components/common/OperateBar.vue";
import OperateItem  from "@/components/common/OperateItem.vue";
import Pager  from "@/components/common/Pager.vue";
import QueryBar  from "@/components/common/QueryBar.vue";
import QueryDataRange  from "@/components/common/QueryDataRange.vue";
import QueryDate  from "@/components/common/QueryDate.vue";
import QueryNumber  from "@/components/common/QueryNumber.vue";
import QuerySelect  from "@/components/common/QuerySelect.vue";
import QueryText  from "@/components/common/QueryText.vue";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale})

app.component("ICard",ICard)
app.component("IDialog",IDialog);
app.component("InputArea",InputArea);
app.component("InputCascader",InputCascader);
app.component("InputDate",InputDate);
app.component("InputForm",InputForm);
app.component("InputRadio",InputRadio);
app.component("InputSelect",InputSelect);
app.component("InputSwitch",InputSwitch);
app.component("InputText",InputText);
app.component("InputTime",InputTime);
app.component("ListFull",ListFull);
app.component("ListSize",ListSize);
app.component("OperateBar",OperateBar);
app.component("OperateItem",OperateItem);
app.component("Pager",Pager);
app.component("QueryBar",QueryBar);
app.component("QueryDataRange",QueryDataRange);
app.component("QueryDate",QueryDate);
app.component("QueryNumber",QueryNumber);
app.component("QuerySelect",QuerySelect);
app.component("QueryText",QueryText);

app.component('SvgIcon',SvgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
