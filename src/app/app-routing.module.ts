
import { StartAppGuard } from './core/start-app.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  // { path: 'welcome', loadChildren: './routes/welcome/welcome.module#WelcomePageModule' },
  // { path: 'welcome', loadChildren: './routes/welcome/welcome.module#WelcomePageModule' },
  // { path: 'welcome', loadChildren: './routes/welcome/welcome.module#WelcomePageModule', canActivate: [StartAppGuard] },
  { path: 'welcome', loadChildren: './routes/welcome/welcome.module#WelcomePageModule'},
  { path: 'home', loadChildren: './routes/home/home.module#HomePageModule' },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then( m => m.PassportModule)
  },
  {
    path: 'signup', loadChildren: './routes/passport/signup/signup.module#SignupPageModule'
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/passport/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./routes/passport/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  { path: 'setting', loadChildren: './routes/setting/setting.module#SettingPageModule' },
  { path: 'AboutMe', loadChildren: './routes/setting/about-me/about-me.module#AboutMePageModule' },
  { path: 'ChangePassword', loadChildren: './routes/setting/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'Shop', loadChildren: './routes/setting/shop/shop.module#ShopPageModule' },
  { path: 'ShopEdit', loadChildren: './routes/setting/shop-edit/shop-edit.module#ShopEditPageModule' },
  { path: 'Category/list', loadChildren: './routes/category/category-list/category-list.module#CategoryListPageModule' },
  { path: 'Category/add', loadChildren: './routes/category/category-add/category-add.module#CategoryAddPageModule' },
  { path: 'Category/edit/:id', loadChildren: './routes/category/category-edit/category-edit.module#CategoryEditPageModule' },
  { path: 'Category/nameEdit', loadChildren: './routes/category/category-name-edit/category-name-edit.module#CategoryNameEditPageModule' },
  { path: 'ProductAdd', loadChildren: './routes/product/product-add/product-add.module#ProductAddPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
