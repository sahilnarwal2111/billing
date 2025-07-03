import mongoose from 'mongoose'
import dotenv from 'dotenv' // for environment variables        

dotenv.config()

const url = process.env.MONGO_URL
mongoose.connect(url).then(()=>{
    console.log("DB Connected ")
})

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    password : String,
    email : String
})

const billSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    items: [
        {
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
            amount: { type: Number, required: true }
        }
    ],
    createdBy : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const User = mongoose.model("User", userSchema)
const Bill = mongoose.model("Bill", billSchema)

export { User, Bill }