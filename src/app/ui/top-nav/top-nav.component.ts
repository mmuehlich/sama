import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  editUser = false;

  constructor(public auth: AuthService) { 
  }

  doLogout(): void {
    this.auth.signOut();
  }

  toggleMobile(): void {
    let toggle = document.querySelector(".navbar-burger"); 
    let menu = document.querySelector(".navbar-menu"); 
    toggle.classList.toggle("is-active"); 
    menu.classList.toggle("is-active");
  }
}
