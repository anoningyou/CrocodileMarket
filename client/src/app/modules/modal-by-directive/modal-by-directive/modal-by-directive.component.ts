import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-by-directive',
  templateUrl: './modal-by-directive.component.html',
  styleUrls: ['./modal-by-directive.component.scss']
})
export class ModalByDirectiveComponent {

  @Input("name")
  public name?: string;

  @Output("dialogClosed")
  public dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();


  public onCloseClick() {
    this.dialogClosed.emit(false);
  }

  public onOkClick() {
    this.dialogClosed.emit(true);
  }

}
