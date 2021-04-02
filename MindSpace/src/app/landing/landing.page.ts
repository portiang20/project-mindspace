import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  pageName = 'signup';

  constructor(private route: Router) {}

  ngOnInit() {}

  onClickSignUp() {
    this.route.navigateByUrl('/signup');
  }

  onClickLogin() {
    this.route.navigateByUrl('/login');
  }
}
