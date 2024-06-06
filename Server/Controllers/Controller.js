import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import nodemailer from 'nodemailer';

import AdminModel from '../Models/AdminModel.js'
import errorHandler from '../utils/errorHandler.js';

const saltRounds = 10;

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign({ _id: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const generateResetToken = (payload) => {
    return jwt.sign({ _id: payload }, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Define schema
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

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
        const findAdmin = await AdminModel.findOne({ email })

        if (!findAdmin) {
            return res.status(401).json({
                status: "error",
                message: "Email/password is not correct",
            });
        }

        const isTruePassword = bcrypt.compareSync(password, findAdmin.password);
        if (!isTruePassword) {
            return res.status(401).json({
                status: "error",
                message: "Email/password is not correct",
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
            sameSite: 'None',
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
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, SameSite: 'None' });

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

const forgotPassword = async (req, res) => {
    const email = req.body.email;

    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
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
        // find user by email
        const findUser = await AdminModel.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                status: "error",
                message: "Email not found. Please check your email and try again."
            })
        }

        // generate reset token and save to database
        const userId = findUser._id;
        const resetToken = generateResetToken(userId);

        await AdminModel.findByIdAndUpdate(userId, { resetTokens: resetToken });

        // send reset code to email
        const sendToEmail = "levu260598@gmail.com";
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const sendEmail = await transporter.sendMail({
            to: sendToEmail,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            html: `
            <div style="text-align: center; margin-top: 20px;">
                <h2>Password Reset</h2>
                <p>Click the button below to reset your password:</p>
                <p>
                    <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}"
                        style="background-color: #4CAF50; 
                        color: white; padding: 10px 20px; 
                        text-decoration: none; border-radius: 5px;"
                        target="_blank"
                    >Reset Password
                    </a>
                </p>
            </div>`,
        });

        if (!sendEmail) {
            return res.status(500).json({
                status: "error",
                message: "Unable to send email. Please try again later."
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Email sent successfully. Please check your inbox."
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const resetPassword = async (req, res) => {
    const { password, resetToken } = req.body;

    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    // Validate data
    const { error } = schema.validate({ password });

    if (error) {
        console.error('Validation error:', error.details[0].message);

        return res.status(400).json({
            status: "error",
            message: "Invalid input data. Please check and try again.",
        });
    }

    try {
        let decodedResetToken;

        // check valid token
        try {
            decodedResetToken = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
        } catch (error) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).send({ message: 'Request has expired' });
            } else {
                return res.status(401).send({ message: 'Request is invalid' });
            }
        }

        // find user to reset password
        const userId = decodedResetToken._id;
        const user = await AdminModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Not found user'
            });
        }

        // save new password
        await AdminModel.findByIdAndUpdate(
            userId,
            {
                $set: { password: bcrypt.hashSync(password, saltRounds) },
                $unset: { resetTokens: "" }
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Reset password successful'
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const Controller = {
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword
}
export default Controller;
