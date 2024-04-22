import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import adminService from '../../Services/adminService.js';

const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    const handleAddCategory = async (event) => {
        event.preventDefault();
        if (!category || category.trim().length === 0) {
            alert("Missing category");
            return;
        }
        try {
            let results = await adminService.addCategoryService(category);
            if (results && results.status === 201) {
                navigate('/dashboard/category');
            }
        } catch (error) {
            //error
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 w-25 border rounded loginForm'>
                <h2>Add Category</h2>
                <form onSubmit={(event) => handleAddCategory(event)}>
                    <div className="form-group mb-2">
                        <label htmlFor="category"><strong>Category: </strong></label>
                        <input type="text" className="form-control" id="category"
                            placeholder="Category" autoComplete='on' required
                            onChange={event => setCategory(event.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
