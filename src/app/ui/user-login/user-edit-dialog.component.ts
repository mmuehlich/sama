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

  guests: Guest[] = [];
  guest : Guest = new Guest();

  userText: string = '';

  constructor(public auth: AuthService, private router: Router, private guestService: GuestService) { 
    this.guest.adultCount = 1;
    this.guest.adults = [];
    this.guest.adults.push({name: ''});
    this.guest.childCount = 0;
    this.guest.children = [];

    
    guestService.getSnapshot().subscribe(x => {
      this.guests = (x as Guest[])}
    );
  }


  ngOnInit() {
    
  }

  updateUserAndNext(user: Guest, next: string) {
    if (!user.name || !user.email) {
      alert('bitte Name und eMail angeben');
      return;
    }
    this.active = next;
    this.userText = '';
  }

  updateCount() {
    if (this.guest.adultCount < 1) {
      this.guest.adultCount = 1;
    }
    if (this.guest.childCount < 0) {
      this.guest.childCount = 0;
    }
    while (this.guest.adults.length > this.guest.adultCount) {
      this.guest.adults.pop();
    }
    while (this.guest.adults.length < this.guest.adultCount) {
      this.guest.adults.push({name: ''});
    }

    while (this.guest.children.length > this.guest.childCount) {
      this.guest.children.pop();
    }
    while (this.guest.children.length < this.guest.childCount) {
      this.guest.children.push({name: ''});
    }
  }

  saveUser() {
    if (this.guest.id) {
      this.guestService.update(this.guest.id, this.guest);
    } else {
      this.guestService.create({
        greeting: '',
        name: this.guest.name,
        adults: this.guest.adults,
        adultCount: this.guest.adultCount,
        children: this.guest.children,
        childCount: this.guest.childCount,
        civil: false,
        state: 'confirmed',
        loginToken: '',
        address: this.guest.address ? this.guest.address : '',
        email: this.guest.email,
        phone: this.guest.phone ? this.guest.phone : '',
        remarks: this.guest.remarks ? this.guest.remarks : '',
        music: this.guest.music ? this.guest.music : '',
        hiddenRemarks: 'created  - ' + new Date().toString(),
      });

      alert('Deine Zusage wurde gespeichert - vielen Dank!');
    }
  }

  close() {
    this.topNav.editUser = false;
    this.active = 'user';
  }

  checkUser(users: any) {
    var text = '';

    var match = this.guests.filter(g => g.email == this.guest.email.trim());
    if (match.length == 1 && match[0].state === 'confirmed') {
      var u = match[0];

      text += 'Zusage für ' + u.name + ' (' + u.email + ') wurde bestätigt.\n';
      text +=  '(' + u.adultCount + ' Erwachsene, ' + u.childCount + ' Kinder)';

      this.userText = text;
      return;

    }
    this.userText = 'Kein Eintrag für ' + this.guest.email + ' gefunden.';
    return;
  }

}
