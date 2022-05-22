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

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new address into the database...");
    const header = new Header()
    header.auditFileVersion = "1"
    header.companyName = "lopes"
    header.finishDate = "2015"
    header.fiscalYear = "2017"
    header.startDate = Date.now().toString()

    await AppDataSource.manager.save(header)
    //console.log("Saved a new address with id: " + header)

    console.log("Loading address from the database...")
    const addresss = await AppDataSource.manager.find(Header)
    console.log("Loaded address: ", addresss)

    // Start Server
    app.listen(process.env.PORT, () =>
        console.log(`Server is listening on port ${process.env.PORT}...`)
    );

}).catch(error => console.log(error))