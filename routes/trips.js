const express = require("express");
const router = express.Router();

// import trips data
const trips = require("../data/trips");

// import error handling middleware
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    // Display all trips
    res.json(trips);
  })
  .post((req, res) => {
    // Check if all requirements are included to create a trip
    if (
      req.body.tripName &&
      req.body.destination &&
      req.body.startDate &&
      req.body.endDate &&
      req.body.price
    ) {
      // Check if a trip Name already exists
      if (trips.find((t) => t.tripName === req.body.tripName)) {
        return res.json({ Error: "Trip Name already taken" });
      }
      //Create the trip
      const trip = {
        id: trips[trips.length - 1].id + 1,
        ...req.body,
      };
      //Add the trip to trips data
      trips.push(trip);
      // Display the created trip
      res.json(trip);
    } else res.json({ Error: "Insufficient Data" });
  });

router.route("/:id")
.get((req, res) => {
    const trip = trips.find((t) => t.id == req.params.id);

    if(trip) res.json(trip)
    else next();
})
.patch((req, res, next) => {
  // Find the trip
  const trip = trips.find((t, i) => {
    // If the trip exists
    if (t.id == req.params.id) {
      //Iterate over the req.body
      for (const key in req.body) {
        // Update
        trips[i][key] = req.body[key];
      }
      return true
    }
  });
  // Display the update review if the review exists
  if (trip) res.json(trip);
  else next();
});
module.exports = router;
