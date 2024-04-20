import express from 'express'
import AuthController from '../Controllers/AuthController.js'
import upload from '../utils/multerSetting.js'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

router.post('/addCategory', AuthController.addCategory)
router.get('/category', AuthController.fetchCategory)

router.post('/addEmployee', upload.single('image'), AuthController.addEmployee)
router.get('/employee', AuthController.fetchEmployee)

router.get('/employee/:_id', AuthController.fetchEmployeeById)
router.put('/editEmployee/:_id', AuthController.editEmployee)
router.get('/employeeDetail/:_id', AuthController.getEmployeeDetail)

router.delete('/deleteEmployee/:_id', AuthController.deleteEmployee)

router.get('/adminCount', AuthController.getAdminCount)
router.get('/employeeCount', AuthController.getEmployeeCount)
router.get('/salaryTotal', AuthController.getSalaryTotal)
router.get('/listAdmin', AuthController.getListAdmin)


export default router