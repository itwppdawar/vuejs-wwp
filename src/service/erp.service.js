import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "https://dpkp-lumajang.ghani.my.id/api/";
// const API_URL = "http://127.0.0.1:8000/api/";
// const API_URL = "https://dpkp-backend-lumajang.jh-beon.cloud/api/";
// const API_URL = "https://trial-dpkp-lumajang.polinema.web.id/api/";
const API_URL = import.meta.env.VITE_URL_API;


const salesOrder = () => {
  const url = `${API_URL}sales-order`;
  return axios.get(url, { headers: authHeader() });
};

const salesReport = () => {
  const url = `${API_URL}sales-report`;
  return axios.get(url, { headers: authHeader() });
};

const salesRequest = () => {
  const url = `${API_URL}sales-request`;
  return axios.get(url, { headers: authHeader() });
};

const salesQuotation = () => {
  const url = `${API_URL}sales-quotation`;
  return axios.get(url, { headers: authHeader() });
};


export default {
  salesOrder,
  salesReport,
  salesRequest,
  salesQuotation
};
