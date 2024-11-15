import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Authrouter is available.')
})

router.get('/login', (req, res) => {
    res.status(201).send('Login is available')
    // try {

    // } catch (error) {

    // }
})

export default router