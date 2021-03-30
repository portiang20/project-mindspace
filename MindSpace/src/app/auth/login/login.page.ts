import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  onClickFacebook() {
    console.log('click on FaceBook auth');
  }
  onClickGoogle() {
    console.log('click on Google auth');
  }

  onClickLogin() {
    console.log('click on log in');
  }
}
