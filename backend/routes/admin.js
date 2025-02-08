// admin.js
const express = require("express");
const router = express.Router();

// Example route handler function
const exampleHandler = (req, res) => {
  res.send("This is an example route");
};

// Define a GET route
router.get("/example", exampleHandler);

// Export the router
module.exports = router;
