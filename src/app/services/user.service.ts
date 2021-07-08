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

  authState: any = null;
  user: User;

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {
    this.angularFireAuth.authState.pipe(switchMap(authState => {
      return this.angularFirestore.doc<User>(`users/${authState.uid}`).snapshotChanges();
    })).subscribe((userDoc) => {
      const user = userDoc.payload.data();
      const id = userDoc.payload.id;
      this.user = { ...user, id }
    })
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : false;
  }

  createUser(uid: string, username: string) {
    return from(this.angularFirestore.collection<User>("users").doc(uid).set({
      username: username
    }))
  }
}
