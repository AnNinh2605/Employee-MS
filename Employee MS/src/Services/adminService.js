import axios from 'axios'

const addDepartmentService = (department) => {
    return axios.post('/auth/addDepartment', department );
}

const fetchDepartmentService = () => {
    return axios.get('/auth/department');
}

// position
const fetchPositionService = () => {
    return axios.get('/auth/position');
}
const fetchPositionAndCountEmployeeService = (itemsPerPage, itemOffset) => {
    return axios.get(`/auth/fetchPositionAndCountEmployee?itemsPerPage=${itemsPerPage}&itemOffset=${itemOffset}`);
}
const deletePositionService = (_id) => {
    return axios.delete(`/auth/deletePosition/${_id}`);
}
const addPositionService = (formData) => {
    return axios.post('/auth/addPosition', formData);
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

const searchEmployeeService = (name, position_id, department_id, itemsPerPage) => {
    return axios.get(`/auth/search?name=${name}&position_id=${position_id}&department_id=${department_id}&itemsPerPage=${itemsPerPage}`);
}

const fetchDepartmentAndCountEmployeeService = () => {
    return axios.get('/auth/fetchDepartmentAndCountEmployee');
}

const deleteDepartmentService = (_id) => {
    return axios.delete(`/auth/deleteDepartment/${_id}`);
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

    countAdminService,
    countEmployeeService,
    countTotalSalaryService,
    getListAdminService,
    
    uploadFileService,
    searchEmployeeService,
}