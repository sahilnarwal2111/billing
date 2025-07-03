const express = require('express')
const zod = require('zod')
const { user, account } = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const { authMiddleware } = require('../middleware')

const router = express.Router();
// router.use(express.json());

const signupSchema = zod.object({
    username : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

router.post('/signup',async (req, res)=>{
    const body = req.body;
    const {success} =  signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({msg : "Email already exists / Input invalids"})
    }

    const existingUser = await user.findOne({
        username : body.username
    })

    if(existingUser){
        return res.status(411).json({msg : "Email already exists / Input invalids"})
    }

    const newUser = await user.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName  : body.lastName
    })

    const userId = newUser._id;
    
    await account.create({
        userId : userId, 
        balance : Math.ceil(Math.random() * 1000 + 1)
    })    

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message : "User created successfully",
        token : token
    })

})

const singinSchema = zod.object({
    username : zod.string(),
    password : zod.string()
})

router.post('/signin',async (req, res)=>{
    const body = req.body;
    const { success } = singinSchema.safeParse(body);

    if(!success){
        res.status(411).json({msg : "User not found"})
    }

    const currentUser = await user.find({
        username : body.username,
        password : body.password
    })

    if(currentUser){
        const id = currentUser._id;
        const token = jwt.sign({userId : id}, JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }

    res.status(404).json({msg : "Errow while logni"})


})

const updateBody = zod.object({
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string(),

})

router.put('/update',async (req, res)=>{
    const body = req.body;
    const { success } = updateBody.safeParse(body);
    console.log(updateBody.safeParse(body))
    if(!success){
        res.status(404).json({msg : "Invalid inputs"})
        return;
    }

    await user.updateOne(req.body, {
        _id : req.id
    })

    res.json({
        msg : "Done successfully !"
    })

})

router.get('/me', authMiddleware, (req, res)=>{
    try{
        const body = req.body;
        res.status(200).json({user : body.userId})
    }catch{
        res.status(500).json({message: 'Server error' })
    }
})

router.get('/bulk', async (req, res)=>{
    const filter = req.query.filter || "";
    
    const users = await user.find({
        $or: [{
            firstName : {
                "$regex" : filter
            },
            lastName :{
                "$regex" : filter
            }
        }]
    })
    res.json({
        user: users.map(user=>({
            username : user.username,
            firstName : user.firstName, 
            lastName : user.lastName,
            _id : user._id
        }))
    })
})
 

module.exports = router