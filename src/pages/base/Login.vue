<template>
  <div class="content">
    <i-card v-loading="loading" class="container" padding="32px">
      <span id="title">
        <svg-icon icon="sprout" style="width: 28px;height: 28px"/>
        <span style="margin-left: 8px">{{ title }}</span>
      </span>
      <i-form :form="form" show-message>
        <i-input v-model="form.data.name" prop="name" label="用户名" :length="16" required/>
        <i-input v-model="form.data.password" prop="password" label="密码" :length="16" :error="pwdError" required
                 password/>
        <i-input v-model="form.data.captcha" prop="captcha" label="验证码" :length="4" :error="captchaError" required>
          <template #append>
            <el-image class="captcha" :src="captcha.img" @click="reload"/>
          </template>
        </i-input>
      </i-form>
      <el-button style="margin-top: 16px" type="primary" :disabled="!canLogin" @click="onLogin">登 录</el-button>
    </i-card>
  </div>
  <login-bg/>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {asyncRef, loadAsyncRef} from "@/utils/vue-utils";
import {defForm} from "@/utils/page-utils";
import sysLogin from "@/api/sys/sys-login.js";
import LoginBg from "@/components/other/LoginBg.vue";
import router from "@/router.js";
import {ElMessage} from "element-plus";

const title = import.meta.env.VITE_APP_TITLE
const captcha = asyncRef(() => sysLogin.captcha(), {})
const form = defForm(sysLogin.new())
const loading = ref(false)
const pwdError = ref(null)
const captchaError = ref(null)

const canLogin = computed(() => {
  if (!form.data.name || form.data.name.length < 4) return false
  if (!form.data.password || form.data.password.length < 4) return false
  return !(!form.data.captcha || form.data.captcha.length < 4);
})

watch(() => form.data.name, () => pwdError.value = null)
watch(() => form.data.password, () => pwdError.value = null)
watch(() => form.data.captcha, () => captchaError.value = null)

async function onLogin() {
  loading.value = true
  form.data.key = captcha.value.key
  try {
    await Promise.all([
      sysLogin.login(form.data),
      // 防止登录过快显得不靠谱....
      new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    ]);
    router.push("/index").then()
  } catch (e) {
    if (e.includes("用户名"))
      pwdError.value = e
    else if (e.includes("验证码"))
      captchaError.value = e
    else
      ElMessage.error(e)
    reload()
    loading.value = false
  }
}

const reload = loadAsyncRef()
</script>

<style>
.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content #title {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.content .container {
  width: fit-content;
  height: fit-content;
}

.content .el-input {
  width: 240px;
}

.content .el-input-group__append {
  padding: 0;
}

.content .captcha {
  height: calc(var(--el-input-height) - 4px);
  width: calc(var(--el-input-height) * 2);
  margin: 0 2px;
}
</style>