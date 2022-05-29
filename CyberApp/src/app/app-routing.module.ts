import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtClientGuard } from './guards/jwt-client.guard';
import { LoginComponent } from './login/login.component';
import { StructureComponent } from './shared/structure/structure.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: StructureComponent, canActivate: [JwtClientGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
