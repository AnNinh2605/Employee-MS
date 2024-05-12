import express from 'express'

import AuthController from '../Controllers/AuthController.js'
import uploadImage from '../utils/multerUploadImage.js'
import uploadFile from '../utils/multerUploadFile.js'

const router = express.Router()

// dashboard page route
router.get('/adminCount', AuthController.getAdminCount)
router.get('/employeeCount', AuthController.getEmployeeCount)
router.get('/salaryTotal', AuthController.getSalaryTotal)
router.get('/listAdmin', AuthController.getListAdmin)

// Manage employess page
router.get('/employee', AuthController.fetchEmployee)
router.get('/employee/:_id', AuthController.fetchEmployeeById)
router.post('/addEmployee', uploadImage.single('image'), AuthController.addEmployee)
router.put('/editEmployee/:_id', AuthController.editEmployee)
router.delete('/deleteEmployee/:_id', AuthController.deleteEmployee)
router.get('/search', AuthController.searchEmployee)

// department route
router.get('/department', AuthController.fetchDepartment)
router.get('/fetchDepartmentAndCountEmployee', AuthController.fetchDepartmentAndCountEmployee)
router.post('/addDepartment', AuthController.addDepartment)
router.delete('/deleteDepartment/:_id', AuthController.deleteDepartment)

// position route
router.get('/position', AuthController.fetchPosition)

//upload file 
router.post('/upload', uploadFile.single('file'), AuthController.uploadFile)

export default router