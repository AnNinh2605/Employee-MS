import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import adminService from '../../Services/adminService.js';

const Department = () => {
    const [department, setDepartment] = useState([]);

    const fetchDepartmentAndCountEmployee = async () => {
        try {
            const responseServer = await adminService.fetchDepartmentAndCountEmployeeService();

            const responseData = responseServer.data.data;

            setDepartment(responseData);
        } catch (error) {
            toast.error('Error fetching employee by department: ' + error.response.data.message);
        }
    }

    const deleteDepartment = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");

        if(!confirmDelete){
            return;
        }

        try {
            const responseServer = await adminService.deleteDepartmentService(_id);
            
            const updatedDepartment = department.filter(department => department._id !== _id);
            setDepartment(updatedDepartment);

            toast.success(responseServer.data.message);
        } catch (error) {
            toast.error('Delete department error: ' + error.response.data.message);
        }
    }

    useEffect(() => {
        fetchDepartmentAndCountEmployee();
    }, [])

    return (
        <div className='px-5'>
            <div className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Department List</h3>
                </div>
                <Link to="/dashboard/add_department" className='btn btn-success'>Add Department</Link>
            </div>
            <div className='mt-2'>
                <table className="table table-hover border">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col" className='text-center'>Department</th>
                            <th scope="col" className='text-center'>Number of employees</th>
                            <th scope="col" className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {department.map((item, index) => {
                            return (
                                <tr key={`department-${index}`}>
                                    <td>{index + 1}</td>
                                    <td className='text-center'>{item.name}</td>
                                    <td className='text-center'>{item.employeeCount}</td>
                                    <td className='text-center'>
                                        <button className='btn btn-warning btn-sm me-2'>Edit</button>
                                        <button className='btn btn-danger btn-sm'
                                            onClick={() => deleteDepartment(item._id)}
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

export default Department;
