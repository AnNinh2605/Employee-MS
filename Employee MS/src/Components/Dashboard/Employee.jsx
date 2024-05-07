import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import ReactPaginate from 'react-paginate';
import _ from 'lodash'

import './style.scss'

import adminService from '../../Services/adminService.js';

const Employee = () => {
    const csvLinkRef = useRef();

    const [employee, setEmployee] = useState([]);
    const [dataExport, setDataExport] = useState([]); //state to save data to export
    const [itemOffset, setItemOffset] = useState(0); //itemOffset for paginate
    const [totalPage, setTotalPage] = useState(0);

    const itemsPerPage = 10; //itemsPerPage for paginate

    const formatDateTo_ddmmyyyy = (dateString) => {
        return dateString.slice(0, 10).split("-").reverse().join('-');
    }

    const fetchEmployee = async (itemsPerPage, itemOffset) => {
        try {
            const results = await adminService.fetchEmployeeService(itemsPerPage, itemOffset);

            const dataEmployee = results.data.data.data;

            const newListUser = dataEmployee.map(row => ({
                ...row,
                dob: formatDateTo_ddmmyyyy(row.dob),
                start_date: formatDateTo_ddmmyyyy(row.start_date)
            }));

            setEmployee(newListUser);
            setTotalPage(results.data.data.totalPage);
        } catch (error) {
            toast.error('Fetch employee error: ' + error.response.data.message);
        }
    }

    const handleDeleteEmployee = async (_id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");

        if (!confirmDelete) {
            return;
        }

        try {
            let results = await adminService.deleteEmployeeService(_id);

            const updatedEmployees = employee.filter(employee => employee._id !== _id);
            setEmployee(updatedEmployees);
            
            toast.success(results.data.message);
        } catch (error) {
            toast.error("An error occurred while deleting employee");
        }
    }

    const importData = async (event) => {
        if (!event.target || !event.target.files[0] || event.target.files[0].type !== 'text/csv') {
            toast.error("Please select CSV file to import");
            return;
        }

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const results = await adminService.uploadFileService(formData);
            if (results && results.status === 201) {
                window.location.reload();
                toast.success(results.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const exportToCSV = async () => {
        try {
            const dataResponse = await adminService.fetchEmployeeService(0, 0);

            if (!dataResponse || dataResponse.status !== 200) {
                toast.error("Failed to fetch employee data");
                return;
            }

            const data = dataResponse.data.data;
            if (!data || data.length === 0) {
                toast.error("No employee data to export");
                return;
            }

            const results = data.map((item) => {
                let { _id, image, ...processingData } = item;
                return processingData;
            })

            setDataExport(results);
            setTimeout(() => { csvLinkRef.current.link.click(); }, 500)

        } catch (error) {
            console.error("Error exporting to CSV:", error);
            toast.error("An error occurred during export");
        }
    }

    const handlePageChange = (event) => {
        const newOffset = (event.selected * itemsPerPage);
        setItemOffset(newOffset);
    };

    const handleSort = (Field, By) => {
        let cloneListUser = _.cloneDeep(employee);
        cloneListUser = _.orderBy(cloneListUser, [Field], [By]);
        setEmployee(cloneListUser);
    }

    const toggleChildRow = (_id) => {
        const newListUser = employee.map(row => {
            const formatDate = {
                ...row,
            }

            if (row._id === _id) {
                formatDate.isChildRowVisible = !row.isChildRowVisible;
            }

            return formatDate;
        })
        setEmployee(newListUser);
    };

    useEffect(() => {
        fetchEmployee(itemsPerPage, itemOffset);
    }, [itemOffset])

    return (
        <>
            <div className='px-5'>
                <div className='mt-3'>
                    <div className='d-flex justify-content-center'>
                        <h3>Employee List</h3>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
                        <div>
                            <label className='btn btn-primary me-2' htmlFor='import'>Import</label>
                            <input type="file" id='import' onChange={(event) => importData(event)} hidden />
                            <CSVLink
                                data={dataExport}
                                filename={"data.csv"}
                                asyncOnClick={true}
                                ref={csvLinkRef}
                            >
                            </CSVLink>
                            <button className="btn btn-warning" onClick={exportToCSV}>Export</button>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <table className="table table-hover border">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Position</th>
                                <th className='d-flex d-flex gap-1'>
                                    <div role='button'>
                                        <i className="pe-1 fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort('salary', 'asc')}
                                        ></i>
                                        <i className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort('salary', 'desc')}
                                        ></i>
                                    </div>
                                    <span>Salary</span>
                                </th>
                                <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((item, index) => {
                                return (
                                    <React.Fragment key={`employee-${index}`}>
                                        <tr>
                                            <td>{itemOffset + index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.department_id.name}</td>
                                            <td>{item.position_id.name}</td>
                                            <td>{item.salary}</td>
                                            <td>
                                                <button className="btn btn-success btn-sm"
                                                    onClick={() => toggleChildRow(item._id)}>
                                                    {item.isChildRowVisible ? 'Less' : 'More'}
                                                </button>
                                            </td>
                                        </tr>
                                        {item.isChildRowVisible && (
                                            <React.Fragment key={`employee-child-${index}`}>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">DOB</th>
                                                    <th colSpan={2} scope="col" className='text-center'>Action</th>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.dob}</td>
                                                    <td colSpan="2" rowSpan={3} className='border text-center align-middle'>
                                                        <Link to={`/dashboard/edit_employee/${item._id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                                                        <button className='btn btn-danger btn-sm' onClick={() => handleDeleteEmployee(item._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Address</th>
                                                    <th colSpan="2" scope="col">Start date</th>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{item.address}</td>
                                                    <td colSpan="2">{item.start_date}</td>
                                                </tr>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={(event) => handlePageChange(event)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}

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
                containerClassName="pagination justify-content-center"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default Employee;
