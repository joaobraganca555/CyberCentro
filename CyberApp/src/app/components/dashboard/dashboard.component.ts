import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalGross: number = 0;
  customersNumber: number = 0;
  grossByZone: any[] = [];

  public data: any[];

  public data3: any;

  constructor(private invoicesService: InvoicesService, private customerService: CustomerService) {
    this.data = [
      { Year: "2009", Europe: 31 },
      { Year: "2010", Europe: 43 },
      { Year: "2011", Europe: 66 },
      { Year: "2012", Europe: 69 },
      { Year: "2013", Europe: 58 },
      { Year: "2014", Europe: 40 },
      { Year: "2015", Europe: 78 },
      { Year: "2016", Europe: 13 },
      { Year: "2017", Europe: 78 },
      { Year: "2018", Europe: 40 },
      { Year: "2019", Europe: 80 },
    ];

    this.data3 = [
      { Value: 25, Label: "Residential" },
      { Value: 12, Label: "Heating" },
      { Value: 11, Label: "Lighting" },
      { Value: 18, Label: "Other" },
      { Value: 37, Label: "Cooling" }
  ];
  }

  ngOnInit(): void {
    this.invoicesService.getTotalGross().subscribe((res) => {
      this.totalGross = Math.round((res + Number.EPSILON) * 100) / 100;
    });

    this.customerService.getAllCustomers().subscribe((customers: any) => {this.customersNumber = customers.length})

    this.invoicesService.getTotalGrossByZone().subscribe((res)=>{this.grossByZone = res; console.log(res);
    })
  }

}
