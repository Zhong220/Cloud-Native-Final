import express from 'express'
import 'dotenv/config'
import { authRouter } from './router/index.js'

const app = express()
const port = process.env.PORT || 8000

app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send("CNS backend is available.");
})

app.listen(port)