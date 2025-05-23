const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
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
},
{
    timestamps : true,
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;