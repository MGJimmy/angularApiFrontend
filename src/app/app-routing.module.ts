import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild : [AuthGuard],
    children:[
      {path: "categories", component: CategoriesComponent},
      {path: "products", component: ProductsComponent}
    ]
  },
  {
    path:'client',
    component:ClientComponent,
    children:[]
  },
  {path: "**", component: PageNotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
