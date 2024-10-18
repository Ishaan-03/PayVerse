import mongoose  from "mongoose";


const UserSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique: true, 
        required : true,
        trim : true ,
        lowercase : true,
        minlength: 3, 
        maxlength: 30
    },
   firstName :  {
    type : String,
    required : true,
    trim : true ,
    maxlength: 30
    },
   lastName :  {
    type : String,
    required : true,
    trim : true , 
    maxlength: 30
    },
    password: {
        type : String,
        minlength: 6,
        required: true
       
    }
},{timestamps : true})

const User = mongoose.model("User", UserSchema );

export default User;