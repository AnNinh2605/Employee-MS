import UserModel from '../Models/userModels.js';
import jwt from 'jsonwebtoken';

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
                res.cookie('jwt_token', token , { expires: new Date(Date.now() + 900000), httpOnly: true })
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

const addCategory = (req, res) => {
    try {
        console.log(req.body);
        return res.status(201).json({
            status: "success",
            message: "Create category successful",
        });
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

const fetchCategory = (req, res) => {
    try {
        res.status(200).send('Ok');
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

const AuthController = { login, addCategory, fetchCategory }
export default AuthController;