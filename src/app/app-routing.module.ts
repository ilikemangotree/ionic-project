
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
  { path: 'CategoryList', loadChildren: './routes/category-list/category-list.module#CategoryListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
