import express from 'express'
import EmployeeController from '../Controllers/EmployeeController.js'

const router = express.Router()

router.get('/detail/:_id', EmployeeController.getEmployeeDetail)

export default router
