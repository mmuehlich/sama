import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  priorities = ["wichtig", "normal", "info"];
  states = ["neu", "ToDo", "done", "gelöscht"];

  state;
  topic;
  priority;
  content: string[][];

  notes;
  sortedNotes;
  usedTopics;

  constructor(private noteService: NoteService) { 
    this.priority = this.priorities[1];
    this.state = this.states[0];
    this.content = [["", ""]];

    this.sortedNotes = [];
    this.usedTopics = [];
  }

  ngOnInit() {
    this.notes = this.noteService.getSnapshot();
    this.getUsedTopics();
  }

  createNote() {
    this.noteService.create(this.state, this.topic, this.priority, this.content.map(c => c[0] + '::' + c[1]).join(";;"))
    this.content = [["", ""]]

    this.sortedNotes = [];
    this.usedTopics = [];
  }

  addContent() {
    if (this.content[this.content.length-1][0].length > 0) {
      this.content.push(["", ""]);
    } else if (this.content.length > 1 && this.content[this.content.length-2][0].length == 0) {
      this.content.pop();
    }
  }

  getUsedTopics() {
    this.usedTopics = [];
    var me = this;
    this.noteService.getSnapshot().subscribe(x => {
      new Set(x.map(x => x['topic'])).forEach(
        topic => me.usedTopics.push({topic: topic, values: x.filter(x => x['topic'] == topic) }));
    });
  }

}
