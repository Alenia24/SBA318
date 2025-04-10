const express = require("express");
const router = express.Router();

// import reviews data
const passengers = require("../data/passengers");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(`Passenger router`)
})

module.exports = router;