import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import adminService from '../../Services/adminService.js';

const Department = () => {
    const [department, setDepartment] = useState([]);

    const [itemOffset, setItemOffset] = useState(0); //itemOffset for paginate
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    
    const itemsPerPage = 6; //itemsPerPage for paginate

    const handlePageChange = (selected) => {
        const newOffset = (selected * itemsPerPage);

        setCurrentPage(selected);
        setItemOffset(newOffset);
    }

    const fetchDepartmentAndCountEmployee = async (itemsPerPage, itemOffset) => {
        try {
            const responseServer = await adminService.fetchDepartmentAndCountEmployeeService(itemsPerPage, itemOffset);

            const responseData = responseServer.data.data;
            
            setTotalPage(responseData.totalPage);
            setDepartment(responseData.data);
        } catch (error) {
            toast.error('Error fetching department and count employee: ' + error.response.data.message);
        }
    }

    const deleteDepartment = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");

        if (!confirmDelete) {
            return;
        }

        try {
            const responseServer = await adminService.deleteDepartmentService(_id);

            const updatedDepartment = department.filter(department => department._id !== _id);
            setDepartment(updatedDepartment);

            toast.success(responseServer.data.message);
        } catch (error) {
            toast.error('Delete department error: ' + error.response.data.message);
        }
    }

    useEffect(() => {
        fetchDepartmentAndCountEmployee(itemsPerPage, itemOffset);
    }, [itemOffset])

    return (
        <div className='px-5'>
            <div className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Department List</h3>
                </div>
                <Link to="/dashboard/add_department" className='btn btn-success'>Add Department</Link>
            </div>
            <div className='mt-2'>
                <table className="table table-hover border text-center">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Department</th>
                            <th scope="col">Number of employees</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {department.map((item, index) => {
                            return (
                                <tr key={`department-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.employeeCount}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm'
                                            onClick={() => deleteDepartment(item._id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <footer>
                <ReactPaginate
                    nextLabel="next>"
                    onPageChange={(event) => handlePageChange(event.selected)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPage}
                    forcePage={currentPage}

                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination justify-content-center mb-0"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </footer>
        </div>
    );
}

export default Department;
