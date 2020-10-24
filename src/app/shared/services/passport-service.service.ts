import { Signup } from './../../routes/passport/signup';
import { AjaxResult } from './../class/ajax-result';
import { LoginAccount } from './../../routes/passport/login-account';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { text } from '@angular/core/src/render3/instructions';
import { stringify } from 'querystring';
import { Datetime } from '@ionic/angular';
export const User = 'User';
export const LoginLog = 'LoginLog';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(private localStorageService: LocalStorageService) { }
  private loginAccount: LoginAccount;
  checkUniquePhone(phone: number): boolean { // 检查用户输入的账号是否是注册过的
    const la = this.localStorageService.get('User', null);
    if (la) {
      for (let a of la) {
        console.log(a.phone == phone);
        if (a.phone == phone) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  addUser(signup: any): AjaxResult  { // 将注册的用户信息存入本地存储
    const la = this.localStorageService.get('User', []);
    console.log(signup);
    for (let i = 0; i < la.length; i++) {
      console.log(la[i]);
      console.log(signup.email == la[i].email);
      if (this.checkUniquePhone(signup.phone)|| signup.email == la[i].email) {
        return new AjaxResult(false, null, {
          message: '您的手机号码或邮箱已经被注册',
          details: ''
        });
      }
    }
    this.loginAccount = {
      id: 1,
      userId: 1,
      Type: '',
      ThirdParty: 0,
      phone: signup.phone,
      email: signup.email,
      PasswordToken: signup.password,
      LoginTime: new Date().toDateString()
    }

    la.push(this.loginAccount);
    this.localStorageService.set('cu', signup.phone); // current user
    this.localStorageService.set('User', la);
    return new AjaxResult(true, null);
  }
  async signup(input: Signup) {
    return this.addUser(input);
  }
  confirmAccount (phoneOrEmail: string, password: string) {
    const accounts = this.localStorageService.get('User', []);
    console.log(accounts);
    for (let i = 0; i < accounts.length; i++) {
      if ( (accounts[i].identifier == phoneOrEmail || accounts[i].email == phoneOrEmail) && accounts[i].PasswordToken == password) {
        return true;
      }
    }
    return false;
  }

  async login(phoneOrEmail: string, password: string) {
    const la = this.localStorageService.get('User', []);
    if (la == null){
      return new AjaxResult(false, null, {
        message: '您的手机号码未注册',
        details: ''
      });
    } else {
      if (!this.confirmAccount(phoneOrEmail, password)) {
        return new AjaxResult(false, null, {
          message: '您输入的手机号码或密码错误',
          details: ''
        }); // 账号或密码错误
      } else {
        this.localStorageService.set('cu', phoneOrEmail); // current user
        const Tloginlog = {
          identifier: '',
          loginTime: new Date(),
        }
        Tloginlog.identifier = phoneOrEmail;
        Tloginlog.loginTime = new Date();
        this.localStorageService.set('LoginLog', Tloginlog); // 记录本次用户登录时间
        console.log(Tloginlog.loginTime);
        return new AjaxResult(true, null);
      }


    }
  }
  getPassword(): string {
    const identifier = this.localStorageService.get('LoginLog', '').identifier;
    const la = this.localStorageService.get('User', []);
    let password = '';
    for (let i = 0; i < la.length; i++) {
      if ( (la[i].identifier == identifier || la[i].email == identifier)) {
        password = la[i].PasswordToken;
        break;
      }
    }
    return password;
  }
  updatePassword(newPassword: string): boolean {
    const identifier = this.localStorageService.get('LoginLog', '').identifier;
    const la = this.localStorageService.get('User', '');
    for (let i = 0; i < la.length; i++) {
      if ( (la[i].identifier == identifier || la[i].email == identifier)) {
        la[i].PasswordToken = newPassword;
        break;
      }
    }
    this.localStorageService.set('User', la);
    return true;
  }

}
