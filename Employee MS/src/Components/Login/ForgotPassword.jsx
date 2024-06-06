import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Login.scss'
import validation from '../../utils/validations.js';
import commonService from '../../Services/commonService.js';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateNoSpaces = validation.validateNoSpaces;

    const HandleForgotPassword = async (data) => {
        try {
            const responseServer = await commonService.forgotPasswordService(data);

            alert(responseServer.data.message);
            navigate('/');
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    }

    // to handle press enter error (error: send form without validate)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(HandleForgotPassword)();
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 col-10 col-md-6 col-xl-4 border rounded bg-light'>
                <h4>Find Your Account</h4>
                <hr></hr>
                <p>Please enter your email to search for your account.</p>

                <form onSubmit={handleSubmit(HandleForgotPassword)}>
                    <div className="form-group">
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            autoComplete='on'
                            placeholder="Email"
                            {...register("email",
                                {
                                    required: "Enter your email.",
                                    validate: validateNoSpaces
                                })
                            }
                            onKeyPress={handleKeyPress}
                        />
                        {errors.email && <small className='text-warning'>{errors.email.message}</small>}
                    </div>

                    <hr></hr>
                    <div className='mt-2 d-flex justify-content-end'>
                        <button
                            className='btn btn-secondary fs-6 fw-bold me-2'
                            onClick={() => navigate('/')}
                        >Cancel
                        </button>

                        <button
                            type="submit"
                            className='btn btn-primary fs-6 fw-bold'
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
