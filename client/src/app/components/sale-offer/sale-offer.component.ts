import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { SellersService } from 'src/app/services/sellers.service';
import { SaleOfferDto } from 'src/app/models/dto/sale-offer-dto';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { WindowModule } from 'src/app/modules/window/window.module';
import { ModalByDirectiveModule } from 'src/app/modules/modal-by-directive/modal-by-directive.module';

@Component({
  selector: 'app-sale-offer',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalByDirectiveModule, WindowModule],
  templateUrl: './sale-offer.component.html',
  styleUrls: ['./sale-offer.component.scss'],
})
export class SaleOfferComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  offer = signal<SaleOfferDto | null>(null);
  randomId = signal<string | undefined>(undefined);
  public showWindow: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sellersService: SellersService,
    private toastr: ToastrService  ) {}

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe(
      (data: ParamMap) => {
        const id = data.get('id');
        if (!!id) {
          this.sellersService.getSaleOffer(id).subscribe({
            next: (data: SaleOfferDto) => {
              this.offer.set(data)
            },
            error: _ => {
              this.toastr.error("Not found");
              this.offer.set(null);
            }
          })

          this.subscriptions.push(this.sellersService.getAll().subscribe(offers => {
            if (offers.length)
              this.randomId.set(offers[Math.floor(Math.random() * (offers.length -1))].id);
          }));
        }
        else {
          this.toastr.error("Id is undefined");
          this.offer.set(null);
        }
      }
    );

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (!!subscription)
      subscription.unsubscribe();
    });
  }

  public onShowWindows() {

    this.showWindow = true;
  }

  public closeDialog(event: boolean) {
    this.showWindow = false;
    if (event) {
      this.toastr.success("You have bought your own crocodile!", "Congratulations!")
    }
  }
}
