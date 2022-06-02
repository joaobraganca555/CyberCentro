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
  yearsList: string[] = ['2018','2019','2020','2021','2022'];
  yearValue: string = '';

  constructor(private customerService: CustomerService) { 
  }

  ngOnInit(): void {
    this.yearValue = new Date().getFullYear().toString();  // returns the current year

    this.customerService.getAllCustomers().subscribe((res: any) => {
        this.customers = res;
    });

    this.customerService.getTopCustomers(this.yearValue).subscribe((res:any)=>{
      this.topCustomer = res;  
    });
  }

  selectYear(year: string) {
    this.yearValue = year;
    this.customerService.getTopCustomers(this.yearValue).subscribe((res:any)=>{
      this.topCustomer = res;  
    });
  }

}
