import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CostService } from './cost.service';

import { MainPipe } from '../main-pipe.module'; 

import { CostListComponent } from './cost-list/cost-list.component';

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
    CostListComponent
  ],
  providers: [CostService]
})
export class CostModule { }
