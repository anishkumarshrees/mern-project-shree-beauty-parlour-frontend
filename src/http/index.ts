import axios from "axios";

const API = axios.create({
  baseURL: "https://shree-beauty-parlour-server.onrender.com/api",
});

const APIWITHTOKEN = axios.create({
  baseURL: "https://shree-beauty-parlour-server.onrender.com/api",
});

APIWITHTOKEN.interceptors.request.use((config) => {
  const token = localStorage.getItem("thisistoken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export { API, APIWITHTOKEN };