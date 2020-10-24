import { LocalStorageService } from './shared/services/local-storage.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // appPages: Array<{title: string, url: string, icon: string}>;
  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'chatboxes' },
    { title: '手机橱窗', url: '/home', icon: 'create' },
    { title: '邀请有礼', url: '/home', icon: 'git-merge' },
    { title: '资金账户', url: '/home', icon: 'cash' },
    { title: '反馈建议', url: '/home', icon: 'alert' },
    { title: '帮助中心', url: '/home', icon: 'help-circle' },
  ];

  public account = {
    email: '',
    phone: ''
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localStorageService: LocalStorageService
  ) {
    this.initializeApp();
    this.account.email = this.localStorageService.get('loginaccount', '')
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
