import axios, { AxiosInstance } from 'axios';
import store from 'store';
import { invalidateUser } from 'store/slices/utils';
import config from '../../../env.config';

export const baseURL = 'http://127.0.0.1:5050/socialgod/api/';

const request: AxiosInstance = axios.create({
	baseURL: config.api.url,
	withCredentials: true,
});

const requestAdmin: AxiosInstance = axios.create({
	baseURL: config.api.urlAdmin,
	withCredentials: true,
});

const requestClient: AxiosInstance = axios.create({
	baseURL: config.api.urlClient,
	withCredentials: true,
});

const requestGuests: AxiosInstance = axios.create({
	baseURL: config.api.urlGuests,
	headers: {
		contentType: 'application/json',
	},
	withCredentials: true,
});

const instances: AxiosInstance[] = [request, requestAdmin, requestClient, requestGuests];

for (const instance of instances) {
	instance.interceptors.response.use(
		(res) => {
			(res.status === 401 || res.status === 403) && store.dispatch(invalidateUser());
			return res;
		},
		(res) => {
			(res.response.status === 401 || res.response.status === 403) && store.dispatch(invalidateUser());
			throw new Error(res);
		}
	);
}

export { request, requestAdmin, requestClient, requestGuests };
