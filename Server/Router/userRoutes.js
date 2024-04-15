import express from 'express'
import AuthController from '../Controllers/AuthController.js'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/addCategory', AuthController.addCategory)
router.get('/category', AuthController.fetchCategory)

export default router