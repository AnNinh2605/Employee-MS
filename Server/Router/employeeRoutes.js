import express from 'express'
const router = express.Router()
import EmployeeController from '../Controllers/EmployeeController.js'

router.get('/employeeDetail/:_id', EmployeeController.getEmployeeDetail)

export default router
