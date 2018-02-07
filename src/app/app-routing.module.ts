import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { ItemsListComponent } from './items/items-list/items-list.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { CostListComponent } from './costs/cost-list/cost-list.component';
import { GuestListComponent } from './guests/guest-list/guest-list.component';
import { SaveTheDate } from './ui/pages/save-the-date';
import { Wedding } from './ui/pages/wedding';
import { Login } from './ui/pages/login';
import { Hotel } from './ui/pages/hotel';

import { CoreModule } from './core/core.module'

const routes: Routes = [
  { path: '', component: Wedding }, // SaveTheDate
  { path: 'wedding', component: Wedding},
  { path: 'login', component: Login},
  { path: 'hotel', component: Hotel},

  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
  { path: 'guests', component: GuestListComponent,  canActivate: [AuthGuard] },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'costs', component: CostListComponent,  canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
