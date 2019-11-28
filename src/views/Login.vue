<template>
  <div class="login">
    <form v-if="!isReg">
      <h1>欢迎来到XXX系统</h1>
      <br/>
      <br/>
      <div>用户名： <input type="text" v-model="name"/> </div>
      <br/>
      <div>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码： <input type="password" v-model="password"/> </div>
      <div class="rowBtn" @click="login()">登录</div>
      <div class="rowBtn regBtn" @click="reg()">注册</div>
    </form>
    <form v-else>
      <h1>注册</h1>
      <br/>
      <br/>
      <div>用户名： <input type="text" v-model="name"/> </div>
      <br/>
      <div>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码： <input type="password" v-model="password"/> </div>
      <br/>
      <div>确认密码： <input type="password" v-model="passwordRepeat"/> </div>
      <div class="rowBtn" @click="addUser()">注册</div>
      <div class="rowBtn regBtn" @click="cancel()">取消</div>
    </form>

  </div>
</template>

<script>
import store from '@/store';

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
      var passwordLocal = localStorage.getItem("name");
      if (nameLocal == '' || passwordLocal == '') {
        alert("您还没注册!");
        return;
      }

      if (nameLocal === this.name || passwordLocal === this.password) {
        store.dispatch("setLoginUsernameFun", nameLocal);
        this.$router.push('/home')
        return;
      }

      alert("账号或者密码错误");
    },
    reg() {
      this.isReg = true;
    },
    addUser() {
       if (this.name == '' || this.password == '') {
         alert("必填用户名密码!!!");
         return;
       }

      if (this.password !== this.passwordRepeat) {
        alert("两次密码不一致!!!");
        return;
      }

      localStorage.setItem("name", this.name);
      localStorage.setItem("password", this.password);
      this.name = '';
      this.password = '';
      alert("注册成功!");
      this.isReg = true;
    },
    cancel() {
      this.isReg = false;
    }
  },
};
</script>

<style scoped lang="scss">
.rowBtn{
  width: 100%;
  height: 40px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  margin-top: 10px;
  background: #87CEEB;

  &.regBtn{
    background: #20B2AA;
  }
}
</style>
