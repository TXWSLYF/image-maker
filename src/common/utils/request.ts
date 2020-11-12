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
    const { code, msg } = response.data;

    if (code !== 0) {
      const error = new Error(msg);
      console.error(error);

      return Promise.reject(error);
    }

    return response;
  },
  (error) => {
    console.error(error);

    return Promise.reject(error);
  },
);

export default request;
