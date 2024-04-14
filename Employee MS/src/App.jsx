import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
