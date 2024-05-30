import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import adminService from '../../Services/adminService.js';
import validation from '../../utils/validations.js'

const EditEmployee = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    const { _id } = useParams();

    const selectedDepartment = watch('department_id');     // track changing value of department input

    //filteredPositions to show positions based on department
    const [filteredPositions, setFilteredPositions] = useState([]);

    const [department, setDepartment] = useState([]);
    const [position, setPosition] = useState([]);

    const formatDateTo_yyyymmdd = (dateString) => {
        return dateString.slice(0, 10);
    }

    const validateNoSpaces = validation.validateNoSpaces;

    const validateNonNegative = (value) => {
        return (value < 0) ? 'Salary cannot be negative' : true;
    };

    const fetchEmployeeById = async () => {
        try {
            const results = await adminService.fetchEmployeeByIdService(_id);

            const data = results.data.data;

            const listEmployee = {
                ...data,
                dob: formatDateTo_yyyymmdd(data.dob),
                start_date: formatDateTo_yyyymmdd(data.start_date)
            }

            // set value for react hook form
            Object.keys(listEmployee).forEach(key => {
                setValue(key, listEmployee[key]);
            })
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

    const handleEditEmployee = async (data) => {
        const validate = validation.dateValidation(data);

        if (validate) {
            try {
                //remove email from data before sent to server
                const { _id, ...dataEmployee } = data;

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


    useEffect(() => {
        if (selectedDepartment) {
            const filtered = position.filter(position => position.department_id === selectedDepartment);
            setFilteredPositions(filtered);
        }
    }, [selectedDepartment]);

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="py-3 px-sm-5 px-3 col-10 rounded border">
                <h3 className="text-center">Edit Employee</h3>
                <form
                    className="row g-1 d-flex justify-content-between"
                    onSubmit={handleSubmit(handleEditEmployee)}>
                    <div className="col-12 col-md-5">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter username"
                            {...register('name',
                                { required: "Username is required", validate: validateNoSpaces })}
                        />
                        {errors.name && <small className='text-danger'>{errors.name.message}</small>}
                    </div>
                    <div className="col-12 col-md-5">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            {...register('email',
                                {
                                    required: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.email && <small className='text-danger'>{errors.email.message}</small>}
                    </div>
                    <div className="col-12 col-md-5">
                        <label htmlFor="phone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="Enter your phone number"
                            {...register('phone',
                                {
                                    required: "Phone is required",
                                    pattern: /^[0-9]{10,15}$/,
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.phone && <small className='text-danger'>{errors.phone.message}</small>}
                    </div>
                    <div className="col-12 col-md-5">
                        <label htmlFor="salary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="number"
                            min='0'
                            className="form-control"
                            id="salary"
                            placeholder="Enter salary"
                            {...register('salary',
                                {
                                    required: "Salary is required",
                                    validate: { validateNoSpaces, validateNonNegative }
                                })}
                        />
                        {errors.salary && <small className='text-danger'>{errors.salary.message}</small>}
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="1234 Main St"
                            {...register('address',
                                {
                                    required: "Address is required",
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.address && <small className='text-danger'>{errors.address.message}</small>}
                    </div>
                    <div className="col-12 col-md-5">
                        <label htmlFor="department_id" className="form-label">
                            Department
                        </label>
                        <select
                            id="department_id"
                            className="form-select"
                            {...register('department_id',
                                {
                                    required: "Department is required",
                                    validate: validateNoSpaces
                                })}
                        >
                            <option value="">Select department</option>
                            {department.map((item, index) => {
                                return (<option key={`department_id-${index}`} value={item._id}>{item.name}</option>);
                            })}
                        </select>
                        {errors.department_id && <small className='text-danger'>{errors.department_id.message}</small>}
                    </div>
                    <div className="col-12 col-md-5">
                        <label htmlFor="position_id" className="form-label">
                            Position
                        </label>
                        <select
                            id="position_id"
                            className="form-select"
                            {...register('position_id',
                                {
                                    required: "Position is required",
                                    validate: validateNoSpaces
                                })}
                        >
                            <option value="">Select position</option>
                            {filteredPositions.map((item, index) => {
                                return (<option key={`position_id-${index}`} value={item._id}>{item.name}</option>);
                            })}
                        </select>
                        {errors.position_id && <small className='text-danger'>{errors.position_id.message}</small>}
                    </div>
                    <div className="col-12 col-md-5">
                        <label className='form-label' htmlFor="dob">Date of Birth</label>
                        <input
                            className='form-control'
                            id="dob"
                            type='date'
                            {...register('dob',
                                {
                                    required: "DOB is required",
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.dob && <small className='text-danger'>{errors.dob.message}</small>}
                    </div>
                    <div className="col-12 col-md-5 mb-3">
                        <label className='form-label' htmlFor='start_date'>Start date</label>
                        <input
                            className='form-control'
                            id="start_date"
                            type='date'
                            {...register('start_date',
                                {
                                    required: "Start_date is required",
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.start_date && <small className='text-danger'>{errors.start_date.message}</small>}
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <button type="submit" className="btn btn-primary w-100">
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
