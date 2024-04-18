import express from 'express'
import EmployeeController from '../Controllers/EmployeeController.js'

const router = express.Router()

router.post('/login', EmployeeController.login)
router.post('/logout', EmployeeController.logout)
router.get('/detail/:_id', EmployeeController.getEmployeeDetail)

export default router
