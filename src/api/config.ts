import axios from 'axios';

const apiClient = axios.create({
  baseURL: `http://${import.meta.env.VITE_API_BASE_URL}/api`,
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
