import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from 'src/app/modules/input/input.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValueTypeEnum } from 'src/app/enums/value-type';
import { SellersService } from 'src/app/services/sellers.service';
import { ToastrService } from 'ngx-toastr';
import { SaleOfferDto } from 'src/app/models/dto/sale-offer-dto';
import { DialogConfig } from 'src/app/modules/dialog/dialog-config';
import { DialogRef } from 'src/app/modules/dialog/dialog-ref';

@Component({
  selector: 'app-add-sale-offer',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-or-update-sale-offer.component.html',
  styleUrls: ['./add-or-update-sale-offer.component.scss']
})
export class AddOrUpdateSaleOfferComponent {

  data?: SaleOfferDto;
  addForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  valueType: typeof ValueTypeEnum = ValueTypeEnum;
  
  constructor(public sellersService: SellersService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private config: DialogConfig<SaleOfferDto>,
    public dialog: DialogRef
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.data = this.config.modelData;
    this.addForm = this.fb.group({
      name: [this.data?.name,Validators.required],
      price: [this.data?.price, [Validators.required]],
      description: [this.data?.description],
    });
  }

  safeOffer() {
    const values = this.addForm.value;
    const data = {
      name: values['name'],
      price: values['price'],
      description: values['description'],
    } as SaleOfferDto;

    if (!!this.data?.id){
      data.id = this.data.id;
      this.sellersService.edit(data).subscribe({
        next: data=>{
          this.toastr.success("Offer was updated successfully");
          this.dialog.close(data);
        }
      });
    }
    else {
      this.sellersService.add(data).subscribe({
        next: data=>{
          this.toastr.success("Offer was added successfully");
          this.dialog.close(data);
        }
      });
    }

    
  }
}
