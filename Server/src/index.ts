const express = require('express');
const app = express();
const cors = require('cors'); 
var xmlparser = require("express-xml-bodyparser");

require('dotenv').config(); // Using .env configs

import { AppDataSource } from "./data-source"
import { Header } from "./entity/Header";

var indexRouter = require("./routes/indexRoute");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(xmlparser());

app.use("/api/v1", indexRouter);


AppDataSource.initialize();

// Start Server
app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}...`)
);