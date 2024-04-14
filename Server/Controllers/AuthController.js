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
                return res.status(200).send("Login successful");
            }
            else {
                return res.send("Email/ password is not correct");
            }
        }
        else {
            return res.send("Email is not existing");
        }
    } catch (error) {
        console.log("Login error", error);
    }
}
const AuthController = { login }
export default AuthController;