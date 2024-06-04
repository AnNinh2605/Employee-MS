import axios from 'axios'

// department service
const fetchDepartmentService = () => {
    return axios.get('/auth/department');
}
const addDepartmentService = (department) => {
    return axios.post('/auth/department', department);
}
const deleteDepartmentService = (_id) => {
    return axios.delete(`/auth/department/${_id}`);
}
const fetchDepartmentAndCountEmployeeService = (itemsPerPage, itemOffset) => {
    return axios.get(`/auth/department/count?itemsPerPage=${itemsPerPage}&itemOffset=${itemOffset}`);
}

// position service
const fetchPositionService = () => {
    return axios.get('/auth/position');
}
const addPositionService = (formData) => {
    return axios.post('/auth/position', formData);
}
const deletePositionService = (_id) => {
    return axios.delete(`/auth/position/${_id}`);
}
const fetchPositionAndCountEmployeeService = (itemsPerPage, itemOffset) => {
    return axios.get(`/auth/position/count?itemsPerPage=${itemsPerPage}&itemOffset=${itemOffset}`);
}

// employee service
const fetchEmployeeService = (itemsPerPage, itemOffset) => {
    return axios.get(`/auth/employee?itemsPerPage=${itemsPerPage}&itemOffset=${itemOffset}`);
}
const fetchEmployeeByIdService = (_id) => {
    return axios.get(`/auth/employee/${_id}`);
}
const addEmployeeService = (employeeData) => {
    return axios.post('/auth/employee', employeeData);
}
const editEmployeeService = (_id, employee) => {
    return axios.put(`/auth/employee/${_id}`, employee);
}
const deleteEmployeeService = (_id) => {
    return axios.delete(`/auth/employee/${_id}`);
}
const searchEmployeeService = (name, position_id, department_id, itemsPerPage, itemOffset) => {
    return axios.get(`/auth/employee/search?name=${name}&position_id=${position_id}&department_id=${department_id}&itemsPerPage=${itemsPerPage}&itemOffset=${itemOffset}`);
}

// dashboard service
const countAdminService = () => {
    return axios.get('/auth/dashboard/adminCount');
}
const countEmployeeService = () => {
    return axios.get('/auth/dashboard/employeeCount');
}
const countTotalSalaryService = () => {
    return axios.get('/auth/dashboard/salaryTotal')
}
const getListAdminService = () => {
    return axios.get('/auth/dashboard/listAdmin');
}

// upload file service
const uploadFileService = (formData) => {
    return axios.post('/auth/upload', formData);
}

export default {
    addDepartmentService,
    fetchDepartmentService,
    deleteDepartmentService,
    fetchDepartmentAndCountEmployeeService,

    fetchPositionService,
    fetchPositionAndCountEmployeeService,
    deletePositionService,
    addPositionService,

    addEmployeeService,
    fetchEmployeeByIdService,
    editEmployeeService,
    fetchEmployeeService,
    deleteEmployeeService,
    searchEmployeeService,

    countAdminService,
    countEmployeeService,
    countTotalSalaryService,
    getListAdminService,

    uploadFileService,
}