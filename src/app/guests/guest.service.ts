import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Guest } from './guest';

@Injectable()
export class GuestService {

  guests: AngularFirestoreCollection<Guest>;
  noteDocument:   AngularFirestoreDocument<Node>

  constructor(private afs: AngularFirestore) {
    this.guests = this.afs.collection('guests', ref => ref.orderBy('firstname', 'desc'));
    // this.noteDocument = this.afs.doc('notes/mtp1Ll6caN4dVrhg8fWD');
  }

  getData(): Observable<Guest[]> {
    return this.guests.valueChanges();
  }

  getSnapshot() {
    // ['added', 'modified', 'removed']
    return this.guests.snapshotChanges().map(actions => {
      return actions.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() }
      })
    })
  }

  getNote(id) {
  //  return this.afs.doc<Note>('notes/' + id);
  }

  create(guest: Guest) {
    /*const note: Note = {
      content: content,
      hearts: 0,
      time: new Date().getTime()
    }*/
    return this.guests.add(guest);
  }
/*
  updateNote(id, data) {
    return this.getNote(id).update(data)
  }

  deleteNote(id) {
    return this.getNote(id).delete()
  }
*/

}
