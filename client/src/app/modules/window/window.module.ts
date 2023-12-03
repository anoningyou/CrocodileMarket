import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from './window/window.component';
import { WindowDirective } from './window.directive';



@NgModule({
  declarations: [
    WindowComponent,
    WindowDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WindowDirective,
    WindowComponent
  ]
})
export class WindowModule { }
