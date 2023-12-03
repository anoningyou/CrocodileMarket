import { ChangeDetectorRef, Component, EventEmitter, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent {
  //#region Events

  // Initialization of the view has occurred
  public viewInit: EventEmitter<ViewContainerRef> = new EventEmitter();

  //#endregion

  //#region Fields

  // Container for the window content
  @ViewChild('windowContainer', { read: ViewContainerRef })
  private windowContainer?: ViewContainerRef;

  //#endregion

  //#region Constructor

  constructor(
    private readonly renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  //#endregion

  //#region Event Handlers

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit');
    this.renderer.addClass(document.body, 'hide-scroll');
  }

  async ngAfterViewInit(): Promise<void> {
    this.viewInit.emit(this.windowContainer);
    this.changeDetectorRef.detectChanges();
  }

  async ngOnDestroy(): Promise<void> {
    this.renderer.removeClass(document.body, 'hide-scroll');
  }

  //#endregion
}