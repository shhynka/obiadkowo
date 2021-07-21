import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { EMPTY, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.user = this.angularFireAuth.authState.pipe(switchMap(authState => {
      if (authState) {
        return this.angularFirestore.doc<User>(`users/${authState.uid}`).snapshotChanges();
      } else {
        return EMPTY;
      }
    }), map((userDoc) => {
      const user = userDoc.payload.data();
      const id = userDoc.payload.id;
      return { ...user, id };
    }));
  }

  get isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map((res) => !!res));
  }

  createUser(username: string, email: string, password: string) {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(switchMap((data) => {
        return from(this.angularFirestore.collection<User>('users').doc(data.user.uid).set({
          username
        }));
      }), switchMap(() => {
        return this.logIn(email, password);
      })
      );
  }

  logIn(email: string, password: string) {
    return from(this.angularFireAuth.signInWithEmailAndPassword(email, password));
  }

  sendPasswordResetEmail(email: string) {
    return from(this.angularFireAuth.sendPasswordResetEmail(email));
  }

  confirmPasswordReset(code: string, newPassword: string) {
    return from(this.angularFireAuth.confirmPasswordReset(code, newPassword));
  }

  logOut(): Observable<void> {
    return from(this.angularFireAuth.signOut());
  }
}
