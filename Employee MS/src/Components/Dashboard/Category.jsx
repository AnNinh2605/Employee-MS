import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const [category, setCategory] = useState([]);
    const fetchCategory = async () => {
        let results = await axios.get('http://localhost:3000/auth/category');
        if (results && results.status === 200) {
            let data = results.data.data
            setCategory(data);
        }
        else{
            alert("")
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
                                    <td>{index}</td>
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
