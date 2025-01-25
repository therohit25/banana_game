import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accesstoken');

    if (accessToken) {
      config.headers['accesstoken'] = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance as unknown as AxiosInstance;
