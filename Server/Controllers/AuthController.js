import UserModel from '../Models/UserModel.js';
import CategoryModel from '../Models/CategoryModel.js';
import EmployeeModel from '../Models/EmployeeModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let findEmail = await UserModel.find({ email: email })
        if (findEmail && findEmail.length > 0) {
            if (findEmail[0].password === password) {
                let payload = {
                    _id: findEmail[0]._id,
                    email: findEmail[0].email
                }
                let token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
                res.cookie('jwt_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
                return res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    data: {
                        ...payload,
                        access_token: token
                    }
                });
            }
            else {
                return res.status(401).json({
                    status: "error",
                    message: "Email/ password is not correct",
                });
            }
        }
        else {
            return res.status(401).json({
                status: "error",
                message: "Email is not existing",
            });
        }
    } catch (error) {
        console.log("Login error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
    }
}

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
        console.log("Add category error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
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
        console.log("Get category error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
    }
}

const addEmployee = async (req, res) => {
    let { name, email, password, salary, address, category_id } = req.body
    let filename = req.file.filename;
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
        await EmployeeModel.create({
            name,
            email,
            password: hash,
            salary,
            address,
            category_id,
            image: filename
        });
        return res.status(201).json({
            status: "success",
            message: "Create employee successful",
        });
    } catch (error) {
        console.log("Add employee error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
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
        console.log("Fetch employee error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
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
        console.log("Fetch employee error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
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
        console.log("Fetch employee error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
    }
}

const AuthController = { login, addCategory, fetchCategory, addEmployee, fetchEmployee, fetchEmployeeById, editEmployee }
export default AuthController;