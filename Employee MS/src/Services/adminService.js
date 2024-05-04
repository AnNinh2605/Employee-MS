import axios from 'axios'

const addCategoryService = (category) => {
    return axios.post('/auth/addCategory', { category });
}

const fetchDepartmentService = () => {
    return axios.get('/auth/department');
}

const fetchPositionService = () => {
    return axios.get('/auth/position');
}

const addEmployeeService = (employeeData) => {
    return axios.post('/auth/addEmployee', employeeData);
}

const fetchEmployeeByIdService = (_id) => {
    return axios.get(`/auth/employee/${_id}`);
}

const editEmployeeService = (_id, employee) => {
    return axios.put(`/auth/editEmployee/${_id}`, employee);
}

const fetchEmployeeService = (itemsPerPage, itemOffset) => {
    return axios.get(`/auth/employee?itemsPerPage=${itemsPerPage}&itemOffset=${itemOffset}`);
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

const uploadFileService = (formData) => {
    return axios.post('/auth/upload', formData);
}

export default {
    addCategoryService,
    fetchDepartmentService,
    fetchPositionService,
    addEmployeeService,
    fetchEmployeeByIdService,
    editEmployeeService,
    fetchEmployeeService,
    deleteEmployeeService,
    countAdminService,
    countEmployeeService,
    countTotalSalaryService,
    getListAdminService,
    uploadFileService
}