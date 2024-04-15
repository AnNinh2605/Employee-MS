import express from 'express'
import cors from 'cors'
import authRoutes from './Router/userRoutes.js'
import connectDB from './utils/ConnectDB.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000

app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET,PUT,POST',
    credentials: true
}))

app.use(express.json());

app.use(cookieParser())

app.use('/auth', authRoutes)

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})