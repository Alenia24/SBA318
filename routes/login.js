const express = require("express");
const router = express.Router();

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.render("login")
}).post((req, res) => {
    
})
module.exports = router;