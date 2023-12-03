import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SaleOfferDto } from '../models/dto/sale-offer-dto';

@Injectable({
  providedIn: 'root'
})
export class SellersService extends BaseHttpService {

  constructor(http: HttpClient) { 
    super(http, 'sellers');
  }

  getAll() {
    return this.http.get<SaleOfferDto[]>(`${this.rootUrl}getSaleOffers`);
  }

  getUserSales() {
    return this.http.get<SaleOfferDto[]>(`${this.rootUrl}getUserSales`);
  }
  
  add(model: SaleOfferDto) {
    return this.http.post<SaleOfferDto>(`${this.rootUrl}addSaleOffer`, model);
  }

  edit(model: SaleOfferDto) {
    return this.http.put<SaleOfferDto>(`${this.rootUrl}editOffer`, model);
  }

  remove(id: string) {
    const params = new HttpParams()
        .set('id', id);
    return this.http.delete<boolean>(`${this.rootUrl}removeSaleOffer`, { params });
  }

  getSaleOffer(id: string) {
    const params = new HttpParams()
        .set('id', id);
    return this.http.get<SaleOfferDto>(`${this.rootUrl}getSaleOffer`, { params});
  }
  
}
