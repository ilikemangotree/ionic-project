import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupPage} from './signup/signup.page';
const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },
  // { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  // {
  //   path: 'forgot-password',
  //   loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
