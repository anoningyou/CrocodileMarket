import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  Type,
  ViewChild,
} from '@angular/core';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';
import { InsertionDirective } from '../insertion.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef?: ComponentRef<any>;
  dataModel: DialogConfig;
  childComponentType?: Type<any>;

  @ViewChild(InsertionDirective, { static: false })
  insertionPoint?: InsertionDirective;

  @ViewChild('dialog') dialogElement!: ElementRef;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef,
    private config: DialogConfig
  ) {
    this.dataModel = this.config;
  }

  ngAfterViewInit(): void {
    if (this.childComponentType)
      this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(event: MouseEvent) {
    this.dialogRef.close(undefined);
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let viewContainerRef = this.insertionPoint?.viewContainerRef;
    viewContainerRef?.clear();
    this.componentRef = viewContainerRef?.createComponent(componentType);
  }
}
