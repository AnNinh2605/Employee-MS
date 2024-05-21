import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import adminService from '../../Services/adminService.js';
import validation from '../../utils/validations.js';

const AddPosition = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [department, setDepartment] = useState([]);
 
    const fetchDepartment = async () => {
        try {
            const responseServer = await adminService.fetchDepartmentService();

            const departments = responseServer.data.data;
            setDepartment(departments);
        } catch (error) {
            toast.error('Error fetching department data: ' + error.response.data.message);
        }
    }

    const validateNoSpaces = validation.validateNoSpaces;

    const handleAddPosition = async (data) => {
        try {
            const responseServer = await adminService.addPositionService(data);

            toast.success(responseServer.data.message);
            navigate('/dashboard/position');
        } catch (error) {
            toast.error("Add position error: " + error.response.data.message);
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 w-25 border rounded mt-5'>
                <h2>Add Position</h2>
                <form onSubmit={handleSubmit(handleAddPosition)} className='form-group d-flex flex-column gap-2'>
                    <div className="form-group">
                        <label htmlFor="position"><strong>Position: </strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="position"
                            name="position"
                            placeholder="Position"
                            autoComplete='on'
                            {...register('position',
                                {
                                    required: "Position is required",
                                    validate: validateNoSpaces
                                })}
                        />
                        {errors.position && <small className='text-danger'>{errors.position.message}</small>}
                    </div>
                    <div >
                        <select
                            className='form-select'
                            name="department_id"
                            {...register('department_id',
                                {
                                    required: "Department is required",
                                    validate: validateNoSpaces
                                })}
                        >
                            <option value="">Select department</option>
                            {department.map((item, index) => {
                                return (
                                    <option key={`department_id-${index}`} value={item._id}>{item.name}</option>
                                )
                            })}
                        </select>
                        {errors.department_id && <small className='text-danger'>{errors.department_id.message}</small>}
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddPosition;
