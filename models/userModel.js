const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email i required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    posts:[{
        type:mongoose.Types.ObjectId,
        ref:'lf',
    },
],
},{timestamps:true})

const userModel=mongoose.model("User",userSchema);

module.exports = userModel;
