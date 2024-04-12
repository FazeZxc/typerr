const mongoose = require("mongoose");
require("dotenv").config()

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( () => console.log("Db connection successful"))
    .catch((error)=>{
        console.log("DB connection failed");
        console.log(error);
        process.exit(1);
    });
};