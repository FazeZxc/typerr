const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        reqiured:true,
    },

    lastName: {
        type:String,
        required:false,
    },

    email: {
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    confirmPassword: {
        type:String, 
    },

    userData :[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
    }]
});

module.exports = mongoose.model("User",userSchema);