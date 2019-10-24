import axios from "axios";
import router from "../router";
import store from "../store/store";

export default function axiosConfig() {
  axios.defaults.baseURL = "http://localhost:3000/api/v1/";
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem("user-token");
      if (token) {
        config.headers["authorization"] = token;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    response => {
      return response;
    },
    async err => {
      const originalRequest = err.config;
      if (err.response.status === 401) {
        const refreshToken = localStorage.getItem("user-refreshToken");
        const res = await axios.post("tokens", { refreshToken: refreshToken });
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("user-token", `${res.data.token}`);
          console.log("seting");
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          // axios.defaults.headers.common[
          //   "authorization"
          // ] = `Bearer ${res.data.token}`;
          return axios(originalRequest);
        }
        if (res.data.message == "jwt expired") {
          console.log("logout");
          store.dispatch("logOut");
          router.push("/login");
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
  );
}
