import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  switch: string = 'login';
  constructor(public alertController: AlertController, private route: Router) {}

  ngOnInit() {}

  onClickFacebook() {
    console.log('click on FaceBook auth');
  }

  onClickGoogle() {
    console.log('click on Google auth');
  }

  onClickLoginBtn() {
    console.log('check account info');
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Allow Access ',
      subHeader: '',
      message: 'MindSpace need some permissions to analyse your emotions',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Allow',
          handler: () => {
            console.log('Confirm Okay');
            this.route.navigateByUrl('/main/tabs/home');
          },
        },
      ],
    });

    await alert.present();
  }
}
