import { Component, ElementRef, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('scrollContent') el: ElementRef;
  public scrolled: boolean = false;
  public showCategories: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
    this.routeHandler();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Handle scroll
   * @param event
   */
  onScroll(event: Event) {
    if (event) {
      if (this.el.nativeElement.scrollTop > 100) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
  }

  private routeHandler() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showCategories = this.validateURL(event);
      });
  }

  private validateURL(event: NavigationEnd) {
    if (event.url) {
      const homeCheck = event.url === '/';
      return homeCheck;
    } else {
      return false;
    }
  }
}
