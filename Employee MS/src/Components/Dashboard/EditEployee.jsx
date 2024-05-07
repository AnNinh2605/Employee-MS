import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

import adminService from '../../Services/adminService.js';
import validation from '../../utils/validations.js'

const EditEmployee = () => {
    const navigate = useNavigate();

    const { _id } = useParams();

    const [department, setDepartment] = useState([]);
    const [position, setPosition] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        phone: "",
        salary: "",
        email: "",
        address: "",
        department_id: "",
        position_id: "",
        dob: "",
        start_date: ""
    });

    const formatDateTo_yyyymmdd = (dateString) => {
        return dateString.slice(0, 10);
    }

    const fetchEmployeeById = async () => {
        try {
            const results = await adminService.fetchEmployeeByIdService(_id);

            const data = results.data.data;

            const listEmployee = {
                ...data,
                dob: formatDateTo_yyyymmdd(data.dob),
                start_date: formatDateTo_yyyymmdd(data.start_date)
            }

            setEmployee(listEmployee);
        } catch (error) {
            toast.error('Error fetching employee data by id: ' + error.response.data.message);
        }
    }

    const fetchDepartment = async () => {
        try {
            const results = await adminService.fetchDepartmentService();

            const data = results.data.data;
            setDepartment(data);
        } catch (error) {
            toast.error('Error fetching department data: ' + error.response.data.message);
        }
    }

    const fetchPosition = async () => {
        try {
            const results = await adminService.fetchPositionService();

            const data = results.data.data;
            setPosition(data);
        } catch (error) {
            toast.error('Error fetching position data: ' + error.response.data.message);
        }
    }

    const handleEditEmployee = async (event) => {
        event.preventDefault();

        const validate = validation.dateValidation(employee);
        
        if (validate) {
            try {
                //remove email from data before sent to server
                const {email, ...dataEmployee} = employee;
                
                const results = await adminService.editEmployeeService(_id, dataEmployee);

                toast.success(results.data.message);
                navigate('/dashboard/employee');
            } catch (error) {
                toast.error('Update employee error: ' + error.response.data.message);
            }
        }
    }

    useEffect(() => {
        fetchDepartment();
        fetchPosition();
        fetchEmployeeById();
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="py-3 px-5 rounded w-75 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1 d-flex justify-content-between" onSubmit={(event) => handleEditEmployee(event)}>
                    <div className="col-5">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Enter name"
                            required
                            value={employee.name}
                            onChange={(event) =>
                                setEmployee({ ...employee, name: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            disabled
                            value={employee.email}
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="inputPhone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="inputPhone"
                            placeholder="Enter phone number"
                            autoComplete='on'
                            required
                            value={employee.phone}
                            onChange={(event) =>
                                setEmployee({ ...employee, phone: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="on"
                            value={employee.salary}
                            onChange={(event) =>
                                setEmployee({ ...employee, salary: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="on"
                            value={employee.address}
                            onChange={(event) =>
                                setEmployee({ ...employee, address: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="department" className="form-label">
                            Department
                        </label>
                        <select name="department" id="department" className="form-select"
                            value={employee.department_id}
                            onChange={(event) => setEmployee({ ...employee, department_id: event.target.value })}>
                            <option value="">Select department</option>
                            {department.map((item, index) => {
                                return <option key={`department-${index}`} value={item._id}>{item.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-5">
                        <label htmlFor="position" className="form-label">
                            Position
                        </label>
                        <select name="position" id="position" className="form-select"
                            value={employee.position_id}
                            onChange={(event) => setEmployee({ ...employee, position_id: event.target.value })}>
                            <option value="">Select position</option>
                            {position.map((item, index) => {
                                return <option key={`position-${index}`} value={item._id}>{item.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-5">
                        <label className='form-label' htmlFor="dob">Date of Birth</label>
                        <input
                            className='form-control'
                            id="dob"
                            required
                            type='date'
                            value={employee.dob}
                            onChange={(event) => setEmployee({ ...employee, dob: event.target.value })}
                        />
                    </div>
                    <div className="col-5 mb-3">
                        <label className='form-label'>Start date</label>
                        <input
                            className='form-control'
                            id="dob"
                            required
                            type='date'
                            value={employee.start_date}
                            onChange={(event) => setEmployee({ ...employee, start_date: event.target.value })}
                        />
                    </div>
                    <div className="col-6 mx-auto">
                        <button type="submit" className="btn btn-primary w-100">
                            Save Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
