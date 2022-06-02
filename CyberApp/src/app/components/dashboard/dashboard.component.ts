import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customers/customer.service';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalGross: number = 0;
  customersNumber: number = 0;
  grossByZone: any[] = [];
  totalGrossByMonth: any[] = [];

  yearsList: string[] = ['2018', '2019', '2020', '2021', '2022'];
  yearValue: string = '';

  constructor(
    private invoicesService: InvoicesService,
    private customerService: CustomerService,
    private suppliersService: SuppliersService
  ) {}

  ngOnInit(): void {
    this.invoicesService.getTotalGross().subscribe((res) => {
      this.totalGross = Math.round((res + Number.EPSILON) * 100) / 100;
    });

    this.customerService.getAllCustomers().subscribe((customers: any) => {
      this.customersNumber = customers.length;
    });

    this.yearValue = new Date().getFullYear().toString(); // returns the current year

    this.invoicesService
      .getTotalGrossByZone(this.yearValue)
      .subscribe((res) => {
        this.grossByZone = res;
      });

    this.invoicesService
      .getTotalGrossByYearAndMonth(this.yearValue)
      .subscribe((res) => {
        this.totalGrossByMonth = res;
      });
  }

  selectYear(year: string) {
    this.yearValue = year;
    this.invoicesService
      .getTotalGrossByZone(this.yearValue)
      .subscribe((res: any) => {
        this.grossByZone = res;
      });
    this.invoicesService
      .getTotalGrossByYearAndMonth(this.yearValue)
      .subscribe((res) => {
        this.totalGrossByMonth = res;
      });
  }
}
