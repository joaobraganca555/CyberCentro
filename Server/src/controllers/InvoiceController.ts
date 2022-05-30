import { AppDataSource } from "../data-source";
import { Invoice } from "../entity/Invoice";
import { InvoiceLine } from "../entity/InvoiceLine";
import { Product } from "../entity/Product";
import { ErrorHandler } from "../utils/ErrorHandler";
import { customerInterface } from "./CustomerController";
import { productInterface } from "./ProductController";

const invoiceRepository = AppDataSource.getRepository(Invoice)

export const invoiceInterface: any = {};

invoiceInterface.insertInvoiceLine = async (invoiceLineData:any,product: Product,invoice:Invoice) =>{
    const invoiceLine: InvoiceLine = new InvoiceLine();
    invoiceLine.quantity = invoiceLineData.Quantity;
    invoiceLine.taxBase = invoiceLineData.Tax[0].TaxPercentage;
    invoiceLine.unitOfMeasure = invoiceLineData.UnitOfMeasure;
    invoiceLine.unitPrice = invoiceLineData.UnitPrice;
    invoiceLine.product = product;
    invoiceLine.invoice = invoice;

    await AppDataSource.manager.save(invoiceLine);
};

invoiceInterface.insertInvoice = async (invoice: any) => {
  const newInvoice:Invoice = new Invoice();

  try {
    const customer = await customerInterface.findCustomer(invoice.CustomerID);
    newInvoice.customer = customer;
    newInvoice.invoiceNo = invoice.InvoiceNo ?? "NOT_DEFINED";
    newInvoice.grossTotal = invoice.DocumentTotals[0].GrossTotal ?? "NOT_DEFINED";
    newInvoice.invoiceDate = invoice.InvoiceDate ?? "NOT_DEFINED";
    newInvoice.invoiceStatus = invoice.DocumentStatus[0].InvoiceStatus ?? "NOT_DEFINED";
    newInvoice.paymentDate = invoice.unknown ?? "NOT_DEFINED";
    newInvoice.paymentMechanism = invoice.unknown ?? "NOT_DEFINED";
    newInvoice.invoiceType = invoice.InvoiceType ?? "NOT_DEFINED";

    await AppDataSource.manager.save(newInvoice);

    for(let element of invoice.Line) {
        const product: Product = await productInterface.findProduct(element.ProductCode);
        await invoiceInterface.insertInvoiceLine(element,product,newInvoice);
      };
  } catch (error) {
    ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
  }
};

invoiceInterface.getAllInvoices = async function (req, res) {

    const allInvoices = await invoiceRepository.find()
    console.log("Invoices: ", allInvoices)

    return res.json(allInvoices);

};

invoiceInterface.getTotalGross = async function (req, res) {

    const allInvoices = await invoiceRepository.find()

    return res.json(allInvoices.reduce((totalGross, invoice)=> parseFloat(invoice.grossTotal) + totalGross,0));

};

invoiceInterface.getTotalGrossByYearAndMonth = async function (req, res) {

    const allInvoices = await invoiceRepository.find()

    let date = new Date(req.body.date);

    let number = allInvoices.filter(invoice =>
            new Date(invoice.invoiceDate).getMonth() == date.getMonth() &&
            new Date(invoice.invoiceDate).getFullYear() == date.getFullYear())
        .reduce((totalGross, invoice)=> parseFloat(invoice.grossTotal) + totalGross,0);

    return res.json(number);

};


module.exports = invoiceInterface;





