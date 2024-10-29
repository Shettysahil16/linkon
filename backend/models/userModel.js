const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePic : {
        type : String,
    },
    role : {
        type : String,
    },
},{
    timestamps : true
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel