import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User; // zamienić na observable

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.angularFireAuth.authState.pipe(switchMap(authState => {
      // what if authState is Null here
      return this.angularFirestore.doc<User>(`users/${authState.uid}`).snapshotChanges();
    })).subscribe((userDoc) => {
      const user = userDoc.payload.data();
      const id = userDoc.payload.id;
      this.user = { ...user, id }
    })
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  createUser(username: string, email: string, password: string) {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(switchMap((data) => {
        return from(this.angularFirestore.collection<User>("users").doc(data.user.uid).set({
          username: username
        }))
      }), switchMap(() => {
        return this.logIn(email, password);
      })
      )
  }

  logIn(email: string, password: string) {
    return from(this.angularFireAuth.signInWithEmailAndPassword(email, password));
  }

  sendPasswordResetEmail(email: string) {
    return from(this.angularFireAuth.sendPasswordResetEmail(email));
  }
}
