import express from 'express'
import AuthController from '../Controllers/AuthController.js'

const router = express.Router()

router.post('/login', AuthController.login)

export default router