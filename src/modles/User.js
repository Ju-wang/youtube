import bcrypt from "bcrypt"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

userSchema.pre("save", async function() {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 5)
    console.log(this.password);
})

const userModel = mongoose.model("User", userSchema)

export default userModel