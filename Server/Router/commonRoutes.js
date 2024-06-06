import express from 'express'
import Controller from '../Controllers/Controller.js'

const router = express.Router();

router.get('/', (req, res) => res.send("Connecting to API"));
router.post('/login', Controller.login);
router.post('/logout', Controller.logout);
router.post('/refresh-token', Controller.refreshToken);

router.post('/password/forgot', Controller.forgotPassword);
router.post('/password/reset', Controller.resetPassword);

export default router;