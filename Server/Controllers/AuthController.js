import CategoryModel from '../Models/CategoryModel.js';
import EmployeeModel from '../Models/EmployeeModel.js';
import errorHandler from '../utils/errorHandler.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const addCategory = async (req, res) => {
    try {
        let { category } = req.body;
        await CategoryModel.create({
            name: category
        });
        return res.status(201).json({
            status: "success",
            message: "Create category successful",
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
            message: "Get category successful",
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
        res.status(400).send('Missing information');
    }
    else {
        let filename = req.file.filename;
        try {
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
                message: "Create employee successful",
            });
        } catch (error) {
            return errorHandler(res, error);
        }
    }
}

const fetchEmployee = async (req, res) => {
    try {
        let results = await EmployeeModel.find({}, '-password');
        return res.status(200).json({
            status: "success",
            message: "Get employee successful",
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
            message: "Get employee successful",
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
        await EmployeeModel.updateOne({ _id: _id },
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
            message: "Update employee successful",
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
            message: "Delete employee successful",
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getAdminCount = async (req, res) => {
    try {
        let results = await EmployeeModel.countDocuments({role: "admin"});
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
        let results = await EmployeeModel.countDocuments({role: "employee"});
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
            message: "Get salary total successful",
            data: results[0].totalSalary
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getListAdmin = async (req, res) => {
    try {
        let results = await EmployeeModel.find({role: "admin"}, 'email');
        return res.status(200).json({
            status: "success",
            message: "Get AdminList successful",
            data: results
        })
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
    getListAdmin
}
export default AuthController;