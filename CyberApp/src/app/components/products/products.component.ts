import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from '../../models/product';
import { ProductTopQuantity } from '../../models/product-top-quantity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  topProductsQuantity: ProductTopQuantity[] = [];

  displayedColumns: string[] = ['Code','Group','Description'];
  yearsList: string[] = ['2018','2019','2020','2021','2022'];
  yearValue: string = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.products = res;
    });

    this.yearValue = new Date().getFullYear().toString()  // returns the current year

    this.productsService.getTopProductsByQuantity(this.yearValue).subscribe((res: any) => {
      this.topProductsQuantity = res;
    })
  }

  selectYear(year: string) {
    this.yearValue = year;
    this.productsService.getTopProductsByQuantity(this.yearValue).subscribe((res: any) => {
      this.topProductsQuantity = res;
    })
  }

}
