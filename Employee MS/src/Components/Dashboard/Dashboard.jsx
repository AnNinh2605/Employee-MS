import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

import commonService from '../../Services/commonService';

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await commonService.logoutService();

            localStorage.removeItem("accessToken");
            navigate('/');
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    }

    const refreshToken = async () => {
        try {
            const responseServer = await commonService.refreshTokenService();
            const accessToken = responseServer.data.data.accessToken;
            const decodedToken = jwtDecode(accessToken);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: decodedToken
            })
            
            localStorage.setItem("accessToken", accessToken);
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken();
        }, 14 * 60 * 1000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap min-vh-100">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-1 pt-2 text-white">
                        <Link
                            to="/dashboard"
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className="fs-5 fw-bolder d-none d-sm-inline">
                                EmployeeMS
                            </span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/dashboard"
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/employee"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">
                                        Manage Employees
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/position"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-person ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Manage Positions</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/department"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-columns ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Manage Departments</span>
                                </Link>
                            </li>
                            <li className="w-100" onClick={() => handleLogout()}>
                                <Link
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col p-0">
                    <div className="p-2 d-flex justify-content-center bg-light shadow sticky-top">
                        <h4 className='fs-4'>Employee Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
