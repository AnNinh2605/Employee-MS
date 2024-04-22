import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import adminService from '../../Services/adminService.js';

const EditEmployee = (props) => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: ""
    });

    const fetchCategory = async () => {
        let results = await adminService.fetchCategoryService();
        if (results && results.status === 200) {
            let data = results.data.data
            setCategory(data);
        }
        else {
            //error
        }
    }
    const fetchEmployeeById = async () => {
        let results = await adminService.fetchEmployeeByIdService(_id);
        if (results && results.status === 200) {
            let data = results.data.data
            setEmployee(data);
        }
        else {
            //error
        }
    }
    useEffect(() => {
        fetchCategory();
        fetchEmployeeById();
    }, [])

    const handleEditEmployee = async (event) => {
        event.preventDefault();
        try {
            let results = await adminService.editEmployeeService(_id, employee);
            if (results && results.status === 204) {
                navigate('/dashboard/employee');
            }
        } catch (error) {
            //error
            console.log("Update employee error", error)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1" onSubmit={(event) => handleEditEmployee(event)}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(event) =>
                                setEmployee({ ...employee, name: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            onChange={(event) =>
                                setEmployee({ ...employee, email: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
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
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            onChange={(event) => setEmployee({ ...employee, category_id: event.target.value })}
                            value={employee.category_id}
                        >
                            <option value="">Select category</option>
                            {category.map((item, index) => {
                                return (
                                    <option key={`category-${index}`} value={item._id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12">
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
