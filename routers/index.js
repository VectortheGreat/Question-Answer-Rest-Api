const express = require("express");
const question = require("./question");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");

//api
const router = express.Router(); //*localhost:5000/api/

router.use("/questions", question); //*localhost:5000/api/questions
router.use("/auth", auth); //*localhost:5000/api/auth
router.use("/users", user); //*localhost:5000/api/user
router.use("/admin", admin); //*localhost:5000/api/admin

module.exports = router;
