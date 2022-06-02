import "reflect-metadata";
import { DataSource } from "typeorm";
import { BillingAddress } from "./entity/BillingAddress";
import { Customer } from "./entity/Customer";
import { Header } from "./entity/Header";
import { Invoice } from "./entity/Invoice";
import { InvoiceLine } from "./entity/InvoiceLine";
import { Product } from "./entity/Product";
import { Purchase } from "./entity/Purchase";
import { Supplier } from "./entity/Supplier";
import { User } from "./entity/User";

//Using .env configs
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mssql", //Can't be used from .env
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    BillingAddress,
    Customer,
    Invoice,
    InvoiceLine,
    Supplier,
    Product,
    User,
    Purchase
  ],
  migrations: ["migration/*.ts"],
  subscribers: [],
});

// Can be initializated here!
