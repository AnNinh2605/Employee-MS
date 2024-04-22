import axios from 'axios'

const loginService = (inputLogin) => {
    return axios.post('/login', inputLogin);
}
const logoutService = () => {
    return axios.post('/logout')
}

export default { logoutService, loginService }