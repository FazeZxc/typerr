const express = require("express");
const User = require("../models/User");
const UserData = require("../models/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { firstName, email, password, confirmPassword } = req.body;

    if (!firstName || !email || !password || !confirmPassword) {
      return res.status(404).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (password != confirmPassword) {
      return res.status(502).json({
        status: false,
        message: "Password incorrect",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(501).json({
        success: false,
        message: "User already exist please Sign in",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create entry in db
    // const userData = await UserData.create({
    //     wpm:null,
    //     score:null,
    //     accuracy:null,
    // })

    const user = await User.create({
      firstName,
      email,
      password: hashedPassword,
      userData: [],
    });

    // console.log(user);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "user registeration failed",
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist plz sign in",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        username: user.firstName,
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // console.log(token);
      user.token = token;
      user.password = undefined;

      res.cookie("token", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        "Access-Control-Allow-Credentials": true,
      });
      res.status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot log in please try again",
    });
  }
};

exports.autoLogin = async (req, res) => {
  const cookie = req.cookies.token;
  if (!cookie || cookie === "null") {
    return res.sendStatus(401);
  }
  const decode = jwt.verify(cookie, process.env.JWT_SECRET);
  // if we received no cookies then user needs to login.
  return res.status(200).json({
    user: decode,
  });
};

exports.logOut = async (req, res) => {
  // Set token to none and expire after 5 seconds

  res.clearCookie("token");

  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
