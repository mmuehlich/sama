import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {

  constructor(public auth: AuthService, private router: Router) {
  }

  cancel(): void {
    this.router.navigate(['wedding']);
  }
}
