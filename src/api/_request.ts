import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

request.interceptors.response.use(
  (response) => {
    const { errNo, errMsg } = response.data;

    if (errNo !== 0) {
      return Promise.reject(new Error(errMsg));
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default request;
