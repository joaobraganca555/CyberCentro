import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {LoginComponent} from './login/login.component';
import {StructureComponent} from './shared/structure/structure.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { 
	IgxDataChartCoreModule,
	IgxDataChartVerticalCategoryModule,
	IgxLegendModule,
	IgxDataChartInteractivityModule,
  IgxCategoryChartModule,
  IgxPieChartModule,
  IgxItemLegendModule,
  IgxRingSeriesModule,
  IgxDoughnutChartModule,
 } from "igniteui-angular-charts";
 
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { CustomersComponent } from './components/customers/customers.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    StructureComponent,
    ProductsComponent,
    DashboardComponent,
    SuppliersComponent,
    CustomersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    // Ignite Charts
    IgxDataChartCoreModule,
	  IgxDataChartVerticalCategoryModule,
	  IgxLegendModule,
	  IgxDataChartInteractivityModule,
    IgxCategoryChartModule,
    IgxPieChartModule,
    IgxItemLegendModule,
    IgxRingSeriesModule,
    IgxDoughnutChartModule,
  ],
  providers: [FormBuilder,  
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
