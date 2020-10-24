import { PassportServiceService } from './../../../shared/services/passport-service.service';
import { Router } from '@angular/router';
import { AuthenticationCodeService } from './../authentication-code.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Slides, AlertController } from '@ionic/angular';
import { Signup } from '../signup';

// import {AlertController} from '@ionic/angular'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SignupPage implements OnInit {
  constructor(
    private authentication: AuthenticationCodeService,
    private router: Router,
    private alertController: AlertController,
    private passportService: PassportServiceService
    ) {

  }
  @ViewChild('signupSlides') signupSlides: Slides;
  public code: string;
  // 存放验证码的过期时间
  public deadline: number;
  signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  codemessage = {
    content: '获取验证码',
    count: 0,
    maxcount: 3,
    flag: false,
    code: '',
    time: 60
  };
  slideIndex = 0;
  submited = false;
  codeValid = false;
  emailFlag = true;
  shopNameFlag = true;
  passwordFlag = true;
  confirmPasswordFlag = true;

  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true);
  }
  onLogin(event) {
    this.router.navigateByUrl('login');
  }
  onNext() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext();
    this.signupSlides.lockSwipeToNext(true);
    this.signupSlides.getActiveIndex().then((number) => {
      this.slideIndex = number;
    });
  }
  onPrevious() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slidePrev();
    this.signupSlides.lockSwipeToNext(true);
    this.signupSlides.getActiveIndex().then((number) => {
      this.slideIndex = number;
    });
    console.log('pre');
  }

  onSubmitPhone(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      // 已通过客户端验证
      console.log(this.signup.phone);
      this.onNext();
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
      this.signup.code = this.authentication.createCode(4);
      const alert = await this.alertController.create({// 弹窗提醒验证码
      header: '验证码',
      message: this.signup.code,
      buttons: ['确定']
      });
      alert.present();
      this.settime();
    }

  }
  onSubmitCode(form: NgForm) {
    if (form.valid) {
      console.log(this.signup.code);
      console.log(this.authentication.code);
      if (this.authentication.validate(this.signup.code)) {
        console.log('true');
        this.codeValid = true;
        this.onNext();
      }
    }
  }
  async onSubmitAccount(form: NgForm) {
    console.log(this.signup);
    if (form.valid) {
      if (this.emailFlag && this.shopNameFlag && this.passwordFlag && this.confirmPasswordFlag) {
        let t = this.passportService.addUser(this.signup);
        if (t.success == false) {
          const alert = await this.alertController.create({
            header: '提示',
            message: '手机号或邮箱已使用',
            buttons: ['确定']
        });
        alert.present();
        } else {
          this.onNext();
        }
      }
    }
  }

  validEmail(event) {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // console.log(this.signup.email.length);
    if (this.signup.email.length < 5 || this.signup.email.length > 30 || !reg.test(this.signup.email)) {
      this.emailFlag = false;
      // console.log(this.emailFlag);
    } else {
      this.emailFlag = true;
      // console.log(this.emailFlag);
    }
  }
  validShopname(event) {
    if (this.signup.shopName.length <= 0 || this.signup.shopName.length > 12) {
      this.shopNameFlag = false;
      // console.log(this.shopNameFlag);
    } else {
      this.shopNameFlag = true;
      // console.log(this.shopNameFlag);
    }
  }
  vaildPassport(event) {
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.signup.password.length < 6 || this.signup.password.length > 16 || !reg.test(this.signup.password)) {
      this.passwordFlag = false;
    } else {
        this.passwordFlag = true;
    }
  }
  validConfirmPassword(event) {
    if (this.signup.confirmPassword !== this.signup.password) {
      this.confirmPasswordFlag = false;
    } else {
      this.confirmPasswordFlag = true;
    }
  }
}
