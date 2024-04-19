import axios from "axios";

const axiosConfig = () => {
    // axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.post['Content-Type'] = 'application/json';

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}

export default axiosConfig