import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import adminService from '../../Services/adminService.js';

const Position = () => {
    const [position, setPosition] = useState([]);

    const fetchPositionAndCountEmployee = async () => {
        try {
            const responseServer = await adminService.fetchPositionAndCountEmployeeService();

            const responseData = responseServer.data.data;

            setPosition(responseData);
        } catch (error) {
            toast.error('Error fetching position and count employee: ' + error.response.data.message);
        }
    }

    const deletePosition = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this position?");

        if (!confirmDelete) {
            return;
        }

        try {
            const responseServer = await adminService.deletePositionService(_id);

            const updatedPosition = position.filter(position => position._id !== _id);
            setDepartment(updatedPosition);

            toast.success(responseServer.data.message);
        } catch (error) {
            toast.error('Delete position error: ' + error.response.data.message);
        }
    }

    useEffect(() => {
        fetchPositionAndCountEmployee();
    }, [])

    return (
        <div className='px-5'>
            <div className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Position List</h3>
                </div>
                <Link to="/dashboard/add_position" className='btn btn-success'>Add Position</Link>
            </div>
            <div className='mt-2'>
                <table className="table table-hover border text-center">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Position</th>
                            <th scope="col">Number of employees</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {position.map((item, index) => {
                            return (
                                <tr key={`position-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.employeeCount}</td>
                                    <td>
                                        <button className='btn btn-warning btn-sm me-2'>Edit</button>
                                        <button className='btn btn-danger btn-sm'
                                            onClick={() => deletePosition(item._id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Position;
