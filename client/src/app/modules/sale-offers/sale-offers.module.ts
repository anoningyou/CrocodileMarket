import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleOffersComponent } from './sale-offers/sale-offers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input/input.module';
import { SaleOffersRoutingModule } from './sale-offers-routing.module';



@NgModule({
  declarations: [
    SaleOffersComponent
  ],
  imports: [
    CommonModule,
    SaleOffersRoutingModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SaleOffersComponent
  ],
})
export class SaleOffersModule { }
