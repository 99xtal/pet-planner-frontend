import axios from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

const apiClient = axios.create({
  baseURL: VITE_API_BASE_URL,
});

const TOKEN = localStorage.getItem('token');
apiClient.interceptors.request.use(
  (config) => {
    if (config.headers && TOKEN) {
      config.headers.Authorization = 'Bearer ' + JSON.parse(TOKEN);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const { get, post, patch, delete: destroy } = apiClient;
export { get, post, patch, destroy };
