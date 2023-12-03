import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { WindowService } from './services/window.service';
import { WindowComponent } from './modules/window/window/window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Crocodile market';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private readonly windowService: WindowService) {
  }

  ngOnInit() {

    this.windowService.templateHasSet.subscribe((data: { template: TemplateRef<any>, windowId: number }) => {
      if (!!data && !!data.template && (data.windowId === 0 || !!data.windowId)) {
        const componentRef = this.viewContainerRef.createComponent(WindowComponent);


        componentRef.instance.viewInit.subscribe((viewContainerRef: ViewContainerRef) => {
          viewContainerRef.createEmbeddedView(data.template);
          this.windowService.bindEmbeddedViewRef(componentRef, data.windowId);
        });

        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
      }
    });
  }
}
