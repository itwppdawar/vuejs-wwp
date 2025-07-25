import axios from "axios";
import authHeader from "./auth.header.js";
import Cookies from "js-cookie";

const API_URL = process.env.VITE_URL_API || "http://192.168.23.23:3000/"
console.log('API_URL :', API_URL)

const register = (name, email, password) => {
  return axios.post(API_URL + "api/v1/user/register", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "api/v1/user/login", {
      email,
      password,
    }, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Login request failed:', error);  
      throw error;  
    });
};

const logout = () => {
  // First, clear local session/cookies
  Cookies.remove("user");
  Cookies.remove("superadmin");
  Cookies.remove("loginTime");
  // Then, notify the backend
  return axios.post(API_URL + "api/v1/user/logout", {}, { headers: authHeader() });
};

export default {
  register,
  login,
  logout,
};
