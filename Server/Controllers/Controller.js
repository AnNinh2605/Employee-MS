import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';

import AdminModel from '../Models/AdminModel.js'
import errorHandler from '../utils/errorHandler.js';

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign({ _id: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

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
    const { error } = schema.validate(req.body);

    if (error) {
        console.error('Validation error:', error.details[0].message);

        return res.status(400).json({
            status: "error",
            message: "Invalid input data. Please check and try again.",
        });
    }

    try {
        const findAdmin = await AdminModel.findOne({ username })

        if (!findAdmin) {
            return res.status(401).json({
                status: "error",
                message: "Username/password is not correct",
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
            role: findAdmin.role,
        }

        // create accessToken & refreshToken
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(findAdmin._id);

        // set refreshToken cookie with an expiration time equal to the expiration time of the refresh token 7d
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await AdminModel.updateOne({ _id: findAdmin._id }, { refreshTokens: refreshToken });

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: {
                accessToken: accessToken,
            }
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            status: "error",
            message: "No refresh token provided"
        });
    }

    let userId;

    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        userId = decodedToken._id;
    } catch (error) {
        return res.status(403).json({
            status: "error",
            message: "Invalid refresh token"
        });
    }

    try {
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'Strict' });

        // remove refreshToken to database
        await AdminModel.updateOne(
            { _id: userId },
            { $unset: { refreshTokens: "" } }
        );

        return res.status(200).json({
            status: "success",
            message: "Logout successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            status: "error",
            message: "No refresh token provided"
        });
    }
    
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const user = await AdminModel.findById(decodedToken._id);

        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.status(401).send('Invalid refresh token');
        }

        const payload = {
            _id: user._id,
            username: user.username,
            role: user.role,
        }
        
        const accessToken = generateAccessToken(payload);

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: {
                accessToken: accessToken,
            }
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const Controller = {
    login,
    logout,
    refreshToken
}
export default Controller;
