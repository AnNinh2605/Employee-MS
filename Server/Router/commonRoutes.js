import express from 'express'
import Controller from '../Controllers/Controller.js'

const router = express.Router()

router.post('/login', Controller.login)
router.post('/logout', Controller.logout)

export default router
