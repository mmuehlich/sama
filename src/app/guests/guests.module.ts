import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { GuestService } from './guest.service';

import { GuestListComponent } from './guest-list/guest-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    GuestListComponent,
    NoteDetailComponent
  ],
  providers: [GuestService]
})

export class GuestsModule { }
