import AdminModel from '../Models/AdminModel.js';
import CategoryModel from '../Models/CategoryModel.js';
import EmployeeModel from '../Models/EmployeeModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let findEmail = await AdminModel.find({ email: email })
        if (findEmail && findEmail.length > 0) {
            let isTruePassword = bcrypt.compareSync(password, findEmail[0].password);
            if (isTruePassword) {
                let payload = {
                    _id: findEmail[0]._id,
                    email: findEmail[0].email,
                    role: findEmail[0].role
                }
                let token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
                res.cookie('jwt_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
                return res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    data: {
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

const logout = (req, res) => {
    try {
        res.clearCookie("jwt_token");
        return res.status(204).json({
            status: "success",
            message: "Logout successful",
        });
    } catch (error) {
        console.log("Logout error", error);
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
        console.log("Fetch employee by Id error", error);
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
        console.log("Edit employee error", error);
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

const deleteEmployee = async (req, res) => {
    let _id = req.params._id;
    try {
        await EmployeeModel.deleteOne({ _id: _id });
        return res.status(204).json({
            status: "success",
            message: "Delete employee successful",
        })
    } catch (error) {
        console.log("Delete employee error", error);
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

const getAdminCount = async (req, res) => {
    try {
        let results = await AdminModel.countDocuments({});
        return res.status(200).json({
            status: "success",
            message: "Get adminCount successful",
            data: results
        })
    } catch (error) {
        console.log("Get adminCount error", error);
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

const getEmployeeCount = async (req, res) => {
    try {
        let results = await EmployeeModel.countDocuments({});
        return res.status(200).json({
            status: "success",
            message: "Get EmployeeCount successful",
            data: results
        })
    } catch (error) {
        console.log("Get employeeCount error", error);
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

const getListAdmin = async (req, res) => {
    try {
        let results = await AdminModel.find({}, 'email');
        return res.status(200).json({
            status: "success",
            message: "Get AdminList successful",
            data: results
        })
    } catch (error) {
        console.log("Get listadmin error", error);
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

const AuthController = {
    login,
    logout,
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