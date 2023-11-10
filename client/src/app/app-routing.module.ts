import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { RegisterComponent } from './modules/register/register/register.component';
import { TypesTreeComponent } from './modules/types-tree/types-tree/types-tree.component';
import { LoginComponent } from './modules/login/login/login.component';
import { SaleOffersComponent } from './modules/sale-offers/sale-offers/sale-offers.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'types', component: TypesTreeComponent},
  {path: 'sale-offers', component: SaleOffersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
