const express = require("express");

const router = express.Router();

const {signUp, logIn} = require("../controllers/Auth");

router.post("/signUp",signUp);
router.post("/signin",logIn);


module.exports = router;