const express = require('express');
const app = express();
const cors = require('cors'); 
var xmlparser = require("express-xml-bodyparser");

require('dotenv').config(); // Using .env configs

import { AppDataSource } from "./data-source"

var indexRouter = require("./routes/indexRoute");
var authRoute = require("./routes/authRoute");

app.use(cors({
    credentials: true,
    origin: "http://localhost:4200"
}));

app.use(express.json());
app.use(express.static("./public"));
app.use(xmlparser());

app.use("/api", indexRouter);
app.use("/api/auth", authRoute);


AppDataSource.initialize();

// Start Server
app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}...`)
);