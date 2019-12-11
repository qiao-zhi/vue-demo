<template>
	<div class="user">
		个人中心。欢迎您: {{getLoginUsername()}}
	</div>
</template>

<script>
	import store from '@/store';

	export default {
		name: 'User',
		store,
		methods: {
			getLoginUsername() {
				var username = localStorage.getItem("username");
				var userfullname = localStorage.getItem("userfullname");
				return userfullname;
			},
		},
	};
</script>