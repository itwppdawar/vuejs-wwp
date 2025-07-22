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
    ...mapActions(['register']),
    async handleRegister() {
      try {
        await this.register({ 
          email: this.regEmail, 
          password: this.regPassword 
        });
        this.regEmail = '';
        this.regPassword = '';
      } catch (error) {
        console.error('Registration failed:', error);
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
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input 
          v-model="regEmail" 
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          v-model="regPassword" 
          type="password" 
          placeholder="Password" 
          required 
        />
        <button type="submit">Register</button>
      </form>
     <div v-if="message" class="message">
      {{ message }}
    </div>
    <router-link to="/">Go to Register</router-link>
    </div>
  </div>
</template>


