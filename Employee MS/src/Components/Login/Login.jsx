import { React } from 'react';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import './Login.scss'

import commonService from '../../Services/commonService.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateNoSpaces = (value) => {
        return value.trim().length === 0 ? "Please enter a valid username or password." : undefined;
    };

    const handleLogin = async (data) => {
        try {
            const responseServer = await commonService.loginService(data);

            const token = responseServer.data.data.access_token;
            const decodedToken = jwtDecode(token);

            if (decodedToken.role === "admin") {
                navigate('/dashboard');
            } else {
                navigate(`/employeeDetail/${decodedToken._id}`);
            }

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: decodedToken
            })

            localStorage.setItem("access_token", token);
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 w-25 border rounded loginForm'>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-group mb-2">
                        <label htmlFor="username"><strong>Username: </strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            autoComplete='on'
                            {...register('username', { required: true, validate: validateNoSpaces })}
                        ></input>
                        {errors.username && <small className='text-warning'>This field is required</small>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            autoComplete='on'
                            {...register('password', { required: true, validate: validateNoSpaces })}
                        ></input>
                        {errors.password && <small className='text-warning'>This field is required</small>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-2 w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
