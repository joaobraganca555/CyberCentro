import { AppDataSource } from "../data-source";
import { BillingAddress } from "../entity/BillingAddress";
import { Customer } from "../entity/Customer";

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

customerInterface.getTopProductsByQuantity = async function (req, res) {
  res.json(await customerRepository
      .query("SELECT * FROM customer LEFT JOIN\n" +
          "    (SELECT sum(CAST(quantity AS float)) as soma, customerID FROM customer\n" +
          "        LEFT JOIN invoice ON customer.customerID = invoice.customerCustomerID\n" +
          "        LEFT JOIN invoice_line ON invoice.invoiceNo = invoice_line.invoiceInvoiceNo\n" +
          "        WHERE invoice_line.productProductCode IS NOT NULL\n" +
          "        AND invoiceDate > CAST( @0 as DATE) \n" +
          "        AND invoiceDate < CAST( @1 as DATE) \n" +
          "        GROUP by customerID\n" +
          "    ) AS s ON s.customerID = customer.customerID           \n" +
          "ORDER BY soma\n" +
          "DESC",
          [req.params.date.toString(),(parseInt(req.params.date)+1).toString()]));
};

//module.exports = customerInterface;
