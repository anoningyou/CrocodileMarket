import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValueTypeEnum } from 'src/app/enums/value-type';
import { SaleOfferDto } from 'src/app/models/dto/sale-offer-dto';
import { SellersService } from 'src/app/services/sellers.service';

@Component({
  selector: 'app-sale-offers',
  templateUrl: './sale-offers.component.html',
  styleUrls: ['./sale-offers.component.scss']
})
export class SaleOffersComponent implements OnInit {

  addForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  valueType: typeof ValueTypeEnum = ValueTypeEnum;

  offers = signal<SaleOfferDto[]>([]);

  constructor(public sellersService: SellersService,
    private fb: FormBuilder,
    private toastr: ToastrService
     ){}
     
  ngOnInit(): void {
    this.initializeForm();
    this.loadOffers();
  }

  initializeForm() {
    this.addForm = this.fb.group({
      name: ['',Validators.required],
      price: ['', [Validators.required]],
      description: [''],
    });
  }

  addOffer() {
    const values = this.addForm.value;
    const data = {
      name: values['name'],
      price: values['price'],
    } as SaleOfferDto;

    this.sellersService.add(data).subscribe({
      next: data=>{
        this.toastr.success("Offer added successfully");
        this.offers.update(values => {
          values.push(data);
          return values;
        });
        this.addForm?.reset();
      }
    });
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

}
