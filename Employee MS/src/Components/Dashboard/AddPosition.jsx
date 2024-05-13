import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import adminService from '../../Services/adminService.js';
import { toast } from 'react-toastify';

const AddPosition = () => {
    const navigate = useNavigate();

    const [department, setDepartment] = useState([]);
    const [formData, setFormData] = useState({
        position: '',
        department_id: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.position || formData.position.trim().length === 0 || !formData.department_id) {
            toast.error("Missing position or department information");
            return;
        }

        try {
            const responseServer = await adminService.addPositionService(formData);

            toast.success(responseServer.data.message);
            navigate('/dashboard/position');
        } catch (error) {
            toast.error("Add position error: " + error.response.data.message);
        }
    }

    const fetchDepartment = async () => {
        try {
            const responseServer = await adminService.fetchDepartmentService();

            const departments = responseServer.data.data;
            setDepartment(departments);
        } catch (error) {
            toast.error('Error fetching department data: ' + error.response.data.message);
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 w-25 border rounded mt-5'>
                <h2>Add Position</h2>
                <form onSubmit={handleSubmit} className='form-group d-flex flex-column gap-2'>
                    <div className="form-group">
                        <label htmlFor="position"><strong>Position: </strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="position"
                            name="position"
                            placeholder="Position"
                            autoComplete='on'
                            value={formData.position}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <select
                        className='form-select'
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Select department</option>
                        {department.map((item, index) => {
                            return (
                                <option key={`department-${index}`} value={item._id}>{item.name}</option>
                            )
                        })}
                    </select>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddPosition;
