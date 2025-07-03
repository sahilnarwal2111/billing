const express = require('express')
const { authMiddleware} = require('../middleware')
const { account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance',  authMiddleware, async (req, res)=>{
    const id = req.body.userId;
    const balance = await account.findOne({userId : id});
    console.log(id)
    return res.status(200).json({balance : balance.balance})

})

router.post("/transfer", authMiddleware,async (req, res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount , to} = req.body;

    const Account = account.findOne({userId : req.body.userId}).session(session);

    if(!Account || Account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "Insufficient balance"
        })
    }

    const toAccount = account.findOne({userId : to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "Invalid account"
        })
    }

    // transferring the money
    await account.updateOne({userId : req.body.userId}, { $inc : {balance : -amount}}).session(session)
    await account.updateOne({userId : to}, { $inc : {balance : amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message : "Transfer successful"
    })
})

module.exports = router