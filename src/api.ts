import axios, {AxiosError, AxiosResponse} from 'axios';
import {Alert} from 'react-native';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  responseType: 'json',
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    const status = err.response?.status || 500;
    Alert.alert('Oops, something went wrong, try again');

    switch (status) {
      // authentication (token related issues)
      case 401: {
        return Promise.reject(err);
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(err);
      }

      // bad request
      case 400: {
        return Promise.reject(err);
      }

      // not found
      case 404: {
        return Promise.reject(err);
      }

      // conflict
      case 409: {
        return Promise.reject(err);
      }

      // unprocessable
      case 422: {
        return Promise.reject(err);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(err);
      }
    }
  },
);
