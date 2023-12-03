import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalByDirectiveComponent } from './modal-by-directive/modal-by-directive.component';
import { ModalContainerModule } from 'src/app/modules/common-ui/modal-container/modal-container.module';
import { WindowModule } from '../window/window.module';

@NgModule({
  declarations: [
    ModalByDirectiveComponent
  ],
  imports: [
    CommonModule,
    ModalContainerModule,
    WindowModule
  ],
  exports: [
    ModalByDirectiveComponent
  ]
})
export class ModalByDirectiveModule { }
