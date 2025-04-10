const express = require("express");
const router = express.Router();

// import trips data
const trips = require("../data/trips");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(`Trip router`)
})

module.exports = router;