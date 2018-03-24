import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rememberScroll: any = {};
  position = 0;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  onScrolling(event) {
    this.position = event['target']['scrollTop'];
  }

  onActivate(component) {
    const currentComponent = component['component'];
    const position = (currentComponent && this.rememberScroll[currentComponent]) ? this.rememberScroll[currentComponent] : 0;
    setTimeout(() =>
      this.renderer.setProperty(this.elRef.nativeElement.querySelector('.main-scroll-wrapp'), 'scrollTop', position)
    , 0)
}

  onDeactivate(component) {
    if (Object.keys(component).includes('component')) {
      const currentComponent = component['component'];
      this.rememberScroll = {...this.rememberScroll, [currentComponent]: this.position};
    }
  }


}
