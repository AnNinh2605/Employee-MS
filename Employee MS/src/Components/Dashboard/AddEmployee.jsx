import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import adminService from '../../Services/adminService.js';
import validation from '../../utils/validations.js'

const AddEmployee = () => {
    const navigate = useNavigate();

    const [department, setDepartment] = useState([]);
    const [position, setPosition] = useState([]);
    const [employeeInfor, setEmployeeInfor] = useState({
        name: "",
        email: "",
        phone: "",
        salary: "",
        address: "",
        department_id: "",
        position_id: "",
        dob: "",
        start_date: ""
    });

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

    // const handleAddEmployee = async (event) => {
    //     event.preventDefault();
    //     // use FormData to convert image to binary data to send request 
    //     const formData = new FormData();
    //     formData.append("name", employee.name);
    //     formData.append("email", employee.email);
    //     formData.append("password", employee.password);
    //     formData.append("salary", employee.salary);
    //     formData.append("address", employee.address);
    //     formData.append("category_id", employee.category_id);
    //     formData.append("image", employee.image);
    //     try {
    //         let results = await adminService.addEmployeeService(formData);
    //         if (results && results.status === 201) {
    //             navigate('/dashboard/employee');
    //         }
    //     } catch (error) {
    //         //error
    //     }
    // }

    const handleAddEmployee = async (event) => {
        event.preventDefault();

        const validate = validation.dateValidation(employeeInfor);
        
        if(validate){
            try {
                const results = await adminService.addEmployeeService(employeeInfor);
    
                toast.success(results.data.message);
                navigate('/dashboard/employee');
            } catch (error) {
                toast.error('Add employee error: ' + error.response.data.message);
            }
        }
    }

    useEffect(() => {
        fetchDepartment();
        fetchPosition();
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="py-3 px-5 rounded w-75 border">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1 d-flex justify-content-between" onSubmit={(event) => handleAddEmployee(event)}>
                    <div className="col-5">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Enter your name"
                            autoComplete="on"
                            required
                            onChange={(event) =>
                                setEmployeeInfor({ ...employeeInfor, name: event.target.value })
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
                            placeholder="Enter Email"
                            autoComplete="on"
                            required
                            onChange={(event) =>
                                setEmployeeInfor({ ...employeeInfor, email: event.target.value })
                            }
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
                            autoComplete='off'
                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            required
                            onChange={(event) =>
                                setEmployeeInfor({ ...employeeInfor, phone: event.target.value })
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
                            onChange={(event) =>
                                setEmployeeInfor({ ...employeeInfor, salary: event.target.value })
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
                            onChange={(event) =>
                                setEmployeeInfor({ ...employeeInfor, address: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="department" className="form-label">
                            Department
                        </label>
                        <select name="department" id="department" className="form-select"
                            onChange={(event) => setEmployeeInfor({ ...employeeInfor, department_id: event.target.value })}>
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
                            onChange={(event) => setEmployeeInfor({ ...employeeInfor, position_id: event.target.value })}>
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
                            onChange={(event) => setEmployeeInfor({ ...employeeInfor, dob: event.target.value })}
                        />
                    </div>
                    <div className="col-5 mb-3">
                        <label className='form-label'>Start date</label>
                        <input
                            className='form-control'
                            id="dob"
                            required
                            type='date'
                            onChange={(event) => setEmployeeInfor({ ...employeeInfor, start_date: event.target.value })}
                        />
                    </div>
                    {/* <div className="col-12 mb-3 d-none">
                        <label className="" htmlFor="inputGroupFile01">
                            Select Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile01"
                            name="image"
                            onChange={(event) => setEmployeeInfor({ ...employee, image: event.target.files[0] })}
                        />
                    </div> */}
                    <div className="col-6 mx-auto">
                        <button type="submit" className="btn btn-success w-100">
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
