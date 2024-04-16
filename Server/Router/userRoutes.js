import express from 'express'
import AuthController from '../Controllers/AuthController.js'
import upload from '../utils/multerSetting.js'

const router = express.Router()

router.post('/login', AuthController.login)

router.post('/addCategory', AuthController.addCategory)
router.get('/category', AuthController.fetchCategory)

router.post('/addEmployee', upload.single('image'), AuthController.addEmployee)
router.get('/employee', AuthController.fetchEmployee)

export default router