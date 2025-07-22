import axios from "axios";
import authHeader from "./auth.header.js";
import Cookies from "js-cookie";


const API_URL = import.meta.env.VITE_URL_API


const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        Cookies.set("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("loginTime");
  Cookies.remove("user");
};

const logout1 = () => {
  return axios.post(API_URL + "logout", { headers: authHeader() }).then((response) => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loginTime");
    return response.data;
  });
};

export default {
  register,
  login,
  logout,
  logout1,
};
