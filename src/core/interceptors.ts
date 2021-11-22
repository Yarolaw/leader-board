/* eslint-disable no-multi-assign */
import axios from 'axios';

const axiosConfig = {
	baseURL: 'http://coding-test.cube19.io/frontend/v1',
};
const instance = axios.create(axiosConfig);

instance.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 500) {
			return instance(error.config);
		}
		throw error.response;
	}
);
export default instance;
