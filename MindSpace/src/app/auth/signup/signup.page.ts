import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}

  onClickFacebook() {
    console.log('click on FaceBook auth');
  }
  onClickGoogle() {
    console.log('click on Google auth');
  }
  onClickSignUp() {
    console.log('click on sign up button');
  }
  onClickLogin() {
    console.log('click on log in');
  }
}
