import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { ReactiveFormsModule } from '@angular/forms';

import { GuestService } from '../../guests/guest.service';
import {Guest} from '../../guests/guest';


@Component({
  selector: 'user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  @Input()
  topNav:any;

  active:string = 'user';

  guests : any = [];

  constructor(public auth: AuthService, private router: Router, private guestService: GuestService) { }


  ngOnInit() {
    this.guests = this.guestService.getSnapshot();
  }

  updateUser(user: Guest) {
    this.guestService.update(user.id, user);
    this.topNav.editUser = false;
  }

  updateUserAndNext(user: Guest) {
    this.guestService.update(user.id, user);
    this.active = 'conf';
  }

}
