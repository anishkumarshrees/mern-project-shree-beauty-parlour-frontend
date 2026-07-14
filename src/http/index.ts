import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.78:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const APIWITHTOKEN = axios.create({
  baseURL: "http://192.168.1.78:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

APIWITHTOKEN.interceptors.request.use((config) => {
  const token = localStorage.getItem("thisistoken");

  if (token) {
    config.headers.Authorization = token;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export { API, APIWITHTOKEN };
