import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Guest } from './guest';

@Injectable()
export class GuestService {

  guests: AngularFirestoreCollection<Guest>;

  constructor(private afs: AngularFirestore) {
    this.guests = this.afs.collection('guests');
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

  getByName(name) {
    return this.guests = this.afs.collection('guests',
      ref => ref.where('name', "==", name)
    );
    /*  return this.guests
      .map(user => {
         debugger;
  
         this.guestService.getByName([user.displayName, user.email]);
        // user.displayName
        // user.email
        return !!user;})
      .do(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/']);
        }
    })
  */

    //    return ""; //this.afs.doc<Guest>('guests/' + id);
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

  createIfNotExisting(id, name, email, loginSource) {
    this.afs.firestore.doc('guests/' + id).get().then(
      docSnapshot => {
        if (docSnapshot.exists) { return }
        else { 
          this.afs.firestore.doc('guests/' + id).set({
            greeting: '',
            name: name,
            adults: [{name: name}],
            children: [],
            civil: false,
            state: 'new',
            loginToken: '',
            address: '',
            email: email,
            phone: '',
            remarks: '',
            hiddenRemarks: 'login via ' + loginSource,
          })
        }
      }
    );
  }

}
