import { Component, OnInit } from '@angular/core';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliers: any[] = [];
  topSuppliers: any[] = [];
  displayedColumns: string[] = ['Supplier ID', 'Company Name', 'Phone Number'];
  yearsList: string[] = ['2018', '2019', '2020', '2021', '2022'];
  yearValue: string = '';

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.suppliersService.getAllSuppliers().subscribe((res: any) => {
      this.suppliers = res;
    });

    this.yearValue = new Date().getFullYear().toString(); // returns the current year

    this.selectYear(this.yearValue);
  }

  selectYear(year: string) {
    this.yearValue = year;

    this.suppliersService.getTopSuppliers(this.yearValue).subscribe((res) => {
      console.log(res);

      this.topSuppliers = res;
    });
  }

  public chartSliceClickEvent(e: any): void {
    e.args.isExploded = !e.args.isExploded;
  }
}
