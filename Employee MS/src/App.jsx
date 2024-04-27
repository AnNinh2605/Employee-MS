import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login.jsx';
import Home from './Components/Dashboard/Home.jsx';
import Employee from './Components/Dashboard/Employee.jsx'
import EmployeeDetail from './Components/Dashboard/EmployeeDetail.jsx'
import Category from './Components/Dashboard/Category.jsx'
import Profile from './Components/Dashboard/Profile.jsx'
import AddCategory from './Components/Dashboard/AddCategory.jsx';
import AddEmployee from './Components/Dashboard/AddEmployee.jsx';
import EditEployee from './Components/Dashboard/EditEployee.jsx';
import ProtectedRoute from './Components/Dashboard/ProtectedRoute.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/employeeDetail/:_id' element={<EmployeeDetail />} />
                    <Route path='/dashboard' element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }>
                        <Route path='' element={<Home />} />
                        <Route path='/dashboard/employee' element={<Employee />} ></Route>
                        <Route path='/dashboard/category' element={<Category />} ></Route>
                        <Route path='/dashboard/profile' element={<Profile />} ></Route>
                        <Route path='/dashboard/add_category' element={<AddCategory />} ></Route>
                        <Route path='/dashboard/add_employee' element={<AddEmployee />} ></Route>
                        <Route path='/dashboard/edit_employee/:_id' element={<EditEployee />} ></Route>
                    </Route>
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
