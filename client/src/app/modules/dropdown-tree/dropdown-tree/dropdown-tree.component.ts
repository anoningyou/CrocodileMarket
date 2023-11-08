import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeElement } from 'src/app/interfaces/tree-element';

@Component({
  selector: 'app-dropdown-tree',
  templateUrl: './dropdown-tree.component.html',
  styleUrls: ['./dropdown-tree.component.scss']
})
export class DropdownTreeComponent {

  //#region  inputs

  @Input() data: TreeElement [] = [];

  //#endregion

  //#region  outputs

  @Output() elementChange: EventEmitter<TreeElement> = new EventEmitter<TreeElement>;

  //#endregion

  //#region event handlers

  onElementChange(element: TreeElement) {
      this.elementChange.emit(element);
  }

  //#endregion
}
