import { AppDataSource } from "../data-source";
import { BillingAddress } from "../entity/BillingAddress";
import { Customer } from "../entity/Customer";
import {productInterface} from "./ProductController";
import {Invoice} from "../entity/Invoice";
import {invoiceInterface} from "./InvoiceController";

export const customerInterface:any = {}

const customerRepository = AppDataSource.getRepository(Customer)

customerInterface.insertCustomer = async function(customer: any){
    const billingAddress = new BillingAddress();
    billingAddress.city = customer.BillingAddress[0].City ?? "NOT_DEFINED";
    billingAddress.country = customer.BillingAddress[0].Country ?? "NOT_DEFINED";
    billingAddress.postalCode = customer.BillingAddress[0].PostalCode ?? "NOT_DEFINED";
    billingAddress.addressDetail = customer.BillingAddress[0].AddressDetail ?? "NOT_DEFINED";
    
    await AppDataSource.manager.save(billingAddress);

    const newCustomer = new Customer();
    newCustomer.customerID = customer.CustomerID ?? "NOT_DEFINED";
    newCustomer.companyName = customer.CompanyName ?? "NOT_DEFINED";
    newCustomer.customerTaxID = customer.CustomerTaxID ?? "NOT_DEFINED";
    newCustomer.telephone = customer.Telephone ?? "NOT_DEFINED";
    newCustomer.billingAddress = billingAddress;
   
    await AppDataSource.manager.save(newCustomer);
  };

  customerInterface.findCustomer = async function (customerID:string){
      const customer = await AppDataSource.manager.findOneByOrFail(Customer,{customerID:customerID});
      return customer;
  };


customerInterface.getAllCustomers = async function (req, res) {
    return res.json(await customerRepository.find());
};

module.exports = customerInterface;

