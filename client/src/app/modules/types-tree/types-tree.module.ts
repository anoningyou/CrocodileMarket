import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesTreeComponent } from './types-tree/types-tree.component';
import { DropdownTreeModule } from '../dropdown-tree/dropdown-tree.module';



@NgModule({
  declarations: [
    TypesTreeComponent
  ],
  imports: [
    CommonModule,
    DropdownTreeModule
  ],
  exports: [
    TypesTreeComponent
  ],
})
export class TypesTreeModule { }
