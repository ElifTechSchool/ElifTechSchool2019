import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1/";

const token = localStorage.getItem("user-token");

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
};