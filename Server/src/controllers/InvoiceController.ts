import { AppDataSource } from "../data-source";
import { Invoice } from "../entity/Invoice";

export const invoiceInterface:any = {}

invoiceInterface.insertInvoice = async function(invoice: any){
    console.log(invoice);
    const invoiceLines = [];
    

    const newInvoice = new Invoice();
    newInvoice.invoiceNo = invoice.InvoiceNo ?? "NOT_DEFINED";
    newInvoice.grossTotal = invoice.ProductNumberCode ?? "NOT_DEFINED";
    newInvoice.invoiceDate = invoice.InvoiceDate ?? "NOT_DEFINED";
    newInvoice.invoiceStatus = invoice.ProductGroup ?? "NOT_DEFINED";
    newInvoice.paymentDate = invoice.ProductGroup ?? "NOT_DEFINED";
    newInvoice.paymentMechanism = invoice.ProductGroup ?? "NOT_DEFINED";
    newInvoice.invoiceType = invoice.InvoiceType ?? "NOT_DEFINED";
    newInvoice.invoiceLines = invoiceLines;

    //await AppDataSource.manager.save(newProduct);
  };
