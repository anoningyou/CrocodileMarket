import { ComponentRef, EventEmitter, Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  //#region Events

  // Template is set
  public templateHasSet: EventEmitter<{ template: TemplateRef<any>, windowId: number }> = new EventEmitter();

  //#endregion

  //#region Fields

  // List of windows
  private windows: (ComponentRef<any> | null)[];

  //#endregion

  //#region Constructor

  constructor() {
    this.windows = [];
  }

  //#endregion

  //#region Methods

  // Set the template and return a unique window id
  public setTemplate(template: TemplateRef<any>): number {
    const windowId = this.windows.push(null) - 1;
    this.templateHasSet.emit({ template, windowId });

    return windowId;
  }

  // Bind EmbeddedViewRef to an id
  public bindEmbeddedViewRef(ref: ComponentRef<any>, windowId: number) {
    this.windows[windowId] = ref;
  }

  // Destroy the window
  public toDestroy(windowId: number) {
    this.windows[windowId]?.destroy();
    this.windows[windowId] = null;
  }

  // Get the window ID that is currently displayed on top
  public getTopWindowId(): number {
    return this.windows.length - 1;
  }

  // Is the window with the specified id displayed on top?
  public isWindowOnTop(id: number): boolean {
    return this.getTopWindowId() === id;
  }

  //#endregion
}
