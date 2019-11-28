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
      return store.state.username
    },
  },
};
</script>
