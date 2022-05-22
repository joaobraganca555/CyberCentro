var express = require("express");
var parserRoute = require("./parserRoute");
var router = express.Router();

//Map all route files here.
router.use("/parser", parserRoute);

module.exports = router;
