import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'user-login-dialog',
  templateUrl: './user-login-dialog.component.html',
  styleUrls: ['./user-login-dialog.component.scss']
})
export class UserLoginDialogComponent implements OnInit {

  showLogin = false;
  showRegister = true;

  constructor(public auth: AuthService,
    private router: Router) { }


  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  signInWithFacebook(): void {
    this.auth.facebookLogin()
      .then(() => this.afterSignIn());
  }

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/']);
  }

}
