import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryEditPage } from './category-edit.page';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoryEditPage,
    CategoryNameEditPage
  ],
  entryComponents: [
    CategoryNameEditPage
  ]
})
export class CategoryEditPageModule {}
