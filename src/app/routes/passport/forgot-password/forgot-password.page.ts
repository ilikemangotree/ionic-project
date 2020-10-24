import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationCodeService } from './../authentication-code.service';
import { ToastController, AlertController, Slides } from '@ionic/angular';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { t } from '@angular/core/src/render3';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordPage implements OnInit {

  private account = '';
  private pwd = '';
  private confirmpwd = '';
  codemessage = {
    content: '获取验证码',
    count: 0,
    maxcount: 3,
    flag: false,
    code: '',
    time: 60
  };
  codeValid = false;
  passwordFlag = true;
  confirmPasswordFlag = true;
  constructor(
    private localStorage: LocalStorageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private authentication: AuthenticationCodeService,
    private router: Router

  ) { }
  @ViewChild('registerSlides') registerSlides: Slides;
  ngOnInit() {
    this.registerSlides.lockSwipeToNext(true);
  }
  onNext() {
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipeToNext(true);
  }
  onPrevious() {
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipeToNext(true);
  }
  onLogin() {
    this.router.navigateByUrl('login');
  }

  async  onCheckIdentifier() {
    const la = this.localStorage.get('User', '');
    if (this.account === '') {
      const toast = await this.toastController.create({
        message: '请输入您的邮箱或者手机号码',
        duration: 3000
      });
      toast.present();
    } else {
      let exist = false;
      try {
        la.forEach(a => {
          if ( ((this.account == a.identifier) || this.account == a.email )) {
            exist = true;
            throw Error();
          }
        });
      } catch (e) {
        const alert = await this.alertController.create({
          header: '提示',
          message: '验证消息已发送，请及时查看',
          buttons: ['知道了']
        });
        alert.present();

      }
      if (exist == false) {
        const alert = await this.alertController.create({
          header: '警告',
          message: '该邮箱或手机号未注册',
          buttons: ['知道了']
        });
        alert.present();
      } else {
        this.onNext();
      }
    }
  }
  settime() {
    if (this.codemessage.time == 1) {
      this.codemessage.time = 60;
      this.codemessage.content = '获取验证码';
      this.codemessage.flag = false;
      return;
    } else {
      this.codemessage.time--;
    }
    this.codemessage.content = '重新获取' + this.codemessage.time + '秒';
      setTimeout(() => {
        this.codemessage.content = '重新获取' + this.codemessage.time + '秒';
        this.settime();
      }, 1000);
  }
  async onSendCode() {
    this.codemessage.flag = true;
    this.codemessage.count += 1;
    if (this.codemessage.count > this.codemessage.maxcount) {
      this.codemessage.content = ' 请稍后再用 ';
    } else {
      this.codemessage.code = this.authentication.createCode(4);
      const alert = await this.alertController.create({// 弹窗提醒验证码
      header: '验证码',
      message: this.codemessage.code,
      buttons: ['确定']
      });
      alert.present();
      this.settime();
    }
  }
  onSubmitCode(form: NgForm) {
    if (form.valid) {
      console.log(this.codemessage.code);
      console.log(this.authentication.code);
      if (this.authentication.validate(this.codemessage.code)) {
        console.log('true');
        this.codeValid = true;
        this.onNext();
      }
    }
  }
  async onInputMes(event) {
		if (this.passwordFlag && this.confirmPasswordFlag) {
      let accounts: any = this.localStorage.get('User', null);
      console.log(this.account);
      for(var i = 0; i < accounts.length; i++) {
          if(this.account == accounts[i].identifier || this.account == accounts[i].email){//找到对应账号
            accounts[i].PasswordToken = this.pwd;
            console.log(this.pwd);
            // this.loginaccount = accounts[i];
            break;
          }
      }//修改密码
      this.localStorage.set('User', accounts);//更新密码
      console.log(accounts);
      this.onLogin();
    }
  }
  checkPassword(event) {
    let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.pwd.length < 6 || this.pwd.length > 16 || !reg1.test(this.pwd)) {
        this.passwordFlag = false;
        //console.log('778');
    } else {
        //console.log('uzi');
        this.passwordFlag = true;
    }
}

  checkConfirmPassword(event) {
    let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.confirmpwd.length < 6 || this.confirmpwd.length > 16 || !reg1.test(this.pwd)
        || this.confirmpwd !== this.pwd) {
        this.confirmPasswordFlag = false;
    } else {
        this.confirmPasswordFlag = true;
    }
  }

}
