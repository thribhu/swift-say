import axios from 'axios';
import { config } from '../Setting';
const CasdoorUrl =
  process.env.REACT_APP_CASDOOR_URL || 'https://milana.casdoor.com/api/';
const ClientId = process.env.REACT_APP_CASDOOR_CLIENT || config.clientId;
const ClientSecret = process.env.REACT_APP_CASDOR_SECRET || config.secret;
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

const getSessionState = () => {
  const token = sessionStorage.getItem('token');
  const refreshToken = sessionStorage.getItem('refreshToken');
  return { token, refreshToken };
};
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = getSessionState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = getSessionState();
    if (error.response && error.response.status === 401) {
      try {
        if (error.response.status === 401) {
          const { access_token, refresh_token } = await axios
            .post(`${CasdoorUrl}login/oauth/refresh_token`)
            .send({
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
              client_id: ClientId,
              client_secret: ClientSecret,
            });
          if (access_token && refreshToken) {
            axiosInstance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${access_token}`;
            sessionStorage.setItem('refreshToken', refresh_token);
            return axiosInstance(error.config);
          } else {
            throw error('Failed to get refesh token');
          }
        }
        return axiosInstance;
      } catch (err) {
        console.error('Failed to refresh token:', err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
