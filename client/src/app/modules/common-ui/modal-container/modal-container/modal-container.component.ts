import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  private static openDialogs: ModalContainerComponent[] = [];

  // Main container of the modal window
  @ViewChild("modalPopupContainer", { read: ElementRef })
  private modalPopupContainer?: ElementRef;

  @ViewChild("popupWindow", { read: ElementRef })
  private popupWindow?: ElementRef;

  // Link to the header
  @ViewChild("header", { read: ElementRef })
  private header?: ElementRef;

  @Input("hiddenHeaderButtons")
  public hiddenHeaderButtons: boolean = false;

  @Input("hiddenCloseButton")
  public hiddenCloseButton: boolean = false;

  // Display on top of another window
  @Input("showOnTop")
  public showOnTop: boolean = false;

  // Window title
  @Input("caption")
  public caption?: string;

  // Styles for the header
  @Input("styles")
  public styles: object = {};

  //#region Outputs

  // Click events on the background
  @Output("backgroundClick")
  public backgroundClick: EventEmitter<any> = new EventEmitter();

  // Scrolling events
  @Output("scrolled")
  public scrolled: EventEmitter<Event> = new EventEmitter();

  @Output("close")
  public close: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  // Confirmation events
  @Output("apply")
  public apply: EventEmitter<any> = new EventEmitter();

  // Header is fixed
  public headerIsFixed?: boolean;

  // The ngAfterViewInit event has occurred
  private afterViewInitPass: boolean = false;

  // WindowService window id in which the component is displayed
  private windowId?: number = undefined;

  // Maximum size of the window element
  public get maxHeaderWidth(): "auto" | number {
    return "auto";
  }

  // Display scroll buttons
  public get needScrollButtons(): boolean {
    if (this.afterViewInitPass && this.modalPopupContainer?.nativeElement) {
      const { clientHeight, scrollHeight } = this.modalPopupContainer.nativeElement;
      return scrollHeight > clientHeight;
    }

    return true;
  }

  //#endregion

  //#region Methods

  // Set scroll to the bottom
  public setScrollDown() {
    const modalDiv = this.modalPopupContainer?.nativeElement;
    modalDiv.scrollTop = modalDiv.scrollHeight;
  }

  // Set scroll to the top
  public setScrollUp() {
    const modalDiv = this.modalPopupContainer?.nativeElement;
    modalDiv.scrollTop = 0;
  }

  //#endregion

  //#region Constructor

  constructor(
    private readonly renderer: Renderer2,
    private readonly windowService: WindowService) {
    ModalContainerComponent.openDialogs.push(this);
  }

  //#endregion

  //#region Event Handling

  ngOnInit() {
    this.renderer.addClass(document.body, "hide-scroll");
  }

  public ngAfterViewInit() {
    this.afterViewInitPass = true;
    this.windowId = this.windowId === undefined ? this.windowService.getTopWindowId() : this.windowId;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, "hide-scroll");
    ModalContainerComponent.openDialogs = ModalContainerComponent.openDialogs.filter(d => d !== this);
  }

  public outClick(event: any) {
    if (event.target.classList.contains("popup-window")) {
      this.backgroundClick.emit();
    }
  }

  public onScroll(event: Event) {
    // const headerHeight = $(this.header.nativeElement).height();
    // if (!!this.modalPopupContainer.nativeElement.scrollTop && this.modalPopupContainer.nativeElement.scrollTop >= headerHeight) {
    //   this.headerIsFixed = true;
    // } else {
    //   this.headerIsFixed = false;
    // }
    // this.scrolled.emit(event);
  }

  @HostListener("document:keydown.esc")
  private onEsc(event: KeyboardEvent) {
    if (this.windowId !== undefined && this.windowService.isWindowOnTop(this.windowId)) {
      const lastIndex = ModalContainerComponent.openDialogs.length - 1;
      if (ModalContainerComponent.openDialogs[lastIndex] === this) {
        this.closeClick();
      }
    }
  }

  @HostListener("document:keydown.control.enter")
  private onApply(event: KeyboardEvent) {
    if (this.windowId !== undefined && this.windowService.isWindowOnTop(this.windowId)) {
      const lastIndex = ModalContainerComponent.openDialogs.length - 1;
      if (ModalContainerComponent.openDialogs[lastIndex] === this) {
        this.apply.emit(event);
      }
    }
  }

  public closeClick() {
    this.close.emit();
  }

  //#endregion

}
