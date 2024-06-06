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

const forgotPasswordService = (email) => {
    return axios.post('/password/forgot', email);
}

const resetPasswordService = (password, resetToken) => {
    return axios.post('/password/reset', { password: password, resetToken: resetToken });
}

export default {
    logoutService,
    loginService,
    refreshTokenService,
    forgotPasswordService,
    resetPasswordService
}