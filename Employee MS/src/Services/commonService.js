import axios from 'axios'

const loginService = (inputLogin) => {
    return axios.post('/login', inputLogin);
}

const logoutService = () => {
    return axios.post('/logout')
}

const refreshTokenService = () => {
    return axios.post('/refresh-token');
}

export default { logoutService, loginService, refreshTokenService }