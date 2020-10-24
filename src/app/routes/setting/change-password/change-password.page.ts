import { PassportServiceService } from './../../../shared/services/passport-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { C } from '@angular/core/src/render3';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  isOldPassword = true;
  oldPassword = '';
  newPassword = '';
  checkPassword = '';
  oldpasswordFlag = true;
  newpasswordFlag = true;
  constructor(private passportServiceService: PassportServiceService,
              private toastCtrl: ToastController,
              private navCtrl: NavController, private router: Router) { }
  async onSave() {console.log('onSave');
    const oldPass = this.passportServiceService.getPassword();
    // console.log(oldPass);
    this.isOldPassword = oldPass == this.oldPassword ? true : false;
    // console.log(this.isOldPassword);
    if (this.newPassword == this.checkPassword && this.isOldPassword) {
      this.passportServiceService.updatePassword(this.newPassword);
      console.log('修改成功');
      this.router.navigateByUrl('/setting');
      const toast = await this.toastCtrl.create({
        message: '修改成功',
        duration: 2000
      });
      await toast.present();
    }
  }
  ngOnInit() {
  }
  vaildoldPassport(event) {
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.oldPassword.length < 6 || this.oldPassword.length > 16 || !reg.test(this.oldPassword)) {
      this.oldpasswordFlag = false;
    } else {
        this.oldpasswordFlag = true;
    }
  }
  vaildnewPassport(event) {
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.newPassword.length < 6 || this.newPassword.length > 16 || !reg.test(this.newPassword)) {
      this.newpasswordFlag = false;
    } else {
        this.newpasswordFlag = true;
    }
  }


}
