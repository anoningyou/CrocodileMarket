import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleOffersComponent } from './sale-offers/sale-offers.component';

const routes: Routes = [
  {
    path: '',
    component: SaleOffersComponent
  },
  {
    path: 'offer/:id',
    loadComponent: () => import('src/app/components/sale-offer/sale-offer.component').then(c => c.SaleOfferComponent)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOffersRoutingModule { }
