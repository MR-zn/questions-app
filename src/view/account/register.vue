<template>
  <div>
    <header class="mui-bar mui-bar-nav cblue">
			<router-link to="/account/login" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">注册</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label class="phone"></label>
					<input id='phone' type="text" class="mui-input-clear mui-input" placeholder="请输入常用手机号" maxlength="11" v-model="phone">
				</div>
				<div class="mui-input-row">
					<label class="code"></label>
					<input id='code' type="text" class="mui-input-clear mui-input" placeholder="请输入验证码" maxlength="6" v-model="code">
					<sendsms :phone="this.phone"></sendsms>
				</div>
				<div class="mui-input-row">
					<label class="pwd"></label>
					<input id='pwd' type="password" class="mui-input-clear mui-input" placeholder="请输入6-14位密码" maxlength="14" v-model="pwd">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="register">注册</button>
			</div>
		</div>
  </div>
</template>

<script>
// 引入发送验证码组件
import sendsms from '@components/sendsms.vue'
import { Message } from 'element-ui'

export default {
  components: {
    sendsms
  },
  data() {
    return {
      phone: '',
      code: '',
      pwd: ''
    }
  },
  mounted() {

  },
  methods: {
    tips(msg) {
      Message({
        message: msg,
        type: 'error',
        duration: 3000
      })
    },
    register() {
      if (!this.$reg.checkPhone(this.phone)) {
        this.tips('手机号格式错误')
      } else if (this.code === '') {
        this.tips('请输入验证码')
      } else if (!this.$reg.checkPwd(this.pwd)) {
        this.tips('密码格式错误, 请输入六位以上数组加密码')
      } else {
        this.registerRequest()
      }
    },
    registerRequest() {
      this.$api.register.register(this.code, this.phone, this.pwd)
        .then(res => {
          // console.log(res.data)
          if (res.data.message === '验证码未填写') {
            this.tips('请填写验证码')
            return
          } else if (res.data.message === '验证码错误') {
            this.tips('验证码错误')
            return
          } else if (res.data.message === '该手机号已被注册') {
            this.tips('该手机号已被注册')
            return
          } else if (res.data.message === '注册成功') {
            this.$message({
              message: '注册成功',
              type: 'success',
              center: true
            })
            // res.data.data.api_token    token结构保存
            this.$router.push({ path: '/account/login' })
          }
        })
        .catch((error) => {
          // console.log(error.data)
          // console.log(error.data.errors.phone[0])
          if (error.data.errors.phone[0] === 'The phone format is invalid.') {
            this.tips('手机号格式错误')
            return
          } else if (error.data.errors.password[0] === 'The password must be at least 6 characters.') {
            this.tips('密码至少为6位')
            return
          }
        })
    }
  }
}
</script>


<style scoped src="@css/common-css.css">
</style>
<style scoped src="@css/mui.min.css">
</style>
<style scoped src="@css/reg-forgetPwd-common.css">
</style>

<style scoped>

header {
	z-index: 101 !important;
}

.mui-content {
  background: url("~@img/login-bg.png");
  background-color: #efeff4;
  height: 100%;
  width: 100%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center 25%;
  z-index: 100;
  position: absolute;
}

.mui-input-row label {
  width: 22%;
  padding: 25px 15px;
}

.mui-input-row label ~ input {
  width: 78%;
  height: 50px;
  color: #ffffff !important;
}

#getCode {
  top:15px;
}

</style>
