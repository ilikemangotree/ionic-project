import { CategoryServiceService } from './../../../shared/services/category-service.service';
import { Category } from './../../../shared/class/category';
import { ActionSheetController, Events } from '@ionic/angular';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListPage implements OnInit {

  categories: Category[];
  activeCategory: Category;
  activeSubCategories: Category[];
  activeSubCategory: Category;
  constructor(
    private categoryService: CategoryServiceService,
    private actionSheetCtrl: ActionSheetController,
    private events: Events,
    private router: Router
    ) {
    categoryService.getAll().then((data) => {
      this.categories = data.result;
      if (this.categories) {
        this.activeCategory = this.categories[0];
        this.activeSubCategories = this.activeCategory.children;
      }
    });
  }
  ngOnInit() {

  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            // this.navCtrl.navigateForward(['/addCategory', {title: this.activeCategory.name}]);
            this.router.navigate(['/Category/add'], {queryParams: {'title': this.activeCategory.name}});
          }
        }, {
          text: '编辑分类',
          handler: () => {
            // this.navCtrl.navigateForward(['/editCategory', this.activeCategory.id]);
            this.router.navigate(['/Category/edit', this.activeCategory.id]);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }
  selectCategory(category: Category) { // 获得当前选择的目录以及其子目录
    this.activeCategory = category;
    this.activeSubCategories = this.activeCategory.children;
  }
  /**
   * 发布自定义消息，返回上一页面
   * @param {Category} category
   */
  onSelect(category: Category) {
    this.events.publish('category: selected', category, Date.now());
    // this.router.navigateByUrl('/addPoduct');
    // this.location.back();
  }

}
