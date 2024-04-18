import EmployeeModel from '../Models/EmployeeModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let findEmail = await EmployeeModel.find({ email: email })
        if (findEmail && findEmail.length > 0) {
            let isTruePassword = bcrypt.compareSync(password, findEmail[0].password);
            if (isTruePassword) {
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
const getEmployeeDetail = async (req, res) => {
    let { _id } = req.params;
    try {
        let results = await EmployeeModel.find({ _id: _id }, '-password');
        return res.status(200).json({
            status: "success",
            message: "Get employee detail successful",
            data: results
        })
    } catch (error) {
        console.log("Get employeeDetail error", error);
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
    getEmployeeDetail
}
export default AuthController;