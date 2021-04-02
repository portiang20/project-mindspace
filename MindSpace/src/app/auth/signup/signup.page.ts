import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(private route: Router) {
    
  }

  ngOnInit() {}

  // TODO:buggy when change segments back and force between login and sign up
  segmentChanged(e: any) {
    if (e.detail.value == 'login') {
      this.route.navigateByUrl('/login');
    }
  }

  onClickFacebook() {
    console.log('click on FaceBook auth');
  }
  onClickGoogle() {
    console.log('click on Google auth');
  }
  onClickSignUpBtn() {
    console.log('click on sign up button');
  }
}
