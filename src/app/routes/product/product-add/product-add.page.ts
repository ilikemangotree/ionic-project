import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductServiceService } from './../../../shared/services/product-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../shared/class/product';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription;
  constructor(
    private productService: ProductServiceService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private initProduct(): void {
    this.product = {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '',
      images: [],
      price: null
    };
  }
    /**
   * 保存
   * @param {boolean} ct
   */
  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.initProduct();
          this.product.categoryName = '默认分类';
        } else {
          // this.router.navigateByUrl('/productList');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }

}
