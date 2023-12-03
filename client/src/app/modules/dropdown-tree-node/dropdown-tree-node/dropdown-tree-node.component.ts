import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeElement } from 'src/app/interfaces/tree-element';

@Component({
  selector: 'app-dropdown-tree-node',
  templateUrl: './dropdown-tree-node.component.html',
  styleUrls: ['./dropdown-tree-node.component.scss'],
})
export class DropdownTreeNodeComponent {
  //#region  inputs

  @Input() data: TreeElement | undefined;

  @Input() collapsed: boolean = true;

  //#endregion

  //#region  outputs

  @Output() dataChange: EventEmitter<TreeElement> =
    new EventEmitter<TreeElement>();

  //#endregion

  //#region event handlers

  onCollapseClick() {
    this.collapsed = !this.collapsed;
  }

  onCheckChange(event: any) {
    if (this.data) {
      if (this.setCheckedRecursive(this.data, event.currentTarget.checked))
        this.dataChange.emit(this.data);
    }
  }

  onChildChange(child: TreeElement) {
    if (this.data) {
      this.data.checked = this.data.children.every((c) => c.checked);
      this.dataChange.emit(this.data);
    }
  }

  //#endregion

  //#region actions

  private setCheckedRecursive(element: TreeElement | undefined, val: boolean) {
    if (!!element && element.checked !== val) {
      element.checked = val;
      if (!!element.children?.length)
        element.children.forEach((child) => {
          this.setCheckedRecursive(child, val);
        });

      return true;
    } else return false;
  }

  //#endregion
}
