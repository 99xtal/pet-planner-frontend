import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const TOKEN = localStorage.getItem("token");
apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + JSON.parse(TOKEN);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const { get, post, patch, delete: destroy } = apiClient;
export { get, post, patch, destroy };
