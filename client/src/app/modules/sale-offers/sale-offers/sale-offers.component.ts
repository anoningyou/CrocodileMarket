import { Component, OnInit, signal } from '@angular/core';
import { ValueTypeEnum } from 'src/app/enums/value-type';
import { SaleOfferDto } from 'src/app/models/dto/sale-offer-dto';
import { SellersService } from 'src/app/services/sellers.service';

@Component({
  selector: 'app-sale-offers',
  templateUrl: './sale-offers.component.html',
  styleUrls: ['./sale-offers.component.scss'],
})
export class SaleOffersComponent implements OnInit {
  valueType: typeof ValueTypeEnum = ValueTypeEnum;

  offers = signal<SaleOfferDto[]>([]);

  constructor(public sellersService: SellersService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.sellersService.getAll().subscribe((data) => {
      this.offers.set(data);
    });
  }
}
