import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:3000/api",
});

APIWITHTOKEN.interceptors.request.use((config) => {
  const token = localStorage.getItem("thisistoken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export { API, APIWITHTOKEN };