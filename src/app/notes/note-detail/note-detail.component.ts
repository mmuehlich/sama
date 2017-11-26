import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  @Input()
  note: any;

  content: any;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.content = [];
    this.note.content.split(';;').forEach(n => {
      var c = n.split('::');
      if (c[0] && c[0].length > 0 && c[1])
        this.content.push({ key: c[0], value: c[1] });
    });
  }

  addHeartToNote(val) {
    this.noteService.updateNote(this.note.id, { hearts: val + 1 })
  }

  deleteNote() {
    if (confirm('Notiz ' + this.note.title + ' löschen?')) {
      this.noteService.deleteNote(this.note.id);
      window.location.reload();
    }
  }

}
