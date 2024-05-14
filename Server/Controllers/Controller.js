import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import AdminModel from '../Models/AdminModel.js'
import errorHandler from '../utils/errorHandler.js';

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            status: "error",
            message: "Missing information",
        });
    }

    try {
        const admin = await AdminModel.findOne({ username })
        if (!admin) {
            return res.status(401).json({
                status: "error",
                message: "Username is not existing",
            });
        }

        const isTruePassword = bcrypt.compareSync(password, admin.password);
        if (!isTruePassword) {
            return res.status(401).json({
                status: "error",
                message: "Username/password is not correct",
            });
        }

        let payload = {
            _id: admin._id,
            email: admin.username,
            role: admin.role
        }
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
        res.cookie('jwt_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: {
                access_token: token
            }
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("jwt_token", { httpOnly: true, secure: true, sameSite: 'Strict' });

        return res.status(200).json({
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
