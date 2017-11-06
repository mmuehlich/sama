import { Component, OnInit } from '@angular/core';
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
  guest : Guest = {
    greeting: "",
    firstname: "",
    name: ""
  };

  constructor(private guestService: GuestService) { }

  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.guests = this.guestService.getSnapshot();
  }

  createGuest() {
    this.guestService.create(this.guest)
    this.guest = {
      greeting: "",
      firstname: "",
      name: ""
      };
  }

  deleteGuest(guest:Guest) {
    this.showGuestDetails = false;
  }

  editGuest(guest:Guest) {
    
  }

  showUser(guest: Guest) {
    this.showGuestDetails = true;
    this.guest = guest;
  }
}
