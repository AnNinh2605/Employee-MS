import express from 'express'

import AuthController from '../Controllers/AuthController.js'
import uploadFile from '../utils/multerUploadFile.js'

const router = express.Router()

// dashboard page route
router.get('/dashboard/adminCount', AuthController.getAdminCount)
router.get('/dashboard/employeeCount', AuthController.getEmployeeCount)
router.get('/dashboard/salaryTotal', AuthController.getSalaryTotal)
router.get('/dashboard/listAdmin', AuthController.getListAdmin)

// Manage employess page
router.get('/employee/search', AuthController.searchEmployee)
router.get('/employee', AuthController.fetchEmployee)
router.post('/employee', AuthController.addEmployee)
router.put('/employee/:_id', AuthController.editEmployee)
router.delete('/employee/:_id', AuthController.deleteEmployee)
router.get('/employee/:_id', AuthController.fetchEmployeeById)

// department route
router.get('/department', AuthController.fetchDepartment)
router.post('/department', AuthController.addDepartment)
router.get('/department/count', AuthController.fetchDepartmentAndCountEmployee)
router.delete('/department/:_id', AuthController.deleteDepartment)

// position route
router.get('/position', AuthController.fetchPosition)
router.post('/position', AuthController.addPosition)
router.get('/position/count', AuthController.fetchPositionAndCountEmployee)
router.delete('/position/:_id', AuthController.deletePosition)

//upload file 
router.post('/upload', uploadFile.single('file'), AuthController.uploadFile)

export default router