const express = require("express");
const router = express.Router();

// import trips data
const trips = require("../data/trips");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    // Display all trips
    res.json(trips)
}).post((req, res) => {
    // Check if all requirements are included to create a trip
    if(req.body.tripName && req.body.destination && req.body.startDate && req.body.endDate && req.body.price) {
        // Check if a trip Name already exists
        if(trips.find((t) => t.tripName === req.body.tripName)) {
            return res.json({ Error: "Trip Name already taken" });
        }
        //Create the trip
        const trip = {
            id: trips[trips.length - 1].id + 1,
            ...req.body
        }
        //Add the trip to trips data
        trips.push(trip);
        // Display the created trip
        res.json(trip);
    }else res.json({Error: "Insufficient Data"})
})

module.exports = router;