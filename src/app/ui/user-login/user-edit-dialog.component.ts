import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { ReactiveFormsModule } from '@angular/forms';

import { GuestService } from '../../guests/guest.service';
import { Guest } from '../../guests/guest';


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
  guest : Guest = new Guest();

  showDetailY:boolean = false;
  showDetailN:boolean = false;

  constructor(public auth: AuthService, private router: Router, private guestService: GuestService) { }


  ngOnInit() {
    this.guests = this.guestService.getSnapshot();
  }

  updateUserAndNext(user: Guest, next: string) {
    if (!user.name || !user.email) {
      alert('bitte Name + eMail angeben');
      return;
    }
    this.active = next;
  }

  confirmUser(user: Guest) {
    if (this.showDetailY) {
      user.state = 'confirmed';

      while (user.adults.length > user['adultCount']) {
        user.adults.pop();
      }
      while (user.adults.length < user['adultCount']) {
        user.adults.push({name: ''});
      }

      while (user.children.length > user['childCount']) {
        user.children.pop();
      }
      while (user.children.length < user['childCount']) {
        user.children.push({name: ''});
      }

    } else {
      user.state = 'notComming';
      this.close();
    }
    this.guestService.update(user.id, user);
  }

  confirmUserAndNext(user: Guest, next: string) {
    this.confirmUser(user);
    this.active = next;
  }

  close() {
    this.topNav.editUser = false;
  }

}
