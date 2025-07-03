import express from 'express'
import userRouter from './user.js'
import billRouter from './bill.js'

const router = express.Router();

router.use('/user', userRouter)
router.use('/bill', billRouter)

export default router

