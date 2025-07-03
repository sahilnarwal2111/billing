import express from 'express'
import { authMiddleware } from '../middleware.js'
import { Bill } from '../db.js'
import billSchema from './schema/billSchema.js'

const router = express.Router()

router.post('/create',authMiddleware,async (req, res)=>{
    const body = req.body;
    const {success} = billSchema.safeParse(body);
    if(!success){
        return res.status(411).json({msg : "Input invalids"})
    }
    const newBill = await Bill.create({
        customerName : body.customerName,
        items : body.items,
        createdBy : req.body.UserId
    })
    const billId = newBill._id;
    res.status(201).json({
        message : "Bill created successfully",  
        bill : newBill,
        createdBy : req.body.UserId,
        billId : billId
    })  
})

router.post('/update',authMiddleware,async (req, res)=>{
    const body = req.body;
    const {success} = billSchema.safeParse(body);
    if(!success){
        return res.status(411).json({msg : "Input invalids"})
    }
    const bill = await Bill.findById(body.billId);
    if(!bill){
        return res.status(404).json({msg : "Bill not found"})
    }
    bill.customerName = body.customerName;
    bill.items = body.items;
    await bill.save();
    res.status(200).json({
        message : "Bill updated successfully",
        bill : bill
    })
})

router.get('/get',authMiddleware,async (req, res)=>{
    const bills = await Bill.find({createdBy : req.body.UserId});
    res.status(200).json({
        message : "Bills fetched successfully",
        bills : bills
    })
})

export default router