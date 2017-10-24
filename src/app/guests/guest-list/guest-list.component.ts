import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {

  guests;
  content;

  constructor(private guestService: NoteService) { }

  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.guests = this.guestService.getSnapshot()
  }

  createGuest() {
    this.guestService.create(this.content)
    this.content = ''
  }

}
