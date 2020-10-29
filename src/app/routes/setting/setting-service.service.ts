import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }
  getshop(identtfier: string) { // 根据登录用户信息获得对应的商铺信息
    const id = this.localStorageService.get('LoginLog', '').identifier; // 当前用户的手机号或者邮箱
    const la = this.localStorageService.get('User', ''); // 所有注册的用户信息
    let cphone = '';
    let cemail = '';
    let cshopName = '';
    let i = 0;
    for (i = 0; i < la.length; i++) {
      if (la[i].identifier == id || la[i].email == id) {
        cphone = la[i].identifier;
        cemail = la[i].email;
        cshopName = la[i].shopName;
      }
    }
    if (this.localStorageService.get('shop', '') == null) {
      const shop = this.localStorageService.get('shop',
      {
        shopName: cshopName,
        shortName: '',
        phone: cphone,
        email: cemail,
        shopKeeperName: '',
        shopTel: ''
      });
      this.localStorageService.set('shop', shop);
    }
    const shop = this.localStorageService.get('shop', '');
    // console.log(this.shop);
    return shop;
  }
}
