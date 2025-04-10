const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----${time.toLocaleTimeString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );
  next();
});

app.get("/", (req, res) => {
  res.json("It works");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
