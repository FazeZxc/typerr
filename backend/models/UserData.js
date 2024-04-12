const mongoose = require("mongoose");

const userData = mongoose.Schema({
    wpm:{
        type:Number,
    },

    score:{
        type:Number,
    },

    accuracy:{
        type:Number,
    }
})

module.exports = mongoose.model("UserData",userData);