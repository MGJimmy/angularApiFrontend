import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/client/home/home.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { ColorsComponent } from './components/dashboard/colors/colors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderComponent } from './components/dashboard/order/order.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild : [AuthGuard],
    children:[
      {path: 'categories', component: CategoriesComponent},
      {path: 'orders', component: OrderComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'colors', component: ColorsComponent},
    ]
  },
  {
    path:'', 
    component:ClientComponent,
    children:[
      {path: '', component: HomeComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
