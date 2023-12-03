import { Directive, Input, TemplateRef } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Directive({
  selector: '[window]'
})
export class WindowDirective {

  //#region Inputs

  // Show/hide the window
  @Input("window")
  public set window(value: boolean) {
    if (value) {
      this.windowId = this.windowService.setTemplate(this.template);
    } else {
      if (this.windowId === 0 || !!this.windowId) {
        this.windowService.toDestroy(this.windowId);
      }
    }
  }

  //#endregion

  //#region Fields

  // Window identifier
  private windowId?: number;

  //#endregion

  //#region Constructor

  constructor(
    private readonly windowService: WindowService,
    private readonly template: TemplateRef<any>
  ) {}

  //#endregion

}
