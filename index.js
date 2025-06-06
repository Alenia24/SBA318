const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const app = express();
const port = 3000;

// serve static files from the styles directory
app.use(express.static("./styles"));
app.use(express.static("./assets"));


// Import routes
const trips = require("./routes/trips");
const itenary = require("./routes/itenaries");
const passengers = require("./routes/passengers");
const reviews = require("./routes/reviews");

const reviewsData = require("./data/reviews");
const tripsData = require("./data/trips");
const itenariesData = require("./data/itenaries");


// Import error middleware
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
app.use("/api/itenaries", itenary);
app.use("/api/passengers", passengers);
app.use("/api/reviews", reviews);

// Set up view engine
app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/reviews", (req, res) => {
  res.render("reviews", {reviewsData});
});

app.get("/trips", (req, res) => {
  res.render("trips", { tripsData });
});

app.get("/itenaries", (req, res) => {
  res.render("itenaries", { itenariesData });
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
