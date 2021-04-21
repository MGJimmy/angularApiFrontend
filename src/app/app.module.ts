import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { ClientComponent } from './components/client/client.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { ClientFooterComponent } from './components/client/client-footer/client-footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardSidebarComponent } from './components/dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { ConfirmModalComponent } from './components/_reusableComponents/confirm-modal/confirm-modal.component';
import { OrderComponent } from './components/dashboard/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { UploadComponent } from './components/_reusableComponents/upload/upload.component';
import { HomeComponent } from './components/client/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    ClientComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    PageNotFoundComponent,
    DashboardSidebarComponent,
    CategoriesComponent,
    LoginComponent,
    ConfirmModalComponent,
    OrderComponent,
    RegisterComponent,
    ProductsComponent,
    UsersComponent,
    UploadComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }