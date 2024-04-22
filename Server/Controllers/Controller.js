import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import EmployeeModel from '../Models/EmployeeModel.js';
import errorHandler from '../utils/errorHandler.js';

const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json({
            status: "error",
            message: "Missing information",
        });
    }
    try {
        let findEmail = await EmployeeModel.find({ email: email })
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
                    message: "Login successfully",
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
        return errorHandler(res, error);
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("jwt_token");
        return res.status(204).json({
            status: "success",
            message: "Logout successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const Controller = {
    login,
    logout
}
export default Controller;
