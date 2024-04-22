import axios from 'axios'

const addCategoryService = (category) => {
    return axios.post('/auth/addCategory', { category });
}

const fetchCategoryService = () => {
    return axios.get('/auth/category');
}

const addEmployeeService = (formData) => {
    return axios.post('/auth/addEmployee', formData);
}

const fetchEmployeeByIdService = (_id) => {
    return axios.get(`/auth/employee/${_id}`);
}

const editEmployeeService = (_id, employee) => {
    return axios.put(`/auth/editEmployee/${_id}`, employee);
}

const fetchEmployeeService = () => {
    return axios.get('/auth/employee');
}

const deleteEmployeeService = (_id) => {
    return axios.delete(`/auth/deleteEmployee/${_id}`);
}

const countAdminService = () => {
    return axios.get('/auth/adminCount');
}

const countEmployeeService = () => {
    return axios.get('/auth/employeeCount');
}

const countTotalSalaryService = () => {
    return axios.get('/auth/salaryTotal')
}

const getListAdminService = () => {
    return axios.get('/auth/listAdmin');
}

export default {
    addCategoryService,
    fetchCategoryService,
    addEmployeeService,
    fetchEmployeeByIdService,
    editEmployeeService,
    fetchEmployeeService,
    deleteEmployeeService,
    countAdminService,
    countEmployeeService,
    countTotalSalaryService,
    getListAdminService
}