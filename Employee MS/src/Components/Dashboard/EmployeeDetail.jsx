import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const { _id } = useParams()
    const navigate = useNavigate()

    const getEmployeeDetail = async () => {
        let results = await axios.get(`http://localhost:3000/employee/detail/${_id}`)
        if (results && results.status === 200) {
            let data = results.data.data[0];
            setEmployee(data);
        }
        else {
            alert("Fetch employee detail error");
        }
    }

    useEffect(() => {
        getEmployeeDetail();
    }, [])

    const handleLogout = async () => {
        let results = await axios.post('http://localhost:3000/employee/logout')
        if (results && results.status === 204) {
            localStorage.removeItem("access_token");
            navigate('/');
        }
        else {
            alert("Employee detail logout error");
        }
    }
    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={`http://localhost:3000/Images/${employee.image}`} className='employee_detail_image' />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: ${employee.salary}</h3>
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;
