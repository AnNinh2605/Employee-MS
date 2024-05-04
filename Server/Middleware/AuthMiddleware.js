import jwt from 'jsonwebtoken'
import AdminModel from '../Models/AdminModel.js';

// check validate account 
const tokenMiddleware = (req, res, next) => {
    try {
        const headerToken = req.headers.authorization;
        const token = headerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decodedToken._id;
        if (decodedToken) {
            next();
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send('Expired token')
        }
        return res.status(401).send('Authentication is not valid');
    }
}

const isAdmin = async (req, res, next) => {
    const _id = req.userId;
    try {
        const results = await AdminModel.findById(_id);
        if (results && results.role === 'admin') {
            next();
        }
    } catch (error) {
        return res.status(403).send('Your account can not access to this resources');
    }
}

const authMiddleware = { tokenMiddleware, isAdmin }

export default authMiddleware;