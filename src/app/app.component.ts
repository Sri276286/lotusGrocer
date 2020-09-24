import { Component, ElementRef, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('scrollContent') el: ElementRef;
  public scrolled: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('event => ', this.el.nativeElement.scrollTop);
    });
  }

  /**
   * Handle scroll
   * @param event
   */
  onScroll(event: Event) {
    // console.log('event => ', event, this.el.nativeElement.scrollTop);
    if (event) {
      if (this.el.nativeElement.scrollTop > 100) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
  }
}
