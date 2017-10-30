import { Component, OnInit, Input } from '@angular/core';
import { GuestService } from '../guest.service';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  @Input()
  note: any;

  constructor(private guestService: GuestService) { }

  ngOnInit() {
    // this.noteDoc = this.noteService.getNote(this.noteId)
    // this.note = this.noteDoc.valueChanges()
  }

  addHeartToNote(val) {
    //this.guestService.updateNote(this.note.id, { hearts: val + 1 })
  }

  deleteNote(id) {
   // this.guestService.deleteNote(id)
  }

}
