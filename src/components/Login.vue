<template>
  <div class="login-wrapper">
    <div class="card">
      <div class="header">
        <h1>BBS CORP SURABAYA</h1>
        <p>ERP System v1.0</p>
      </div>

      <h2>Login to your account</h2>

      <form @submit.prevent="handleLogin">
        <label>Username</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your username"
          required
        />

        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div class="extras">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" class="forgot">Forgot password?</a>
        </div>

        <button type="submit" class="login-btn">Sign in</button>
      </form>

      <div v-if="message" class="message">
        {{ message }}
      </div>
    </div>

    <footer>&copy; 2025 BBS Corp Surabaya. All rights reserved.</footer>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,  
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser', 'message']),
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.isLoading = true; 
      this.$store.commit('CLEAR_MESSAGE'); 
      
      try {
        const userData = await this.login({ email: this.email, password: this.password });
        console.log('Login successful, user data:', userData);
        
        if (userData) {
          this.$router.push({ name: 'Beranda' });
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.password = ''; 
        this.$store.commit('SET_MESSAGE', 'Login failed. Please check your credentials.');
      } finally {
        this.isLoading = false;  
      }
    },
  },
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20px;
}
.card {
  background: #fff;
  padding: 40px 30px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
}
.header {
  text-align: center;
  margin-bottom: 24px;
}
.header h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #333;
}
.header p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
h2 {
  font-size: 16px;
  margin: 0 0 20px;
  color: #333;
}
label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #555;
}
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.extras {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 20px;
}
.forgot {
  color: #007bff;
  text-decoration: none;
}
.login-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.login-btn:hover {
  background: #0069d9;
}
.message {
  margin-top: 12px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
}
footer {
  margin-top: 24px;
  font-size: 12px;
  color: #888;
}
</style>