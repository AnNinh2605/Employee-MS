import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import './style.scss'

import adminService from '../../Services/adminService.js';

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const [dataExport, setDataExport] = useState([]); //state to save data to export

    const fetchEmployee = async () => {
        let results = await adminService.fetchEmployeeService();
        if (results && results.status === 200) {
            let data = results.data.data
            setEmployee(data);
        }
        else {
            //error
        }
    }

    const handleDeleteEmployee = async (_id) => {
        let results = await adminService.deleteEmployeeService(_id);
        if (results && results.status === 204) {
            window.location.reload();
        }
        else {
            //error
        }
    }

    const importData = async (event) => {
        if (!event.target || !event.target.files[0] || event.target.files[0].type !== 'text/csv') {
            toast.error("Please select CSV file to import");
            return;
        }

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const results = await adminService.uploadFileService(formData);
            if (results && results.status === 201) {
                window.location.reload();
                toast.success(results.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const exportToCSV  = async (event, done) => {
        if (!employee || employee.length === 0) {
            toast.error("No data to export");
            return;
        }
        
        const results = employee.map((item) => {
            let {_id, image, ...processingData} = item;
            return processingData;
        })

        setDataExport(results);
        done();
    }

    useEffect(() => {
        fetchEmployee();
    }, [])

    return (
        <div className='px-5'>
            <div className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Employee List</h3>
                </div>
                <div className='d-flex justify-content-between'>
                    <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
                    <div>
                        <label className='btn btn-primary me-2' htmlFor='import'>Import</label>
                        <input type="file" id='import' onChange={(event) => importData(event)} hidden />
                        <CSVLink
                            data={dataExport}
                            filename={"data.csv"}
                            className="btn btn-warning"
                            asyncOnClick={true}
                            onClick={exportToCSV}
                        >
                            Export
                        </CSVLink>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <table className="table table-hover border">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((item, index) => {
                            return (
                                <tr key={`employee-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td><img src={`http://localhost:3000/Images/${item.image}`} className='employee_image'></img></td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.salary}</td>
                                    <td>
                                        <Link to={`/dashboard/edit_employee/${item._id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                                        <button className='btn btn-danger btn-sm' onClick={() => handleDeleteEmployee(item._id)}>Delete</button>
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

export default Employee;
