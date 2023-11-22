import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesTreeComponent } from './types-tree/types-tree.component';
import { TypesTreeRoutingModule } from './types-tree-routing.module';
import { DropdownTreeModule } from '../dropdown-tree/dropdown-tree.module';



@NgModule({
  declarations: [
    TypesTreeComponent
  ],
  imports: [
    CommonModule,
    TypesTreeRoutingModule,
    DropdownTreeModule
  ],
  exports: [
    TypesTreeComponent
  ],
})
export class TypesTreeModule { }
