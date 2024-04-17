import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const fetchEmployee = async () => {
        let results = await axios.get('http://localhost:3000/auth/employee');
        if (results && results.status === 200) {
            let data = results.data.data
            setEmployee(data);
        }
        else {
            alert("Fetch employee error");
        }
    }
    const handleDeleteEmployee = async (_id) => {
        let results = await axios.delete(`http://localhost:3000/auth/deleteEmployee/${_id}`);
        if (results && results.status === 204) {
            window.location.reload();
        }
        else {
            alert("Fetch employee error");
        }
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
                <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
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
