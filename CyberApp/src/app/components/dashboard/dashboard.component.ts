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
      { Year: "2009", Europe: 31, China: 21, USA: 19 },
      { Year: "2010", Europe: 43, China: 26, USA: 24 },
      { Year: "2011", Europe: 66, China: 29, USA: 28 },
      { Year: "2012", Europe: 69, China: 32, USA: 26 },
      { Year: "2013", Europe: 58, China: 47, USA: 38 },
      { Year: "2014", Europe: 40, China: 46, USA: 31 },
      { Year: "2015", Europe: 78, China: 50, USA: 19 },
      { Year: "2016", Europe: 13, China: 90, USA: 52 },
      { Year: "2017", Europe: 78, China: 132, USA: 50 },
      { Year: "2018", Europe: 40, China: 134, USA: 34 },
      { Year: "2019", Europe: 80, China: 96, USA: 38 },
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
