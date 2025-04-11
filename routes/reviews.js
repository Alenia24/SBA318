const express = require("express");
const router = express.Router();

// import reviews data
const reviews = require("../data/reviews");


// import error handling middleware
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res, next) => {
    // Query review by tripId
    if(req.query.tripId) {
      // Check if the trip exists in reviews
      const trip = reviews.find((r) => r.tripId == req.query.tripId);

      if(trip) {
        // Create an array to store the posts
        const reviewsArr = [];
        // Iterate through each review
        reviews.forEach(review => {
          // If the review tripId matches the query tripId
          if(review.tripId == req.query.tripId) {
            // Add the review to the reviewsArr
            reviewsArr.push(review)
          }
        })
        // Display all the reviews with the query match
        res.json(reviewsArr);
      } else next();
    } else res.json(reviews);
  })
  .post((req, res) => {
    // Check if all requirements are included to create a review
    if (
      req.body.participantId &&
      req.body.tripId &&
      req.body.tripName &&
      req.body.destination &&
      req.body.rating &&
      req.body.review
    ) {
      // Create the review
      const review = {
        id: reviews[reviews.length - 1].id + 1,
        ...req.body,
      };
      // Add the review to reviews data
      reviews.push(review);
      // Display the created review
      res.json(review);
    } else res.json({ Error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    // Check if the review exists
    const review = reviews.find((r) => r.id == req.params.id);

    // Display the review if the review exists
    if (review) res.json(review);
    else next();
  })
  .patch((req, res, next) => {
    // Find the review
    const review = reviews.find((r, i) => {
      // If the reveiew exists
      if (r.id == req.params.id) {
        //Iterate over the req.body
        for (const key in req.body) {
          // Update
          reviews[i][key] = req.body[key];
        }
        return true;
      }
    });
    // Display the update review if the review exists
    if (review) res.json(review);
    else next();
  })
  .delete((req, res, next) => {
    // Check if the review exists
    const review = reviews.find((r, i) => {
      if (r.id == req.params.id) {
        // Delete the review
        reviews.splice(i, 1);
        return true;
      }
    });
    // Display the review if the review exists
    if (review) res.json(review);
    else next();
  });

module.exports = router;
