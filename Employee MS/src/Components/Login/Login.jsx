import React from 'react';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import './Login.scss'

import commonService from '../../Services/commonService.js';
import validation from '../../utils/validations.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateNoSpaces = validation.validateNoSpaces;

    const renderInputField = (label, id, type, errorMessage) => (
        <div className="form-group mb-2">
            <label htmlFor={id}><strong>{label}: </strong></label>
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={label}
                autoComplete='on'
                {...register(id, { required: errorMessage, validate: validateNoSpaces })}
            ></input>
            {errors[id] && <small className='text-warning'>{errors[id].message}</small>}
        </div>
    );

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
                    {renderInputField('Username', 'username', 'text', "Username is required")}
                    {renderInputField('Password', 'password', 'password', "Password is required")}
                    <button type="submit" className="btn btn-primary mt-2 w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
