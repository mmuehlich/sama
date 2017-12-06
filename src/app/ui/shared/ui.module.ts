import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavService } from './nav.service';

import { UserLoginComponent } from '../user-login/user-login.component';
import { UserLoginDialogComponent } from '../user-login/user-login-dialog.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { NewUserFormComponent } from '../user-form/new-user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { TopNavAdminComponent } from '../top-nav/top-nav-admin.component';
import { TopNavEmptyComponent } from '../top-nav/top-nav-empty.component';

import { FooterNavComponent } from '../footer-nav/footer-nav.component';
import { SaveTheDate } from '../pages/save-the-date';
import { Wedding } from '../pages/wedding';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  declarations: [
    UserLoginComponent,
    UserLoginDialogComponent,
    UserProfileComponent,
    TopNavComponent,
    TopNavAdminComponent,
    TopNavEmptyComponent,
    FooterNavComponent,
    UserFormComponent,
    NewUserFormComponent,
    SaveTheDate,
    Wedding
  ],
  exports: [
    TopNavComponent,
    TopNavAdminComponent,
    TopNavEmptyComponent,
    FooterNavComponent,
    UserProfileComponent,
    SaveTheDate
  ]
})
export class UiModule { }
