import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { GuestService } from '../guest.service';
import { Guest } from '../guest';

@Component({
  selector: 'guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})

export class GuestListComponent implements OnInit {

  guests;
  showGuestDetails: boolean = false;
  showNewGuest: boolean = false;
  guest : Guest = {
    greeting: "",
    name: "",
    adults: [{name: ""}],
    children: [{name: ""}],
    civil: false,
    state: "new",
    loginToken: ""
  };

  constructor(public auth: AuthService, private guestService: GuestService) {
  }

  ngOnInit() {
    this.guests = this.guestService.getSnapshot();
  }

  createGuest() {
    this.showGuestDetails = false;
    if (this.guest.id) {
      this.guestService.update(this.guest.id, this.guest);
    } else {
      this.guestService.create(this.guest)
    }
    this.guest = {
      greeting: "",
      name: "",
      adults: [{name: ""}],
      children: [{name: ""}],
      civil: false,
      state: "new",
      loginToken: ""
      };
  }

  deleteGuest(guest:Guest) {
    if (confirm(guest.name + ' löschen?')) {
      this.guestService.delete(guest.id);
    }
    this.showGuestDetails = false;
  }

  editGuest(guest:Guest) {
    this.showGuestDetails = false;
    this.guest = guest;
  }

  showUser(guest: Guest) {
    this.showGuestDetails = true;
    this.guest = guest;
  }

  addAdult() {
    this.guest.adults.push({name: ""});
  }

  addChild() {
    this.guest.children.push({name: ""});
  }

  countAdults (guests: Guest[]) {
    return guests ? guests
      .filter(g => g.state === 'confirmed')
      .map(g => g.adultCount)
      .reduce((a,b) => a+b, 0) + ' Erwachsene' : '';
  }

  countChildren (guests: Guest[]) {
    return guests ? guests
      .filter(g => g.state === 'confirmed')
      .map(g => g.childCount)
      .reduce((a,b) => a+b, 0) + ' Kinder' : '';
  }
}
