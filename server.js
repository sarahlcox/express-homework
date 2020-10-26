// require dependencies 
const express = require("express");

// sets up the express app
const app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8081;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require("./routes/notes")(app);
require("./routes/htmlRoutes")(app);

// The below code effectively "starts" our server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });