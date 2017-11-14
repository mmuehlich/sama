import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NoteService } from './note.service';

import { MainPipe } from '../main-pipe.module'; 

import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';

import { environment } from '../../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFirestoreModule.enablePersistence(),
    MainPipe
  ],
  declarations: [
    NotesListComponent,
    NoteDetailComponent
  ],
  providers: [NoteService]
})
export class NotesModule { }
