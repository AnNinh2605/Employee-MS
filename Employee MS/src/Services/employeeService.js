import axios from 'axios'

const getEmployeeDetailService = (_id) => {
    return axios.get(`/employee/employeeDetail/${_id}`);
}

export default { getEmployeeDetailService }