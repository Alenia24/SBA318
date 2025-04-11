const express = require("express");
const router = express.Router();

// import ite data
const itenaries = require("../data/itenaries");

// import error handling middleware
const error = require("../utilities/error");

router.route("/")
.get((req, res) => {
    res.json(itenaries)
}).post((req, res) => {
    // Check if all requirements are included to create an itenary
    if(req.body.tripId && req.body.name && req.body.duration && req.body.location && req.body.description){
      // Check if a itenary Name already exists
      if (itenaries.find((i) => i.name === req.body.name)) {
        return res.json({ Error: "Itenary Name already taken" });
      }
      // Create the itenary
      const itenary = {
        id: itenaries[itenaries.length - 1].id + 1,
        ...req.body,
      };
      //Add the itenary to itenaries data
      itenaries.push(itenary);
      // Display the created titenary
      res.json(itenary);
    } else res.json({Error: "Insufficient Data"})
})

router.route("/:id")
.get((req, res) => {
    const itenary = itenaries.find((i) => i.id == req.params.id);

    if(itenary) res.json(itenary)
    else next();
})
.patch((req, res, next) => {
  // Find the titenary
  const itenary = itenaries.find((i, j) => {
    // If the trip exists
    if (i.id == req.params.id) {
      //Iterate over the req.body
      for (const key in req.body) {
        // Update
        itenaries[j][key] = req.body[key];
      }
      return true;
    }
  });
  // Display the update review if the review exists
  if (itenary) res.json(itenary);
  else next();
});

module.exports = router;