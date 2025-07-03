import express from 'express'
import zod from 'zod'
import { User } from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import JWT_SECRET from '../config.js'
import signupSchema from './schema/signupSchema.js'
import loginSchema from './schema/loginSchema.js'
import { authMiddleware } from '../middleware.js'
const router = express.Router();

router.post('/signup',async (req, res)=>{
    const body = req.body;
    const {success} =  signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({msg : "Input invalids"})
    }

    const existingUser = await User.findOne({
        email : body.email
    })

    if(existingUser){
        return res.status(411).json({msg : "Email already exists"})
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await User.create({
        email : body.email,
        password : hashedPassword,
        firstName : body.firstName,
        lastName  : body.lastName
    })

    const UserId = newUser._id;

    const token = jwt.sign({
        UserId
    }, JWT_SECRET);

    res.status(201).json({
        message : "User created successfully",
        token : token
    })

})

router.post('/login',async (req, res)=>{
    const body = req.body;
    const {success} = loginSchema.safeParse(body);
    if(!success){
        return res.status(411).json({msg : "Input invalids"})
    }

    const user = await User.findOne({
        email : body.email
    })

    if(!user){
        return res.status(411).json({msg : "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if(!isPasswordValid){
        return res.status(411).json({msg : "Invalid password"})
    }

    const token = jwt.sign({
        UserId : user._id
    }, JWT_SECRET);

    res.status(200).json({
        message : "Login successful",
        token : token
    })
})

router.get('/profile',authMiddleware,async (req, res)=>{
    const user = await User.findById(req.body.UserId);
    res.status(200).json({
        message : "Profile fetched successfully",
        user : user
    })
})

export default router