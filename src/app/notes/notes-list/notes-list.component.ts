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
  states = ["neu", "ToDo", "done"]; 

  showNewNote = false;
  showEditNote = false;

  currSimpleNote: SimpleNote;
  notes;

  data: Note[];
  
  constructor(private noteService: NoteService) { 
    this.currSimpleNote = this.getEmptyNote();
    this.notes = this.noteService.getSnapshot();

    var me = this;
    this.noteService.getSnapshot().subscribe(x => me.data = (x as Note[]));
  }

  ngOnInit() {
  }

  createNote() {
    if (!this.currSimpleNote.id) {
      this.currSimpleNote.id = new Date().toString(); 
    }
    var parent:Note = this.data.find(n => n.topic == this.currSimpleNote.topic);
    if (parent) {
      parent.notes = parent.notes.filter(n => n.id !== this.currSimpleNote.id);

      parent.notes.push(this.currSimpleNote);
      this.noteService.updateNote(parent.id, parent);

      this.currSimpleNote = this.getEmptyNote();
      this.showEditNote = false;
      this.showNewNote = false;
      return;
    }

    var newNote = {
      topic: this.currSimpleNote.topic,
      notes: [ this.currSimpleNote ]
    };
    this.noteService.create(newNote);
    this.currSimpleNote = this.getEmptyNote();

    this.showEditNote = false;
    this.showNewNote = false;
  }

  addContent() {
    var c = this.currSimpleNote.content;
    if (c[c.length-1].key.length > 0) {
      c.push({key: "", value: ""});
    } else while (c.length > 1 && c[c.length-2].key.length == 0) {
      c.pop();
    }
  }

  deleteNote(noteCollection: any, note: any) {
    if (confirm('Notiz ' + note.title + ' löschen?')) {
      var n = [];
      for (var i=0; i<noteCollection.notes.length; i++) {
        if (noteCollection.notes[i].id !== note.id)
          n.push(noteCollection.notes[i]);
      }
      noteCollection.notes = n;
      if (n.length == 0) {
        this.noteService.deleteNote(noteCollection.id);
      } else {
        this.noteService.updateNote(noteCollection.id, noteCollection);
      }
    }
  }
  
  editNote(note: any) {
    this.showEditNote = true;
    this.currSimpleNote = note;
  }

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
 
}