
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthExample',
  data() {
    return {
      email: '',
      password: '',
      regEmail: '',
      regPassword: ''
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser', 'message'])
  },
  methods: {
    ...mapActions(['login', 'logout', 'register']),
    async handleLogin() {
      try {
        await this.login({ 
          email: this.email, 
          password: this.password 
        });
        this.email = '';
        this.password = '';
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  }
};
</script>

<style scoped>
.message {
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>

<template>
  <div>
    <div v-if="!isLoggedIn">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    <div v-if="message" class="message">
      {{ message }}
    </div>
    <router-link to="/signup">Go to SignUp</router-link>
  </div>
  </div>
</template>
