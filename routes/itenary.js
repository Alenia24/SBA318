const express = require("express");
const router = express.Router();

// import trips data
const itenary = require("../data/itenary");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(`Itenary router`)
})

module.exports = router;