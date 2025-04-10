const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Import routes
const trips = require("./routes/trips");
const itenary = require("./routes/itenary");
const passengers = require("./routes/passenger");
const error = require("./utilities/error");

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----${time.toLocaleTimeString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );
  next();
});

// Routes
app.use("/api/trips", trips);
app.use("/api/itenary", itenary);
app.use("/api/passengers", passengers);

app.get("/", (req, res) => {
  res.json("It works");
});

// 404 Middleware
app.use((req, res) => {
  res.status(404);
  res.json({Error: "Resource Not Found" });
});

// Port and listen info
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
