import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AddEmployee = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
    });
    const fetchCategory = async () => {
        let results = await axios.get('http://localhost:3000/auth/category');
        if (results && results.status === 200) {
            let data = results.data.data
            setCategory(data);
        }
        else {
            alert("Fetch category error");
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [])
    const handleAddEmployee = async (event) => {
        event.preventDefault();
        // use FormData to convert image to binary data to send request 
        const formData = new FormData();
        formData.append("name", employee.name);
        formData.append("email", employee.email);
        formData.append("password", employee.password);
        formData.append("salary", employee.salary);
        formData.append("address", employee.address);
        formData.append("category_id", employee.category_id);
        formData.append("image", employee.image);
        try {
            let results = await axios.post('http://localhost:3000/auth/addEmployee', formData);
            if (results && results.status === 201) {
                navigate('/dashboard/employee');
            }
        } catch (error) {
            alert("Add employee error");
            console.log("Add employee error", error)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1" onSubmit={(event) => handleAddEmployee(event)}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(event) =>
                                setEmployee({ ...employee, name: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(event) =>
                                setEmployee({ ...employee, email: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            placeholder="Enter Password"
                            onChange={(event) =>
                                setEmployee({ ...employee, password: event.target.value })
                            }
                        />
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            onChange={(event) =>
                                setEmployee({ ...employee, salary: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="on"
                            onChange={(event) =>
                                setEmployee({ ...employee, address: event.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select name="category" id="category" className="form-select"
                            onChange={(event) => setEmployee({ ...employee, category_id: event.target.value })}>
                            <option value="">Select category</option>
                            {category.map((item, index) => {
                                return <option key={`category-${index}`} value={item._id}>{item.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="inputGroupFile01">
                            Select Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile01"
                            name="image"
                            onChange={(event) => setEmployee({ ...employee, image: event.target.files[0] })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
