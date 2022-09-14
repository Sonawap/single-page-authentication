import axios from 'axios'
import { API_BASE_URL, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN, REDIRECT_PATH, REFRESH_TOKEN } from 'redux/constants/Auth'

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN);
	const sessionToken = sessionStorage.getItem(AUTH_TOKEN);
	
	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
	}else{
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${sessionToken}`
	}

	// if (!jwtToken && !sessionToken && !config.headers[PUBLIC_REQUEST_KEY]) {
	// 	history.push(ENTRY_ROUTE)
	// 	window.location.reload();
	// }

  return config
}, 
(error) => {
	// Do something with request error here
  Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, 
async (error) => {
	// Remove token and redirect 
	const originalConfig = error.config;
	if (originalConfig.url !== "/auth/signin" && error.response) {
		if (error.response?.status === 401) {
			if(localStorage.getItem(REFRESH_TOKEN)){
				const data = {
					refreshToken: localStorage.getItem(REFRESH_TOKEN)
				};
				try {
					const response = await service.post(`${API_BASE_URL}/auth/token`, data);
					const { accessToken } = response.data;
					localStorage.setItem(AUTH_TOKEN, accessToken);
					return service(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}else{
				localStorage.removeItem(AUTH_TOKEN);
				localStorage.removeItem(REFRESH_TOKEN);
				localStorage.removeItem(REDIRECT_PATH);
				history.push(`${AUTH_PREFIX_PATH}/login`);
				window.location.reload();
				return Promise.reject(error);
			}
		}
	}
	return Promise.reject(error);

});

export default service