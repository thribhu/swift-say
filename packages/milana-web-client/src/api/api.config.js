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
	},
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const { refreshToken } = getSessionState();
		if (error.response && error.response.status === 401) {
			try {
				if (error.response.status === 401) {
					let access_token, refresh_token; // Declare the variables in the outer scope
					const resp = await axios.post(
						`${CasdoorUrl}login/oauth/refresh_token`,
						{
							grant_type: 'refresh_token',
							refresh_token: refreshToken,
							scope: 'openid',
							client_id: ClientId,
							client_secret: ClientSecret,
						},
					);
					access_token = resp.data.access_token;
					refresh_token = resp.data.refresh_token;
					if (access_token && refreshToken) {
						axiosInstance.defaults.headers.common[
							'Authorization'
						] = `Bearer ${access_token}`;
						sessionStorage.setItem('refreshToken', refresh_token);
						sessionStorage.setItem('token', access_token);
						return axios(error.config);
					} else {
						throw new Error('Failed to get refesh token');
					}
				}
				return axiosInstance;
			} catch (err) {
				console.error('Failed to refresh token:', err);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
