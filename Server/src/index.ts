const express = require('express');
const app = express();
const cors = require('cors'); 
require('dotenv').config(); // Using .env configs

import { AppDataSource } from "./data-source"
import { Address } from "./entity/Address";

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new address into the database...")
    const address = new Address()
    address.City = "Porto"
    address.Country = "Portugal"
    address.PostalCode = "4610-102"
    address.Region = "Felgueiras"
    address.StreetName = "Rua do Caralho"

    await AppDataSource.manager.save(address)
    console.log("Saved a new address with id: " + address.AddressID)

    console.log("Loading address from the database...")
    const addresss = await AppDataSource.manager.find(Address)
    console.log("Loaded address: ", addresss)

    // Start Server
    app.listen(process.env.PORT, () =>
        console.log(`Server is listening on port ${process.env.PORT}...`)
    );

}).catch(error => console.log(error))