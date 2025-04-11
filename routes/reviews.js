const express = require("express");
const router = express.Router();

// import reviews data
const reviews = require("../data/reviews");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(reviews)
}).post((req, res) => {
    if(req.body.participantId && req.body.tripId && req.body.tripName && req.body.destination && req.body.rating && req.body.review) {
        // Create the review
        const review = {
            id: reviews[reviews.length - 1].id + 1,
            ...req.body
        }

        // Add the review to reviews data
        reviews.push(review);
        // Display the created review
        res.json(review)
    } else res.json({Error: "Insufficient Data"})
})

module.exports = router;