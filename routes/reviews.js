const express = require("express");
const router = express.Router();

// import trips data
const reviews = require("../data/reviews");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(`Reviews router`)
})

module.exports = router;