import { ApplicationRef, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Type, createComponent } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DialogInjector } from './dialog-injector';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogComponentRefs: ComponentRef<DialogComponent>[] = [];

  constructor(
      private appRef: ApplicationRef
    , private injector: Injector
    , @Inject(DOCUMENT) private document: Document) { }

  public open(componentType: Type<any>,config: DialogConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);

    if (this.dialogComponentRefs[this.dialogComponentRefs.length - 1])
      this.dialogComponentRefs[this.dialogComponentRefs.length - 1].instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: new DialogInjector(this.injector, map)
    });

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);

    this.dialogComponentRefs.push(componentRef);

    componentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    if (this.dialogComponentRefs[this.dialogComponentRefs.length - 1]) {
      this.appRef.detachView(this.dialogComponentRefs[this.dialogComponentRefs.length - 1].hostView);
      this.dialogComponentRefs.pop()?.destroy();
    }
  }
}
