const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async(req,res,next) => {
    try{
        //extract jwt from the cookie ,body or header;
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found",
            })
        }

        try{  
            
            const decode = await jwt.verify(token,process.env.JWT_SECRET);

            console.log(decode);

            req.user = decode;
        }

        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}

