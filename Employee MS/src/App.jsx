import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Dashboard/Home.jsx';
import ProtectedRoute from './Components/Dashboard/ProtectedRoute.jsx';
import NotFound from './Components/Dashboard/NotFound.jsx';

import Employee from './Components/Dashboard/Employee.jsx'
import AddEmployee from './Components/Dashboard/AddEmployee.jsx';
import EditEployee from './Components/Dashboard/EditEployee.jsx';

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
                    <Route path='/dashboard' element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }>
                        <Route path='' element={<Home />} />
                        <Route path='/dashboard/employee' element={<Employee />} ></Route>
                        <Route path='/dashboard/department' element={<Department />} ></Route>
                        <Route path='/dashboard/position' element={<Position />} ></Route>
                        <Route path='/dashboard/add_position' element={<AddPosition />} ></Route>
                        
                        <Route path='/dashboard/add_department' element={<AddDepartment />} ></Route>
                        <Route path='/dashboard/add_employee' element={<AddEmployee />} ></Route>
                        <Route path='/dashboard/edit_employee/:_id' element={<EditEployee />} ></Route>
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
