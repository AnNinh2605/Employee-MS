import fs from 'fs';
import csv from 'csv-parser';
import bcrypt from 'bcrypt';

import CategoryModel from '../Models/CategoryModel.js';
import EmployeeModel from '../Models/EmployeeModel.js';
import errorHandler from '../utils/errorHandler.js';

const saltRounds = 10;

const addCategory = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "Request body is missing",
        })
    }
    try {
        let { category } = req.body;
        await CategoryModel.create({
            name: category
        });
        return res.status(201).json({
            status: "success",
            message: "Created category successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const fetchCategory = async (req, res) => {
    try {
        let results = await CategoryModel.find();
        return res.status(200).json({
            status: "success",
            message: "Get category successfully",
            data: results
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const addEmployee = async (req, res) => {
    let { name, email, password, salary, address, category_id } = req.body
    //check if missing name, email, password
    if (!name || !email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Request body is missing",
        })
    }
    try {
        let filename = req.file.filename;
        await EmployeeModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, saltRounds),
            salary,
            address,
            category_id,
            image: filename,
            role: "employee"
        });
        return res.status(201).json({
            status: "success",
            message: "Created employee successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const fetchEmployee = async (req, res) => {
    try {
        let results = await EmployeeModel.find({}, '-password');
        return res.status(200).json({
            status: "success",
            message: "Get employee successfully",
            data: results
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const fetchEmployeeById = async (req, res) => {
    let _id = req.params._id;
    try {
        let results = await EmployeeModel.findById(_id, '-password -image');
        return res.status(200).json({
            status: "success",
            message: "Get employee successfully",
            data: results
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const editEmployee = async (req, res) => {
    let { name, email, salary, address, category_id } = req.body
    let _id = req.params._id;
    try {
        await EmployeeModel.findByIdAndUpdate(_id,
            {
                name,
                email,
                salary,
                address,
                category_id,
            }
        );
        return res.status(204).json({
            status: "success",
            message: "Updated employee successfully",
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const deleteEmployee = async (req, res) => {
    let _id = req.params._id;
    try {
        await EmployeeModel.deleteOne({ _id: _id });
        return res.status(204).json({
            status: "success",
            message: "Deleted employee successfully",
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getAdminCount = async (req, res) => {
    try {
        let results = await EmployeeModel.countDocuments({ role: "admin" });
        return res.status(200).json({
            status: "success",
            message: "Get adminCount successful",
            data: results
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getEmployeeCount = async (req, res) => {
    try {
        let results = await EmployeeModel.countDocuments({ role: "employee" });
        return res.status(200).json({
            status: "success",
            message: "Get EmployeeCount successful",
            data: results
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getSalaryTotal = async (req, res) => {
    try {
        let results = await EmployeeModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$salary" }
                }
            }
        ]);
        return res.status(200).json({
            status: "success",
            message: "Get salary total successfully",
            data: results[0].totalSalary
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getListAdmin = async (req, res) => {
    try {
        let results = await EmployeeModel.find({ role: "admin" }, 'email');
        return res.status(200).json({
            status: "success",
            message: "Get AdminList successfully",
            data: results
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const uploadFile = async (req, res) => {
    try {
        const employeeData = [];
        let hasError = false;

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => employeeData.push(data))
            .on('end', async () => {
                employeeData.forEach(data => {
                    data.password = bcrypt.hashSync(data.password, saltRounds),
                        data.category_id = "6628ee0124b826a68f788790",
                        data.image = 'image-1714127404272.jpg',
                        data.role = "employee"
                })
                for (const item of employeeData) {
                    let check = await EmployeeModel.findOne({ email: item.email });
                    if (check) {
                        hasError = true;
                        break; // Skip creating duplicate employee
                    }
                    else {
                        await EmployeeModel.create(item);
                    }
                }
                fs.unlinkSync(req.file.path); // Delete temporary file
            });


        if (hasError) {
            return res.status(409).json({
                status: "error",
                message: "Data import is invalid",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Created employee successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const AuthController = {
    addCategory,
    fetchCategory,
    addEmployee,
    fetchEmployee,
    fetchEmployeeById,
    editEmployee,
    deleteEmployee,
    getAdminCount,
    getEmployeeCount,
    getSalaryTotal,
    getListAdmin,
    uploadFile
}
export default AuthController;