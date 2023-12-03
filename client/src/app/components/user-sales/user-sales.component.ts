import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellersService } from 'src/app/services/sellers.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SaleOfferDto } from 'src/app/models/dto/sale-offer-dto';
import { RouterModule } from '@angular/router';
import { DialogConfig } from 'src/app/modules/dialog/dialog-config';
import { DialogModule } from 'src/app/modules/dialog/dialog.module';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { AddOrUpdateSaleOfferComponent } from '../add-or-update-sale-offer/add-or-update-sale-offer.component';

@Component({
  selector: 'app-user-sales',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule],
  templateUrl: './user-sales.component.html',
  styleUrls: ['./user-sales.component.scss']
})
export class UserSalesComponent implements OnInit {

  offers = signal<SaleOfferDto[]>([]);

  constructor(public sellersService: SellersService,
    private toastr: ToastrService,
    private dialog: DialogService
     ){}
     
  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.sellersService.getAll().subscribe(data => {
      this.offers.set(data);
    });
  }

  removeOffer(id: string | undefined) {
    if (!!id) {
      this.sellersService.remove(id).subscribe({
        next: (result: boolean) => {
          if (result) {
            console.log(id)
            this.offers.update((value: SaleOfferDto[]) => {
              value = value.filter(o => o.id !== id);
              return value;
            });
            console.log(this.offers())
          }
          else {
            this.toastr.error('Deletion failed')
          }
        }
      });
    } 
  }

  addOffer() {
    let config = new DialogConfig('Add sale offer', null, '400px', 'auto');
    
    this.dialog.open(AddOrUpdateSaleOfferComponent, config)
            .afterClosed
            .subscribe((result: SaleOfferDto) => {
                if (result) {
                    this.offers.update(offers => {
                      offers.push(result);
                      return offers;
                    })
                }
            });
  }

  editOffer(offer: SaleOfferDto) {
    let config = new DialogConfig('Edit sale offer', offer, '400px', 'auto');
    
    this.dialog.open(AddOrUpdateSaleOfferComponent, config)
            .afterClosed
            .subscribe((result: SaleOfferDto) => {
                if (result) {
                    this.offers.update(offers => {
                      const index = offers.findIndex(o => o.id === result.id);
                      if (index !== -1)
                        offers[index] = result;
                      return offers;
                    })
                }
            });
  }
}
