import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {MainComponent} from './shared/main/main.component';
import {LoginComponent} from './login/login.component';
import {StructureComponent} from './shared/structure/structure.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IgxLegendModule} from "igniteui-angular-charts";
import {IgxCategoryChartModule} from "igniteui-angular-charts";
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    LoginComponent,
    StructureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    IgxCategoryChartModule,
    IgxLegendModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
