import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTreeComponent } from './dropdown-tree/dropdown-tree.component';
import { DropdownTreeNodeModule } from '../dropdown-tree-node/dropdown-tree-node.module';



@NgModule({
  declarations: [
    DropdownTreeComponent
  ],
  imports: [
    CommonModule,
    DropdownTreeNodeModule
  ],
  exports: [
    DropdownTreeComponent
  ],
})
export class DropdownTreeModule { }
