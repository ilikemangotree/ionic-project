import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  shop: any;
  createTime: any;
  constructor(
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }
  ionViewWillEnter() {
    const id = this.localStorageService.get('LoginLog', '').identifier;
    const la = this.localStorageService.get('User', '');
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
      this.shop = this.localStorageService.get('shop',
      {
        shopName: cshopName,
        shortName: '',
        phone: cphone,
        email: cemail,
        shopKeeperName: '',
        shopTel: ''
      });
      this.localStorageService.set('shop', this.shop);
    }
    this.shop = this.localStorageService.get('shop', '');
    // console.log(this.shop);
    if (i >= 1) {
      // console.log(la[i - 1].createTime);
      this.createTime = la[i - 1].createTime;
    }
  }
}

