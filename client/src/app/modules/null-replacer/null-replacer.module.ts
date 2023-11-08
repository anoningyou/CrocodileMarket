import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullReplacerPipe } from './null-replacer.pipe';



@NgModule({
  declarations: [
    NullReplacerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NullReplacerPipe
  ],
})
export class NullReplacerModule { }
