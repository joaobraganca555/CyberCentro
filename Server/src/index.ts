const express = require('express');
const app = express();
const cors = require('cors'); 
require('dotenv').config(); // Using .env configs

import { AppDataSource } from "./data-source"
import { BillingAddress } from "./entity/BillingAddress";
import { Customer } from "./entity/Customer";
import { Header } from "./entity/Header";

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new address into the database...")
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