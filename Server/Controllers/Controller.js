import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';

import AdminModel from '../Models/AdminModel.js'
import errorHandler from '../utils/errorHandler.js';

const login = async (req, res) => {
    const { username, password } = req.body;
    
    // Define schema
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    // Validate data
    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            status: "error",
            message: "Missing information",
        });
    }

    try {
        const findAdmin = await AdminModel.findOne({ username })

        if (!findAdmin) {
            return res.status(401).json({
                status: "error",
                message: "Username is not existing",
            });
        }

        const isTruePassword = bcrypt.compareSync(password, findAdmin.password);
        if (!isTruePassword) {
            return res.status(401).json({
                status: "error",
                message: "Username/password is not correct",
            });
        }

        const payload = {
            _id: findAdmin._id,
            username: findAdmin.username,
            role: findAdmin.role
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
