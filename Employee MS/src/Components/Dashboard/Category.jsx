import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const [category, setCategory] = useState('');
    const fetchCategory = async() => {
        let results = await axios.get('http://localhost:3000/auth/category');
        console.log(results);
    }
    useEffect(() => {
        const data = fetchCategory();
        setCategory(data);
    }, [])
    
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
        </div>
    );
}

export default Category;
