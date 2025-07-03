
const mongoose = require('mongoose')

const { Schema } = mongoose;

const url = "mongodb+srv://ranaaryansh12:jXGKXC6kVXMuzkqW@cluster0.kln2bnp.mongodb.net/paytm"

mongoose.connect(url).then(()=>{
    console.log("DB Connected ")
})

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    password : String,
    username : String
})


const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const user = mongoose.model('Users', userSchema);
const account = mongoose.model('Account', accountSchema)


module.exports = {
    user,
    account
}