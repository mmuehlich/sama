import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import 'rxjs/add/operator/map';

@Injectable()
export class NoteService {

  notesCollection: AngularFirestoreCollection<Note>;
  noteDocument:   AngularFirestoreDocument<Node>

  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes');
  }

  getData(): Observable<Note[]> {
    return this.notesCollection.valueChanges();
  }

  getSnapshot() {
    return this.notesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() }
      })
    })
  }

  getNote(id) {
    return this.afs.doc<Note>('notes/' + id);
  }

  create(note: Note) {
    return this.notesCollection.add(note);
  }

  updateNote(id, data) {
    return this.getNote(id).update(data)
  }

  deleteNote(id) {
    return this.getNote(id).delete()
  }

}
