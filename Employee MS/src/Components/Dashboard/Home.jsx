import { React, useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import adminService from '../../Services/adminService.js';

const Home = () => {
    const [adminCount, setAdminCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [salaryTotal, setSalaryTotal] = useState(0);
    const [listAdmins, setListAdmins] = useState([]);

    const getAdminCount = async () => {
        try {
            const responseServer = await adminService.countAdminService();

            setAdminCount(responseServer.data.data);
        } catch (error) {
            toast.error('Count admin error: ' + error.response.data);
        }
    }

    const getEmployeeCount = async () => {
        try {
            const responseServer = await adminService.countEmployeeService();

            setEmployeeCount(responseServer.data.data);
        } catch (error) {
            toast.error('Count employee error: ' + error.response.data);
        }
    }

    const getSalaryTotal = async () => {
        try {
            const responseServer = await adminService.countTotalSalaryService();

            setSalaryTotal(responseServer.data.data);
        } catch (error) {
            toast.error('Get salary error: ' + error.response.data);
        }
    }

    const getListAdmin = async () => {
        try {
            const responseServer = await adminService.getListAdminService();
            
            setListAdmins(responseServer.data.data)
        } catch (error) {
            toast.error('Get list admin error: ' + error.response.data);
        }
    }

    useEffect(() => {
        getAdminCount();
        getEmployeeCount();
        getSalaryTotal();
        getListAdmin();
    }, [])

    return (
        <div>
            <div className='p-3 d-flex justify-content-around mt-3'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Admin</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h5>Total:</h5>
                        <h5>{adminCount}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Employee</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h5>Total:</h5>
                        <h5>{employeeCount}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Salary</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h5>Total:</h5>
                        <h5>${salaryTotal}</h5>
                    </div>
                </div>
            </div>
            <div className='mt-4 px-5 pt-3'>
                <h3>List of Admins</h3>
                <table className='table border table-hover'>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listAdmins.map((item, index) => (
                                <tr key={`listAdmin-${index}`}>
                                    <td>{item.username}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2">
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm" >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
