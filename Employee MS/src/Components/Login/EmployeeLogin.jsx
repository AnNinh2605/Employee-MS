import { React, useState } from 'react';
import axios from 'axios'
import './Login.scss'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const navigate = useNavigate();
    const [inputLogin, setInputLogin] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            let results = await axios.post('http://localhost:3000/employee/login', inputLogin);
            if (results && results.status === 200) {
                localStorage.setItem("access_token", results.data.data.access_token);
                let _id = results.data.data._id;
                navigate(`/employeeDetail/${_id}`);
            }
        } catch (error) {
            let errorMS = error.response.data.message;
            setError(errorMS);
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 w-25 border rounded loginForm'>
                <div className='text-warning'>{error && error}</div>
                <h2>Login Page</h2>
                <form onSubmit={(event) => handleLogin(event)}>
                    <div className="form-group mb-2">
                        <label htmlFor="email"><strong>Email: </strong></label>
                        <input type="email" className="form-control" id="email"
                            placeholder="Email" autoComplete='on'
                            onChange={(event) => setInputLogin({ ...inputLogin, email: event.target.value })}
                        ></input>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" id="password"
                            placeholder="Password" autoComplete='on'
                            onChange={(event) => setInputLogin({ ...inputLogin, password: event.target.value })}
                        ></input>
                    </div>
                    <div className="mb-1">
                        <input type="checkbox" className="me-2" id="checkbox"></input>
                        <label htmlFor="checkbox">You are Agree with terms & Conditions</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeLogin;
