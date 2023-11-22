import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/modules/home/home.module').then(x => x.HomeModule)
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/modules/register/register.module').then(x => x.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/modules/login/login.module').then(x => x.LoginModule)
  },
  {
    path: 'types',
    loadChildren: () => import('src/app/modules/types-tree/types-tree.module').then(x => x.TypesTreeModule)
  },
  {
    path: 'sale-offers',
    loadChildren: () => import('src/app/modules/sale-offers/sale-offers.module').then(x => x.SaleOffersModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
