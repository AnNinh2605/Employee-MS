import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import adminService from '../../Services/adminService.js';
import validation from '../../utils/validations.js';

const AddDepartment = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateNoSpaces = validation.validateNoSpaces;
   
    const handleAddDepartment = async (data) => {
        try {
            const responseServer = await adminService.addDepartmentService(data);

            toast.success(responseServer.data.message);
            navigate('/dashboard/department');
        } catch (error) {
            toast.error("Add department error: " + error.response.data.message);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 w-25 border rounded mt-5'>
                <h2>Add Department</h2>
                <form onSubmit={handleSubmit(handleAddDepartment)}>
                    <div className="form-group mb-2">
                        <label htmlFor="department"><strong>Department: </strong></label>
                        <input
                            type="text"
                            className="form-control my-2"
                            id="department"
                            placeholder="Department"
                            autoComplete='on'
                            name="department"
                            {...register('department',
                                {
                                    required: "Department is required",
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.department && <small className='text-danger'>{errors.department.message}</small>}
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddDepartment;
