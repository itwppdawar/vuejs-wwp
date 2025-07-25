import axios from "axios";
import authHeader from "./auth.header";


const API_URL = process.env.VITE_URL_API || "http://192.168.23.23/:3000/"
console.log('API_URL :', API_URL)

const salesOrder = () => {
  const url = `${API_URL}sales-order`;
  return axios.get(url, { headers: authHeader() });
};

const invoice = () => {
  const url = `${API_URL}invoice`;
  return axios.get(url, { headers: authHeader() });
};

const request = () => {
  const url = `${API_URL}request`;
  return axios.get(url, { headers: authHeader() });
};

const salesQuotation = () => {
  const url = `${API_URL}sales-qoutation`;
  return axios.get(url, { headers: authHeader() });
};


export default {
  salesOrder,
  invoice,
  request,
  salesQuotation
};
