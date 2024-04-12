const express = require("express");
const router = express.Router();

const {UserData,getData,deleteData} = require("../controllers/StoreData");
const {auth} = require("../middlewares/auth");

router.post("/data",auth,UserData);
router.get("/getData",auth,getData);
router.post("/deleteData",auth,deleteData);


module.exports = router;