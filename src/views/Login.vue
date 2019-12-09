<template>
	<div class="login">
		<form v-if="!isReg">
			<h1>欢迎来到XXX系统</h1>
			<br/>
			<mt-field label="用户名" placeholder="Input username" v-model="username"></mt-field>
			<mt-field label="密    码" placeholder="Input password" type="password" v-model="password"></mt-field>
			<mt-button size="large" type="primary" @click.prevent="login()" key="login">登录</mt-button>
			<br/>
			<mt-button size="large" type="default" @click.prevent="reg()" key="reg" plain>注册</mt-button>
			<br/>

		</form>
		<div v-else>
			<h1>注册</h1>
			<mt-field label="用户名" placeholder="Input username" v-model="username"></mt-field>
			<mt-field label="用户姓名" placeholder="Input fullname" v-model="fullname"></mt-field>
			<mt-field label="密    码" placeholder="Input password" type="password" v-model="password"></mt-field>
			<mt-field label="电    话" placeholder="Input phone" v-model="phone"></mt-field>
			<mt-radio title="性    别" v-model="sex" :options="sexOptions" align="right">
			</mt-radio>
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
	import axios from "axios";
	import Constants from '@/Constants.vue';

	var login = {
		name: 'login',
		store,
		data() {
			return {
				isReg: false,
				username: '',
				fullname: '',
				password: '',
				phone: '',
				sex: '',
				sexOptions: [{
						label: '男性',
						value: '男'
					},
					{
						label: '女性',
						value: '女'
					}
				]
			};
		},
		methods: {
			login() {
				this.isReg = false;
				if(this.username == "" || this.password == "") {
					MessageBox.alert("账号密码必须输入");
					return;
				}

				// 异步登录
				axios.post(Constants.projectBaseAddress + '/doLoginJSON.html', {
						username: this.username,
						password: this.password
					})
					.then(function(response) {
						var responseData = response.data;
						if(responseData.success) {
							Toast("登录成功");

							window.location.href = Constants.projectBaseAddress + "/index.html";
						} else {
							MessageBox.alert(responseData.msg);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			reg() {
				this.username = '';
				this.password = '';
				this.isReg = true;
			},
			addUser() {
				if(this.username == '' || this.password == '' || this.fullname == '' || this.phone == '' || this.sex == '') {
					MessageBox.alert("请检查必填字段!!!");
					return;
				}

				// 异步注册
				axios.post(Constants.projectBaseAddress + '/user/doAddUserJSON.html', {
						username: this.username,
						fullname: this.fullname,
						password: this.password,
						phone: this.phone,
						sex: this.sex,
					})
					.then(function(response) {
						var responseData = response.data;
						if(responseData.success) {
							login.isReg = false;
							
							Toast("注册成功");
						} else {
							MessageBox.alert(responseData.msg);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			cancel() {
				this.isReg = false;
			}
		},
	};

	export default login;
</script>