const express = require("express");
const router = express.Router();

// import reviews data
const passengers = require("../data/passengers");

// import error handling middleware
const error = require("../utilities/error");

//router.route("/")
//.get((req, res) => {
//    res.json(`Passenger router`)
//})

router.route("/").post((req, res) => {
  // Check if all requirements are included to create a passenger
  if (
    req.body.tripId &&
    req.body.name &&
    req.body.email &&
    req.body.telephone &&
    req.body.address &&
    req.body.emergencyContact &&
    req.body.passportNumber
  ) {
    // Create the passenger
    const passenger = {
      id: passengers[passengers.length - 1].id + 1,
      ...req.body,
    };
    // Add the passenger to passengers data array
    passengers.push(passenger);
    //Display the created passenger
    res.json(passenger);
  } else res.json({ Error: "Insufficient Data" });
});

router
  .route("/:id")
  .get((req, res) => {
    const passenger = passengers.find((p) => p.id == req.params.id);

    if (passenger) res.json(passenger);
    else next();
  })
  .patch((req, res, next) => {
    // Find the passenger
    const passenger = passengers.find((p, i) => {
      // If the trip exists
      if (p.id == req.params.id) {
        //Iterate over the req.body
        for (const key in req.body) {
          // Update
          passengers[i][key] = req.body[key];
        }
        return true;
      }
    });
    // Display the update review if the review exists
    if (passenger) res.json(passenger);
    else next();
  });

module.exports = router;
