<template>
  <div class="login">
    <form v-if="!isReg">
      <h1>欢迎来到XXX系统</h1>
      <br/>
      <mt-field label="用户名" placeholder="Input username" v-model="name"></mt-field>
      <mt-field label="密    码" placeholder="Input password" type="password" v-model="password"></mt-field>
     	<mt-button size="large" type="primary" @click.prevent="login()" key="login">登录</mt-button>
 	 		<br/>
     	<mt-button size="large" type="default" @click.prevent="reg()" key="reg" plain>注册</mt-button>
      <br/>
   
    </form>
    <div v-else>
      <h1>注册</h1>
      <br/>
      <br/>
      <mt-field label="用户名" placeholder="Input username" v-model="name"></mt-field>
      <mt-field label="密    码" placeholder="Input password" type="password" v-model="password"></mt-field>
      <mt-field label="密    码" placeholder="Input passwordRepeat" type="password" v-model="passwordRepeat"></mt-field>
     	<mt-button size="large" type="primary" @click="addUser()" key="doReg">注册</mt-button>
 	 		<br/>
     	<mt-button size="large" type="default" @click="cancel()" key="cancel" plain>取消</mt-button>
    </div>

  </div>
</template>

<script>
import store from '@/store';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
  name: 'login',
  store,
  data() {
    return {
      isReg: false,
      name: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.isReg = false;
      var nameLocal = localStorage.getItem("name");
      var passwordLocal = localStorage.getItem("password");
      if (nameLocal == '' || passwordLocal == '') {
      	MessageBox.alert("您还没注册!", "title");
        return;
      }

      if (nameLocal === this.name && passwordLocal === this.password) {
        store.dispatch("setLoginUsernameFun", nameLocal);
        Toast("登录成功");
        this.$router.push('/home')
        return false;
      }
      
      MessageBox.alert("账号密码错误");
    },
    reg() {
      this.name = '';
      this.password = '';
      this.passwordRepeat = '';
      this.isReg = true;
    },
    addUser() {
       if (this.name == '' || this.password == '') {
 				 MessageBox.alert("必填用户名密码!!!");
         return;
       }

      if (this.password !== this.passwordRepeat) {
        MessageBox.alert("两次密码不一致!!!");
        return;
      }

      localStorage.setItem("name", this.name);
      localStorage.setItem("password", this.password);
      this.name = '';
      this.password = '';
      this.isReg = false;
      Toast("注册成功");
    },
    cancel() {
      this.isReg = false;
    }
  },
};
</script>