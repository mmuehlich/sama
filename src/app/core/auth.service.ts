import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { GuestService } from '../guests/guest.service';
import { Guest } from '../guests/guest';


@Injectable()
export class AuthService {

  authState: any = null;
  users: Guest[] = [];

  constructor(private afAuth: AngularFireAuth,
    private guestService: GuestService,
    private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  
    this.guestService.getSnapshot().subscribe(x => {
      this.users = (x as Guest[])}
    );
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get isAdmin(): boolean {
    if (!this.authenticated) { return false;}
    return this.users.filter(u => u.id == this.currentUserId && u.role == 'admin').length === 1;
  }

  get isCivil(): boolean {
    if (!this.authenticated) { return false;}
    return this.users.filter(u => u.id == this.currentUserId && u.civil).length === 1;
  }

  get user(): Guest {
    if (!this.authenticated) { return undefined;}
    return this.users.find(u => u.id == this.currentUserId);
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['displayName'] || 'User without a Name'
    }
  }

  get currentUserEmail(): string {
    if (!this.authState || this.currentUserAnonymous) {
      return ''
    } else {
      return this.authState['email'] || ''
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider, 'google');
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider, 'facebook');
  }
  

  private socialSignIn(provider, providerName: string) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData(providerName)
      })
      .catch(error => console.log(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string, name: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        user.updateProfile({
          displayName : name
        })
        this.authState.displayName = name;
        this.updateUserData('email');
      })
      .catch(error => alert(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData('email')
      })
      .catch(error => alert(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => alert('eMail verschickt'))
      .catch((error) => alert(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']); 
  }


  //// Helpers ////

  private updateUserData(loginSource: string): void {
    this.guestService.createIfNotExisting(
      this.currentUserId,
      this.authState.displayName,
      this.authState.email,
      loginSource
    );
    this.router.navigate(['/myAccount']); 
  }


}
