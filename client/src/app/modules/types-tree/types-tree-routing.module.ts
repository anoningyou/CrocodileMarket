import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesTreeComponent } from './types-tree/types-tree.component';

const routes: Routes = [
  {
    path: '',
    component: TypesTreeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesTreeRoutingModule { }
