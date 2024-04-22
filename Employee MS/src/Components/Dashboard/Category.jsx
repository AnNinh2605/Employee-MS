import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import adminService from '../../Services/adminService.js';

const Category = () => {
    const [category, setCategory] = useState([]);
    const fetchCategory = async () => {
        let results = await adminService.fetchCategoryService();
        if (results && results.status === 200) {
            let data = results.data.data
            setCategory(data);
        }
        else {
            //error
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <div className='px-5'>
            <div className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Category List</h3>
                </div>
                <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
            </div>
            <div className='mt-3'>
                <table className="table table-hover border">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((item, index) => {
                            return (
                                <tr key={`category-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
