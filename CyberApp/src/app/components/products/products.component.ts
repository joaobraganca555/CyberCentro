import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from '../../models/product';
import { ProductTop } from '../../models/product-top';
import { ProductTopGross } from '../../models/product-top-gross';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  topProductsQuantity: ProductTop[] = [];
  topProductsGross: ProductTopGross[] = [];
  totalGrossByFamily: any[] = [];
  dataGoogle: any[] = [];
  flag: boolean = false;

  displayedColumns: string[] = ['Code', 'Group', 'Description'];
  yearsList: string[] = ['2018', '2019', '2020', '2021', '2022'];
  yearValue: string = '';

  pieChart: any = {};

  constructor(
    private productsService: ProductsService,
    private invoicesService: InvoicesService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.products = res;
    });

    this.yearValue = new Date().getFullYear().toString(); // returns the current year

    this.selectYear(this.yearValue);
  }

  selectYear(year: string) {
    this.yearValue = year;
    this.productsService
      .getTopProductsByQuantity(this.yearValue)
      .subscribe((res: any) => {
        this.topProductsQuantity = res;
      });
    this.productsService
      .getTopProductsByGross(this.yearValue)
      .subscribe((res: ProductTopGross[]) => {
        this.topProductsGross = res.slice(0, 10);
      });
    this.invoicesService
      .getTotalGrossByFamily(this.yearValue)
      .subscribe((res: any) => {
        this.totalGrossByFamily = res;
        this.dataGoogle.push(['Product Group', 'Total']);
        this.totalGrossByFamily.forEach((element) => {
          this.dataGoogle.push([element.productGroup, element.total]);
        });

        this.pieChart = {
          chartType: GoogleChartType.PieChart,
          dataTable: this.dataGoogle,
          //firstRowIsData: true,
          options: {
            title: 'Gross by family',
            chartArea: {
              height: '100%',
              width: '100%',
              top: 48,
              left: 48,
              bottom: 10,
            },
            width: '100%',
            height: 300,
          },
        };

        this.flag = true;
      });
  }
}
