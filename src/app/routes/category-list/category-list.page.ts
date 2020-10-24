import { Router } from '@angular/router';
import { ActionSheetController, Events } from '@ionic/angular';
import { Category } from './../../shared/class/category';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryListService } from './category-list.service';


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
    private categoryService: CategoryListService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private events: Events
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
              console.log('Destructive clicked');
            }
          }, {
            text: '编辑分类',
            handler: () => {
              console.log('Archive clicked');
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
  selectCategory(category: Category) {
    this.activeCategory = category;
    this.activeSubCategories = this.activeCategory.children;
  }
  onSelect(category: Category) {
    this.events.publish('category: selected', category, Date.now());
    // this.router.navigateByUrl('/addProduct');
    // this.location.back();
  }

}
