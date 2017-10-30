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
  guest : Guest = {
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
        firstname: "",
        name: ""
      };
  }

}
