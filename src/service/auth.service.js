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
      Cookies.set("token", response.data.accessToken);
      return response.data;
    })
    .catch((error) => {
      console.error('Login request failed:', error);  
      throw error;  
    });
};

const logout = () => {
  Cookies.remove("user");
  Cookies.remove("loginTime");
  Cookies.remove("token");
  return axios.post(API_URL + "api/v1/user/logout", {}, { headers: authHeader() });
};

export default {
  register,
  login,
  logout,
};
