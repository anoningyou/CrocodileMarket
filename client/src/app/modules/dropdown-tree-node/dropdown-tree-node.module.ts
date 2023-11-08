import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownTreeNodeComponent } from './dropdown-tree-node/dropdown-tree-node.component';
import { NullReplacerModule } from '../null-replacer/null-replacer.module';



@NgModule({
  declarations: [
    DropdownTreeNodeComponent
  ],
  imports: [
    CommonModule,
    NullReplacerModule
  ],
  exports: [
    DropdownTreeNodeComponent
  ],
})
export class DropdownTreeNodeModule { }
