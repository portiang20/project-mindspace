import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onClickSignup(userName, signUpName, userPwd) {
    this.authService.signUp(userName.value, signUpName.value, userPwd.value);
  }
}
