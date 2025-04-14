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
  const reviews = [
    {
      id: 1,
      participantId: 1,
      tripId: 7,
      tripName: "Scandinavian Northern Lights Quest",
      destination: "Tromsø, Norway",
      rating: 10,
      review:
        "A dream come true! The aurora borealis was even more stunning in person. Our guide was incredibly knowledgeable and made the trip magical.",
    },
    {
      id: 2,
      participantId: 7,
      tripId: 7,
      tripName: "Scandinavian Northern Lights Quest",
      destination: "Tromsø, Norway",
      rating: 9,
      review:
        "Unforgettable views and a cozy atmosphere. The reindeer sledding was such a unique experience. Would absolutely go again!",
    },
    {
      id: 3,
      participantId: 14,
      tripId: 8,
      tripName: "Moroccan Desert & Culture Tour",
      destination: "Marrakech, Merzouga, Fes – Morocco",
      rating: 9,
      review:
        "Riding camels into the Sahara at sunset was surreal. The markets were vibrant and full of life. A fantastic cultural immersion.",
    },
    {
      id: 4,
      participantId: 21,
      tripId: 8,
      tripName: "Moroccan Desert & Culture Tour",
      destination: "Marrakech, Merzouga, Fes – Morocco",
      rating: 7,
      review:
        "Great mix of adventure and tradition. Some of the travel between cities was long, but the desert night sky made it worth it.",
    },
    {
      id: 5,
      participantId: 25,
      tripId: 9,
      tripName: "New Zealand Adventure Escape",
      destination: "Queenstown, Rotorua, Fiordland – New Zealand",
      rating: 10,
      review:
        "Hands down the best trip I’ve ever taken. From bungee jumping to exploring glowworm caves — every moment was a thrill!",
    },
    {
      id: 6,
      participantId: 9,
      tripId: 9,
      tripName: "New Zealand Adventure Escape",
      destination: "Queenstown, Rotorua, Fiordland – New Zealand",
      rating: 9,
      review:
        "This trip had the perfect mix of nature and adrenaline! The fjord cruise in Milford Sound was peaceful and scenic, and the geothermal parks in Rotorua were fascinating. A must-do for outdoor lovers.",
    },
    {
      id: 7,
      participantId: 4,
      tripId: 10,
      tripName: "African Safari Expedition",
      destination: "Kenya & Tanzania",
      rating: 10,
      review:
        "Incredible experience! Seeing the 'Big Five' in the wild was unforgettable. The Serengeti and Ngorongoro Crater were highlights of the trip.",
    },
    {
      id: 8,
      participantId: 19,
      tripId: 10,
      tripName: "African Safari Expedition",
      destination: "Kenya & Tanzania",
      rating: 9,
      review:
        "A once-in-a-lifetime trip. The game drives were thrilling, and our guide was fantastic. A bit dusty in the safari vehicles, but the wildlife made up for it.",
    },
    {
      id: 9,
      participantId: 33,
      tripId: 11,
      tripName: "Mediterranean Coastal Escape",
      destination: "Spain, Italy, Greece",
      rating: 8,
      review:
        "Amazing mix of stunning coastlines, ancient ruins, and delicious food. Barcelona and Athens were fantastic, and I loved relaxing in the Mediterranean sun.",
    },
    {
      id: 10,
      participantId: 33,
      tripId: 11,
      tripName: "Mediterranean Coastal Escape",
      destination: "Spain, Italy, Greece",
      rating: 7,
      review:
        "Great trip overall, but there was a bit too much time spent in travel between cities. However, the Amalfi Coast and Santorini were worth it.",
    },
  ];

  res.render("reviews", {reviews});
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
