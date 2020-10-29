import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category } from '../../../shared/class/category';
import { CategoryServiceService } from '../../../shared/services/category-service.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {
  headTitle: any;
  title: any;
  category: Category;
  name1: string;
  constructor(
    private activatedRouter: ActivatedRoute, 
    private categoryService: CategoryServiceService,
    private toastCtrl: ToastController,
    private router: Router
    ) {
    this.activatedRouter.queryParams.subscribe(queryParams => {
      this.title = queryParams.title;
      if (this.title !== '大分类') {
        this.headTitle = '新增小分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      } else {
        this.headTitle = '新增商品分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      }
    });
  }

  /**
   * 新增商品小分类
   */
  addSubCategory() {
      this.category.children.push({
      id: 0,
      name: '',
      children: []
    });
  }

  /**
   * 保存新增分类
   * @returns {Promise<void>}
   */
  async onSave() {
    if (this.title === '大分类') { // 增加商品分类
      this.category.name = this.name1;
      if (this.categoryService.insert(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/Category/list');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称',
          duration: 3000
        });
        toast.present();
      }

    } else { // 增加商品小分类
      this.category.name = this.title;
      if (this.categoryService.insertSubCateCategory(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/Category/list');
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称',
          duration: 3000
        });
        toast.present();
      }
    }
  }

  ngOnInit() {
  }

}
