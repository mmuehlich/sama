import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainPipe } from '../main-pipe.module'; 
import { FormsModule } from '@angular/forms';
import { GuestService } from './guest.service';

import { GuestListComponent } from './guest-list/guest-list.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MainPipe,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    GuestListComponent
  ],
  providers: [GuestService]
})

export class GuestsModule { }
