import { Component, OnInit } from '@angular/core';
import { Note, SimpleNote } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  priorities = ["wichtig", "normal", "info"];
  states = ["neu", "ToDo", "done"]; //, "gelöscht"];

  showNewNote = false;

  currNote: Note;
  currSimpleNote: SimpleNote;
  usedTopics: Note[];

  constructor(private noteService: NoteService) { 
    this.currSimpleNote = {
      state: this.states[0],
      priority: this.priorities[1],
      title: '',
      content: [{key: '', value: ''}]
    };
    this.currNote = {
      topic: '',
      priority: this.priorities[1],
      notes: [ this.currSimpleNote  ]
    };
    this.usedTopics = [];
  }

  ngOnInit() {
  //  this.getUsedTopics();
  }
/*
  createNote() {
    this.noteService.create(this.currNote.state, this.currNote.topic, this.currNote.priority, this.currNote.title, this.currNote.content.map(c => c[0] + '::' + c[1]).join(";;"))
    this.currNote.title = '';
    this.currNote.content = [["", ""]]

    this.getUsedTopics();
  }

  addContent() {
    var c = this.currNote.content;
    if (c[c.length-1][0].length > 0) {
      c.push(["", ""]);
    } else if (c.length > 1 && c[c.length-2][0].length == 0) {
      c.pop();
    }
  }

  getUsedTopics() {
    this.usedTopics = [];
    var me = this;
    this.noteService.getSnapshot().subscribe(x => {
      new Set(x.map(x => x['topic'])).forEach(
        topic => me.usedTopics.push({topic: topic, values: x.filter(x => x['topic'] == topic && x['status'] != 'gelöscht') }));
    });
  }

  deleteNote(note: any) {
    if (confirm('Notiz ' + note.title + ' löschen?')) {
      this.noteService.deleteNote(note.id);
      this.getUsedTopics();
      window.location.reload();
    }
  }

  getContent(note: any) {
    var content = [];
    note.content.split(';;').forEach(n => {
      var c = n.split('::');
      if (c[0] && c[0].length > 0 && c[1])
        content.push({ key: c[0], value: c[1] });
    });
    return content;
  }
  
  editNote(note: any) {
    this.currNote = note;
  }
*/
  newNote() {
    this.currSimpleNote = {
      state: this.states[0],
      priority: this.priorities[1],
      title: '',
      content: [{key: '', value: ''}]
    };
  }

  getDialogTitle() {
    return this.currSimpleNote && this.currSimpleNote.title.length > 0 ? 'Notiz \'' + this.currSimpleNote.title + '\' bearbeiten' : 'Neue Notiz';
  }
 
}