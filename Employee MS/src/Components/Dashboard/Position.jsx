import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import _ from 'lodash'

import adminService from '../../Services/adminService.js';

const Position = () => {
    const [position, setPosition] = useState([]);

    const [itemOffset, setItemOffset] = useState(0); //itemOffset for paginate
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const itemsPerPage = 6; //itemsPerPage for paginate

    const handlePageChange = (selected) => {
        const newOffset = (selected * itemsPerPage);

        setCurrentPage(selected);
        setItemOffset(newOffset);
    }

    const fetchPositionAndCountEmployee = async (itemsPerPage, itemOffset) => {
        try {
            const responseServer = await adminService.fetchPositionAndCountEmployeeService(itemsPerPage, itemOffset);

            const responseData = responseServer.data.data;

            setTotalPage(responseData.totalPage);
            setPosition(responseData.data);
        } catch (error) {
            toast.error('Error fetching position and count employee: ' + error.response.data.message);
        }
    }

    const deletePosition = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this position?");

        if (!confirmDelete) {
            return;
        }

        try {
            const responseServer = await adminService.deletePositionService(_id);

            const updatedPosition = position.filter(position => position._id !== _id);
            setPosition(updatedPosition);

            toast.success(responseServer.data.message);
        } catch (error) {
            toast.error('Delete position error: ' + error.response.data.message);
        }
    }

    const handleSort = (Field, By) => {
        let clonePosition = _.cloneDeep(position);
        clonePosition = _.orderBy(clonePosition, [Field], [By]);
        setPosition(clonePosition);
    }

    useEffect(() => {
        fetchPositionAndCountEmployee(itemsPerPage, itemOffset);
    }, [itemOffset])

    return (
        <div className='px-3 px-sm-5'>
            <div className='mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Position List</h3>
                </div>
                <Link to="/dashboard/add-position" className='btn btn-success d-block d-sm-inline-block'>Add Position</Link>
            </div>

            {/* table */}
            <div className='mt-2 table-responsive'>
                <table className="table table-hover border text-center">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">
                                <i role='button'
                                    className="pe-1 fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort('employeeCount', 'desc')}
                                ></i>
                                <i role='button'
                                    className="pe-2 fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort('employeeCount', 'asc')}
                                ></i>
                                Number of employees
                            </th>
                            <th scope="col">Position</th>
                            <th scope="col">Department</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {position.map((item, index) => {
                            return (
                                <tr key={`position-${index}`}>
                                    <td>{itemOffset + index + 1}</td>
                                    <td>{item.employeeCount}</td>
                                    <td>{item.name}</td>
                                    <td>{item.department}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm'
                                            onClick={() => deletePosition(item._id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            <footer className='d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel="next>"
                    onPageChange={(event) => handlePageChange(event.selected)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPage}
                    forcePage={currentPage}

                    previousLabel="<previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </footer>
        </div>
    );
}

export default Position;
