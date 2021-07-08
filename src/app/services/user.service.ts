import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.angularFireAuth.authState.pipe(switchMap(authState => {
      return this.angularFirestore.doc<User>(`users/${authState.uid}`).snapshotChanges();
    })).subscribe((userDoc) => {
      console.log("wtf", userDoc.payload.data());
      const user = userDoc.payload.data();
      const id = userDoc.payload.id;
      this.user = { ...user, id }
    })
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  createUser(username: string, email: string, password: string) {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password)).pipe(switchMap((data) => {
      this.logIn(email, password);
      return from(this.angularFirestore.collection<User>("users").doc(data.user.uid).set({
        username: username
      }))
    }))
  }

  logIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(email: string) {
    this.angularFireAuth.sendPasswordResetEmail(email);
  }
}
