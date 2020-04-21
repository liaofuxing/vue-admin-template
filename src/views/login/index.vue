<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <div class="tips">
        <span style="margin-right:20px;"><a @click="handlePhoneLoginClick">{{ tipsHtml }}</a></span>
      </div>
      <div v-if="usernameLogin" class="username-div">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </div>

      <div v-if="phoneLogin" class="sms-div">
        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="smsCode">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="smsCode"
            v-model="loginForm.smsCode"
            type="text"
            placeholder="请输出验证码"
            name="smsCode"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd">
            <el-button type="primary" :disabled="sendSmsButton" @click="handleSendSmsCodeClick">{{ sendSmsCodeHtml }}</el-button>
          </span>
        </el-form-item>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: liaofuxing</span>
        <span> password: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (this.phoneLogin && value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'liaofuxing',
        password: '123456',
        phone: '',
        smsCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      phoneLogin: false,
      usernameLogin: true,
      tipsHtml: '使用手机号登录',
      sendSmsCodeHtml: '发送验证码',
      sendSmsButton: false,
      totalTime: 60
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.usernameLogin) {
            this.loginForm.username = this.loginForm.username
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            const phonelogin = { phone: this.loginForm.phone, smsCode: this.loginForm.smsCode }
            this.$store.dispatch('user/phoneLogin', phonelogin).then(() => {
              this.$router.push({ path: '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handlePhoneLoginClick() {
      this.$refs.loginForm.resetFields()
      if (this.tipsHtml === '使用手机号登录') {
        this.tipsHtml = '使用用户名登录'
        this.usernameLogin = false
        this.phoneLogin = true
      } else {
        this.tipsHtml = '使用手机号登录'
        this.usernameLogin = true
        this.phoneLogin = false
      }
    },
    handleSendSmsCodeClick() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const phone = this.loginForm.phone
          this.$store.dispatch('user/sendSmsCode', phone)
          this.sendSmsButton = true
          const clock = window.setInterval(() => {
            this.totalTime--
            this.sendSmsCodeHtml = '发送验证码(' + this.totalTime + ')'
            if (this.totalTime < 0) {
              window.clearInterval(clock)
              this.sendSmsCodeHtml = '发送验证码'
              this.totalTime = 60
              this.sendSmsButton = false
            }
          }, 1000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
