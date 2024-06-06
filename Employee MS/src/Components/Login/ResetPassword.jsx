import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Login.scss'
import validation from '../../utils/validations.js';
import commonService from '../../Services/commonService.js';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { resetToken } = useParams();
    const validateNoSpaces = validation.validateNoSpaces;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const HandleResetPassword = async (data) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }

        try {
            const responseServer = await commonService.resetPasswordService(password, resetToken);

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
            handleSubmit(HandleResetPassword)();
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 col-10 col-md-6 col-xl-4 border rounded bg-light'>
                <h4>Reset Password</h4>
                <hr></hr>

                <form onSubmit={handleSubmit(HandleResetPassword)}>
                    {/* hidden input username for User Accessibility that needs to be supported by tool */}
                    <input type="text" id="username" name="username" aria-label="Tên người dùng" className="visually-hidden" autoComplete="username"/>

                    <div className='form-group position-relative'>
                        <label htmlFor="password" className='form-label'>New password:</label>
                        <input
                            type={showPassword == true ? "text" : "password"}
                            id='password'
                            className='form-control'
                            placeholder="Password"
                            autoComplete="new-password"
                            {...register("password",
                                {
                                    required: "Please enter your password",
                                    minLength: {
                                        value: 3,
                                        message: "Password must have at least 3 characters"
                                    },
                                    validate: validateNoSpaces
                                })
                            }
                            onKeyPress={handleKeyPress}
                        />
                        <div
                            className='position-absolute top-50 end-0'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword == true ?
                                <i className="fa-solid fa-eye text-black pt-2 pe-2"></i> :
                                <i className="fa-solid fa-eye-slash text-black pt-2 pe-2"></i>}
                        </div>
                    </div>
                    {errors.password && <small className='text-warning'>{errors.password.message}</small>}

                    <div className='form-group mt-2 position-relative'>
                        <label htmlFor="confirmPassword" className='form-label'>Confirm password: </label>
                        <input
                            type={showConfirmPassword == true ? "text" : "password"}
                            id='confirmPassword'
                            className='form-control'
                            placeholder="Confirm password"
                            autoComplete="new-password"
                            {...register("confirmPassword",
                                { required: "Please enter again your password", validate: validateNoSpaces })
                            }
                            onKeyPress={handleKeyPress}
                        />
                        <div
                            className='position-absolute top-50 end-0'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword == true ?
                                <i className="fa-solid fa-eye text-black pt-2 pe-2"></i> :
                                <i className="fa-solid fa-eye-slash text-black pt-2 pe-2"></i>}
                        </div>
                    </div>
                    {errors.confirmPassword &&
                        <small className='text-warning'>
                            {errors.confirmPassword.message}
                        </small>}

                    <hr></hr>
                    <div className='mt-2 d-flex justify-content-end'>
                        <button
                            className='btn btn-secondary fs-6 fw-bold me-2'
                            onClick={() => navigate('/')}>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className='btn btn-primary fs-6 fw-bold'>Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
