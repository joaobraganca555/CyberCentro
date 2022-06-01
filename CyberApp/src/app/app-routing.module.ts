import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { JwtClientGuard } from './guards/jwt-client.guard';
import { LoginComponent } from './login/login.component';
import { StructureComponent } from './shared/structure/structure.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
  ],component: StructureComponent, canActivate: [JwtClientGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
