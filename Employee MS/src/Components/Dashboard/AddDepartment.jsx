import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import adminService from '../../Services/adminService.js';
import { toast } from 'react-toastify';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department, setdepartment] = useState();

    const handleAddDepartment = async (event) => {
        event.preventDefault();

        if (!department || department.trim().length === 0) {
            toast.error("Missing department");
            return;
        }

        try {
            const responseServer = await adminService.addDepartmentService(department);

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
                <form onSubmit={handleAddDepartment}>
                    <div className="form-group mb-2">
                        <label htmlFor="category"><strong>Department: </strong></label>
                        <input
                            type="text"
                            className="form-control my-2"
                            id="category"
                            placeholder="Department"
                            autoComplete='on'
                            name="department"
                            value={department}
                            required
                            onChange={event => setdepartment(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddDepartment;
