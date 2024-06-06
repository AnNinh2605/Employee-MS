import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Components/Login/Login.jsx';
import ForgotPassword from './Components/Login/ForgotPassword.jsx';
import ResetPassword from './Components/Login/ResetPassword.jsx'

import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Dashboard/Home.jsx';
import ProtectedRoute from './Components/Dashboard/ProtectedRoute.jsx';
import NotFound from './Components/Dashboard/NotFound.jsx';

import Employee from './Components/Dashboard/Employee.jsx'
import AddEmployee from './Components/Dashboard/AddEmployee.jsx';
import EditEmployee from './Components/Dashboard/EditEmployee.jsx';

import Position from './Components/Dashboard/Position.jsx'
import AddPosition from './Components/Dashboard/AddPosition.jsx';

import Department from './Components/Dashboard/Department.jsx'
import AddDepartment from './Components/Dashboard/AddDepartment.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
                    <Route path='/dashboard' element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }>
                        <Route path='' element={<Home />} />
                        <Route path='/dashboard/employee' element={<Employee />} ></Route>
                        <Route path='/dashboard/add-employee' element={<AddEmployee />} ></Route>

                        <Route path='/dashboard/department' element={<Department />} ></Route>
                        <Route path='/dashboard/add-department' element={<AddDepartment />} ></Route>

                        <Route path='/dashboard/position' element={<Position />} ></Route>
                        <Route path='/dashboard/add-position' element={<AddPosition />} ></Route>

                        <Route path='/dashboard/edit-employee/:_id' element={<EditEmployee />} ></Route>
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter >
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </>
    )
}

export default App
