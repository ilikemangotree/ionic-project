import { APP_KEY } from './../../../core/start-app.guard';
import { AjaxResult } from './../../../shared/class/ajax-result';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { LoginAccount } from './../login-account';
import { PassportServiceService } from './../../../shared/services/passport-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController, AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  constructor(
    private toastController: ToastController,
    private passportservice: PassportServiceService,
    private alertController: AlertController,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  username = ''; // 视图模型的属性账号，双向绑定
  password = ''; // 视图模型的属性密码，双向绑定
  nowTime: Date;
  ngOnInit() {
  }

  // 点击登录按钮时调用
  async onLogin(form: NgForm) {
    let toast: any;
    toast = await this.toastController.create({
      duration: 3000,
      message: ''
    });

    if (this.username === '') {
      toast.message =  '请输入您的手机号码或者邮箱';
      toast.present();
    } else if (this.password === '') {
      toast.message = '请输入密码';
      toast.present();
    } else {
      const res = this.passportservice.login(this.username, this.password);  // 检查用户的账号密码是否匹配，并记录下用户的登录时间
      if (!(await res).success) {
        const alert = await this.alertController.create({
          header: '提示',
          message: (await res).error.message,
          buttons: ['确定']
        });
        alert.present();
      } else {
        const appConfig: any = this.localStorageService.get(APP_KEY, {
          isLaunched: false,
          isLogin: false,
        });
        appConfig.isLogin = true;
        this.localStorageService.set(APP_KEY, appConfig);
        this.router.navigateByUrl('/home');
      }
    }
  }
  // 点击忘记密码时调用
  onForgotPassword() {
    // 进入找回密码页面
    this.router.navigateByUrl('forgotpassword');
  }
}
