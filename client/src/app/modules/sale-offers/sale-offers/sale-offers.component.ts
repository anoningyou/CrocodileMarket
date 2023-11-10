import { Component, OnInit } from '@angular/core';
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

  offers: SaleOfferDto [] = [];

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
    });
  }

  addOffer() {
    const values = this.addForm.value;
    const data = {
      id: crypto.randomUUID(),
      name: values['name'],
      price: values['price'],
    } as SaleOfferDto;

    const item = this.sellersService.add(data).subscribe({next: data=>{
      this.toastr.success("Offer added successfully");
      this.offers.push(data);
      this.addForm?.reset();
    }})
  }

  loadOffers() {
    this.sellersService.getAll().subscribe(data => {
      this.offers = data;
    })
  }

}
