import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { SaleOfferDto } from '../models/dto/sale-offer-dto';

@Injectable({
  providedIn: 'root'
})
export class SellersService extends BaseHttpService {

  constructor(http: HttpClient) { 
    super(http, 'sellers');
  }

  getAll() {
    return this.http.get<SaleOfferDto[]>(`${this.rootUrl}getSaleOffers`, { withCredentials: true });
  }
  
  add(model: SaleOfferDto) {
    return this.http.post<SaleOfferDto>(`${this.rootUrl}addSaleOffer`, model, { withCredentials: true });
  }
}
