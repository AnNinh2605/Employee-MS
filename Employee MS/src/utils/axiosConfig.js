import axios from "axios";

// axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axios