import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'top-nav-admin',
  templateUrl: './top-nav-admin.component.html',
  styleUrls: ['./top-nav-admin.component.scss']
})
export class TopNavAdminComponent {

  constructor(public auth: AuthService) { }

  doLogout(): void {
    this.auth.signOut();
  }
}
