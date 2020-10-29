import { Router } from '@angular/router';
import { APP_KEY } from './../../core/start-app.guard';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { LoginAccount } from './../passport/login-account';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  version: string;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.version = this.localStorageService.get(APP_KEY, '').version;
  }
  Quit() {
    this.router.navigateByUrl('login');
  }

}
