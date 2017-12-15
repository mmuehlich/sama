import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

import { GuestService } from './guests/guest.service';
import { Guest } from './guests/guest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  guests;
  user;

  constructor(public auth: AuthService, private router: Router, private guestService: GuestService) { 
    this.guests = this.guestService.getSnapshot();
  }

  getUser(users:Guest[], login:any): Guest {
    if (!users) {
      return undefined;
    }
    for (let user of users) {
      if (user.name && login.displayName && user.name.toLowerCase() === login.displayName.toLowerCase()) {
        return user;
      }
      if (user.email && login.email && user.email.toLowerCase() === login.email.toLowerCase()) {
        return user;
      }
      for (let name of user.adults) {
        if (name && login.email && name.toLowerCase() === login.displayName.toLowerCase()) {
          return user;
        }
      }
    } 
    return undefined;
  }

}
