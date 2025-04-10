const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Body parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

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

app.get("/api", (req, res) => {
  res.json("It works");
});

// Port and listen info
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
