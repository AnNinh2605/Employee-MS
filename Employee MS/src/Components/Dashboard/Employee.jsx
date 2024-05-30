import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import _ from 'lodash'

import './style.scss'

import adminService from '../../Services/adminService.js';

const Employee = () => {
    const csvLinkRef = useRef();

    const { register, handleSubmit } = useForm();

    const [employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState([]);
    const [position, setPosition] = useState([]);

    const [dataExport, setDataExport] = useState([]); //state to save data to export
    const [itemOffset, setItemOffset] = useState(0); //itemOffset for paginate
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const itemsPerPage = 6; //itemsPerPage for paginate

    const formatDateTo_ddmmyyyy = (dateString) => {
        return dateString.slice(0, 10).split("-").reverse().join('-');
    }

    const fetchEmployee = async (itemsPerPage, itemOffset) => {
        try {
            const responseServer = await adminService.fetchEmployeeService(itemsPerPage, itemOffset);

            const dataResponse = responseServer.data.data;

            const newListUser = dataResponse.data.map(row => ({
                ...row,
                dob: formatDateTo_ddmmyyyy(row.dob),
                start_date: formatDateTo_ddmmyyyy(row.start_date)
            }));

            setTotalPage(dataResponse.totalPage);
            setEmployee(newListUser);
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

            toast.success(results.data.message);
            setTimeout(function () {
                window.location.reload();
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const exportToCSV = async () => {
        try {
            const responseServer = await adminService.fetchEmployeeService(0, 0);

            const responseData = responseServer.data.data;

            if (!responseData || responseData.length === 0) {
                toast.error("No employee data to export");
                return;
            }

            const dataExport = responseData.map(item => {
                const { _id, dob, department_id, position_id, start_date, ...restData } = item;
                return {
                    ...restData,
                    dob: dob.slice(0, 10),
                    department: department_id.name,
                    position: position_id.name,
                    start_date: start_date.slice(0, 10)
                }
            })

            setDataExport(dataExport);
            setTimeout(() => { csvLinkRef.current.link.click() }, 500)

        } catch (error) {
            console.error("Error exporting to CSV:", error);
            toast.error("An error occurred during export");
        }
    }

    const handlePageChange = (selected) => {
        const newOffset = (selected * itemsPerPage);

        setCurrentPage(selected);
        setItemOffset(newOffset);
    }

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
    }

    const handleSearch = async (data) => {
        const { name, position_id, department_id } = data;

        // reset to page 1 when click search button with empty input
        if (!name && !position_id && !department_id) {
            fetchEmployee(itemsPerPage, 0);
            handlePageChange(0);
            return;
        }

        try {
            const results = await adminService.searchEmployeeService(name, position_id, department_id, itemsPerPage);

            const responseData = results.data.data;

            setEmployee(responseData.data);
            setTotalPage(responseData.totalPage);
        } catch (error) {
            toast.error('Error fetching position data: ' + error.response.data.message);
        }
    }

    const fetchDepartment = async () => {
        try {
            const results = await adminService.fetchDepartmentService();

            const data = results.data.data;
            setDepartment(data);
        } catch (error) {
            toast.error('Error fetching department data: ' + error.response.data.message);
        }
    }

    const fetchPosition = async () => {
        try {
            const results = await adminService.fetchPositionService();

            const data = results.data.data;
            setPosition(data);
        } catch (error) {
            toast.error('Error fetching position data: ' + error.response.data.message);
        }
    }

    useEffect(() => {
        fetchDepartment();
        fetchPosition();
        fetchEmployee(itemsPerPage, itemOffset);
    }, [itemOffset])

    return (
        <>
            <div className='px-3 px-sm-5'>
                <div className='mt-3'>
                    <div className='text-center'>
                        <h3>Employee List</h3>
                    </div>

                    <div className='d-flex justify-content-between'>
                        <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>

                        <div className='d-flex'>
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

                    <div className='mt-2'>
                        <form
                            onSubmit={handleSubmit(handleSearch)}
                            className='d-flex flex-sm-row flex-column justify-content-between gap-2'
                        >
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    id='name'
                                    placeholder="Search employee..."
                                    {...register('name')}
                                />
                            </div>

                            <select
                                id="department_id"
                                className='form-select'
                                {...register('department_id')}
                            >
                                <option value="">Select department</option>
                                {department.map((item, index) => {
                                    return (
                                        <option key={`department-${index}`} value={item._id}>{item.name}</option>
                                    )
                                })}
                            </select>

                            <select
                                className='form-select'
                                id="position_id"
                                {...register('position_id')}
                            >
                                <option value="">Select position</option>
                                {position.map((item, index) => {
                                    return (
                                        <option key={`position-${index}`} value={item._id}>{item.name}</option>
                                    )
                                })}
                            </select>

                            <button
                                type="submit"
                                className="btn btn-secondary border px-4">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                    </div>
                </div>

                {/* // employee table */}
                <div className='mt-2 table-responsive'>
                    <table className="table table-hover border">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Department</th>
                                <th className=''>
                                    <i role='button'
                                        className="pe-1 fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('salary', 'desc')}
                                    ></i>
                                    <i role='button'
                                        className="pe-2 fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('salary', 'asc')}
                                    ></i>
                                    Salary
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
                                            <td>{item.position_name}</td>
                                            <td>{item.department_name}</td>
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
                {employee && employee.length == 0 && <div className='text-center lead'>Not found employee</div>}
            </div>

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
        </>
    );
}

export default Employee;
