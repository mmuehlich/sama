import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { ItemsListComponent } from './items/items-list/items-list.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { GuestListComponent } from './guests/guest-list/guest-list.component';
import { SaveTheDate } from './ui/pages/save-the-date';

import { CoreModule } from './core/core.module'

const routes: Routes = [
  { path: '', component: SaveTheDate },
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard]},
  { path: 'guests', component: GuestListComponent,  canActivate: [AuthGuard] },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
