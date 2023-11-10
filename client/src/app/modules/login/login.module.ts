import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InputModule } from '../input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }
