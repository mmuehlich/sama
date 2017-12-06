import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Cost } from './cost';
import 'rxjs/add/operator/map';

@Injectable()
export class CostService {

  costs: AngularFirestoreCollection<Cost>;

  constructor(private afs: AngularFirestore) {
    this.costs = this.afs.collection('costs');
  }

  getData(): Observable<Cost[]> {
    return this.costs.valueChanges();
  }

  getSnapshot() {
    return this.costs.snapshotChanges().map(actions => {
      return actions.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() }
      })
    })
  }

  create(note: Cost) {
    return this.costs.add(note);
  }

  update(id, data) {
    return this.getEntry(id).update(data)
  }

  delete(id) {
    return this.getEntry(id).delete()
  }

  getEntry(id) {
    return this.afs.doc<Cost>('costs/' + id);
  }
}
