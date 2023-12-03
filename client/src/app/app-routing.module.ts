import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
    loadChildren: () => import('src/app/modules/sale-offers/sale-offers.module').then(x => x.SaleOffersModule),
    canActivate: [authGuard]
  },
  {
    path: 'my-sales',
    loadComponent: () => import('src/app/components/user-sales/user-sales.component').then(x => x.UserSalesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'not-found',
    loadComponent: () => import('src/app/components/errors/not-found/not-found.component').then(x => x.NotFoundComponent),
  },
  {
    path: 'server-error', 
    loadComponent: () => import('src/app/components/errors/server-error/server-error.component').then(x => x.ServerErrorComponent),
  },
  {
    path: '**',
    loadComponent: () => import('src/app/components/errors/not-found/not-found.component').then(x => x.NotFoundComponent),
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
