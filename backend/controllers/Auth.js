const express = require("express");
const User = require("../models/User");
const UserData = require("../models/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signUp = async(req,res) => {
    try{
        const {firstName,lastName,email,password,confirmPassword} = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(404).json({
                status:false,
                message:"All fields are required",
            })
        }

        if(password != confirmPassword){
            return res.status(502).json({
                status:false,
                message:"Password incorrect",
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(501).json({
                success:false,
                message:"User already exist plz Sign in",
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //create entry in db
        // const userData = await UserData.create({
        //     wpm:null,
        //     score:null,
        //     accuracy:null,
        // })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            userData :[],
        });

        // console.log(user);

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
        })

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"user registeration failed"
        })
    }
}

exports.logIn = async(req,res) => {
    try{

        const {email,password} = req.body;


        if(!email || !password) {
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User does not exist plz sign in",
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user.id,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })

            // console.log(token);
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
             }
             res.cookie("token",token, options).status(200).json({
               success:true,
               token,
               user,
               message:'Logged in successfully'
             })
        }

        else {
            return res.status(401).json({
                success:false,
                message:'The password is incorrect',
            })
        }

    }
    catch(error){
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot log in please try again",
        })
    }
}