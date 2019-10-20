import axios from "axios";
import router from "../router";

export default function axiosConfig() {
  axios.defaults.baseURL = "http://localhost:3000/api/v1/";
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem("user-token");
      if (token) {
        config.headers["Authorization"] = token;
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
      if (
        err.response.status === 401 &&
        originalRequest.url === axios.defaults.baseURL + "token"
      ) {
        router.push("/");
        return Promise.reject(err);
      }
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("user-refreshToken");
        const res = await axios.post("token", { refreshToken: refreshToken });
        if (res.status === 201) {
          localStorage.setItem("user-token", `Bearer ${res.data.token}`);
          axios.defaults.headers.common[
            "authorization"
          ] = `Bearer ${res.data.token}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(err);
    }
  );
}
