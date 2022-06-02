import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customers/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  topCustomer:any[] = [];
  displayedColumns: string[] = ['Customer ID','Tax ID','Name'];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe((res: any) => {
        this.customers = res;
    });
    this.customerService.getTopCustomers("2022").subscribe((res:any)=>{
        this.topCustomer = res;
        console.log(res);
        
    });
  }

}
