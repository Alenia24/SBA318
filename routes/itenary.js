const express = require("express");
const router = express.Router();

// import ite data
const itenaries = require("../data/itenary");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(itenaries)
})

module.exports = router;