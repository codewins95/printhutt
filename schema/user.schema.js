import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: 1
    },
    
    password: {
        type: String,
        required: true,
        trim: true
    }
})

mongoose.models = {}

userSchema.pre("save", async function(next){
    const encrypted = await bcrypt.hash(this.password.toString(), 12)
    this.password = encrypted
    next()
})

const UserSchema = mongoose.model("User", userSchema)
export default UserSchema