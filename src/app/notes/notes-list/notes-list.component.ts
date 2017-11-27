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
  showEditNote = false;

  currSimpleNote: SimpleNote;
  notes;

  constructor(private noteService: NoteService) { 
    this.currSimpleNote = this.getEmptyNote();
    this.notes = this.noteService.getSnapshot();
  }

  ngOnInit() {
  //  this.getUsedTopics();
  }

  createNote(notes: Note[]) {
    this.currSimpleNote.id = new Date().toString();
    for (var n in notes) {
      if (n['topic'] == this.currSimpleNote.topic) {
        n['notes'].push(this.currSimpleNote);
        this.noteService.updateNote(n['id'], n);
        this.currSimpleNote = this.getEmptyNote();
        return;
      }
    }
    var newNote = {
      topic: this.currSimpleNote.topic,
      notes: [ this.currSimpleNote ]
    };
    this.noteService.create(newNote);
    this.currSimpleNote = this.getEmptyNote();
  }

  addContent() {
    var c = this.currSimpleNote.content;
    if (c[c.length-1].key.length > 0) {
      c.push({key: "", value: ""});
    } else while (c.length > 1 && c[c.length-2].key.length == 0) {
      c.pop();
    }
  }

  /*
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
    this.currSimpleNote = this.getEmptyNote();
    this.showNewNote = true;
  }

  private getEmptyNote() {
    return {
      topic: '',
      state: this.states[0],
      priority: this.priorities[1],
      title: '',
      content: [{key: '', value: ''}]
    };
  }
  getDialogTitle() {
    return this.showNewNote ? 'Neue Notiz' : 'Notiz \'' + this.currSimpleNote.title + '\' bearbeiten';
  }
 
}