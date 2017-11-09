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

  getGuest(id) {
    return this.afs.doc<Guest>('guests/' + id);
  }

  create(guest: Guest) {
    return this.guests.add(guest);
  }

  update(id, data) {
    data.id = undefined;
    return this.getGuest(id).update(data)
  }

  delete(id) {
    return this.getGuest(id).delete()
  }

}
