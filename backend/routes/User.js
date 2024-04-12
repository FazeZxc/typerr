const express = require("express");

const router = express.Router();

const { signUp, logIn, autoLogin, logOut } = require("../controllers/Auth");

router.post("/signUp", signUp);
router.post("/signin", logIn);
router.get("/autoLogin", autoLogin);
router.get("/logOut", logOut);

module.exports = router;
