import express from 'express'
import cors from 'cors'
import authRoutes from './Router/adminRoutes.js'
import employeeRoutes from './Router/employeeRoutes.js'
import commonRoutes from './Router/commonRoutes.js'
import connectDB from './utils/ConnectDB.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import tokenMiddleware from './Middleware/AuthMiddleware.js'

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}))

app.use(express.json());

app.use(cookieParser())

app.use(express.static('Public'))

app.use('/', commonRoutes)
app.use('/employee', tokenMiddleware.tokenMiddleware, employeeRoutes)
app.use('/auth', [tokenMiddleware.tokenMiddleware, tokenMiddleware.isAdmin], authRoutes)

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})