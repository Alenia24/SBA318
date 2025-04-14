const express = require("express");
const Joi = require("joi");
const router = express.Router();

// import reviews data
const reviews = require("../data/reviews");

// import error handling middleware
const error = require("../utilities/error");

const reviewSchema = Joi.object({
  participantId: Joi.number().integer().required().messages({
    "number.base": "Participant ID must be a number.",
    "number.integer": "Participant ID must be an integer.",
    "any.required": "Participant ID is required.",
  }),
  tripId: Joi.number().integer().required().messages({
    "number.base": "Trip ID must be a number.",
    "number.integer": "Trip ID must be an integer.",
    "any.required": "Trip ID is required.",
  }),
  tripName: Joi.string()
    .trim()
    .pattern(/^[A-Za-zÀ-ÿ\s,.'-]+$/)
    .min(3)
    .max(150)
    .required()
    .messages({
      "string.base": "Trip name must be a string.",
      "string.empty": "Trip name cannot be empty.",
      "string.pattern.base":
        "Destination can only contain letters, spaces, and punctuation.",
      "any.required": "Trip name is required.",
      "string.min": "Trip name must be at least 3 characters.",
      "string.max": "Trip name cannot exceed 150 characters."
    }),
  destination: Joi.string().trim().min(3).max(150).required().messages({
    "string.base": "Destination must be a string.",
    "string.empty": "Destination cannot be empty.",
    "string.min": "Destination must be at least 3 characters.",
    "string.max": "Destination cannot exceed 150 characters.",
    "any.required": "Destination is required.",
  }),
  rating: Joi.number().integer().min(1).max(10).required().messages({
    "number.base": "Rating must be a number.",
    "number.min": "Rating must be at least 1.",
    "number.max": "Rating must not exceed 10.",
    "any.required": "Rating is required.",
  }),
  review: Joi.string().trim().min(3).max(1000).required().messages({
    "string.base": "Review must be a string.",
    "string.empty": "Review cannot be empty.",
    "string.min": "Review must be at least 3 characters.",
    "string.max": "Review cannot exceed 1000 characters.",
    "any.required": "Review is required.",
  }),
});

router
  .route("/")
  .get((req, res, next) => {
    // Query review by participantId
    // http://127.0.0.1:3000/api/reviews?tripId=7&participantId=7
    if (req.query.tripId && req.query.participantId) {
      // Check if the trip exists in reviews
      const trip = reviews.find((r) => r.tripId == req.query.tripId);
      const participant = reviews.find(
        (p) => p.participantId === Number(req.query.participantId)
      );

      if (trip && participant) {
        // Iterate through each review
        reviews.forEach((review) => {
          // If the review participantId matches the query participantId
          if (
            review.participantId === Number(req.query.participantId) &&
            review.tripId === Number(req.query.tripId)
          ) {
            // Display the review with the query match
            res.json(review);
          } else next();
        });
      } else next();
    } else res.json(reviews);
  })
  .post((req, res, next) => {
    const { error } = reviewSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.json(error.details[0].message);
    }

    // Create the passenger
    const review = {
      id: reviews[reviews.length - 1].id + 1,
      ...req.body,
    };

    // Add the review to reviews data array
    reviews.push(review);
    //Display the created passenger
    res.json(review);
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
