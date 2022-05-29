import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { JwtClientGuard } from './guards/jwt-client.guard';
import { LoginComponent } from './login/login.component';
import { StructureComponent } from './shared/structure/structure.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
  ],component: StructureComponent, canActivate: [JwtClientGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
