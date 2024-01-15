import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type:String
    },
    message : {
        type : String
    }
})

const userModel = mongoose.model('User',userSchema)
export default userModel