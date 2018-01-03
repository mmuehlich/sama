import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'top-nav-admin',
  templateUrl: './top-nav-admin.component.html',
  styleUrls: ['./top-nav-admin.component.scss']
})
export class TopNavAdminComponent {

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
