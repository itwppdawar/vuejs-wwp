<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthExample',
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser', 'message'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
    }
  }
};
</script>

<template>
    <div>
      <div v-if="!isLoggedIn">
      <h2>Welcome, {{ currentUser }}</h2>
      <button @click="handleLogout">Logout</button>
      </div>
    </div>
</template>

