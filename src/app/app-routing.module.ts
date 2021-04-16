import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  //{path:'',redirectTo:'/Departments',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {path: "categories", component: CategoriesComponent}
    ]
  },
  {
    path:'',
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
