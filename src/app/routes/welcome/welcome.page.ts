import { APP_KEY } from './../../core/start-app.guard';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {
  showSkip = true;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}
  ngOnInit() {
    // 第一次调用get方法时，'App'这个key不存在，第二个参数会作为默认值返回
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      version: '1.0.0'
    });
    if ( appConfig.isLaunched === false ) {
      appConfig.isLaunched = true;
      this.localStorageService.set(APP_KEY, appConfig);
    } else {
      this.router.navigateByUrl('home');
    }
  }
  onSlideWillChange(event) {
    event.target.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
  onSkip() {
    this.router.navigateByUrl('signup');
  }
  onLogin() {
    this.router.navigateByUrl('login');
  }
}
