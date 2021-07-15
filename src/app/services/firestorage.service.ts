import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(image: File, imagePath: string): { ref: AngularFireStorageReference, task: AngularFireUploadTask } {
    console.log(image);
    const ref = this.storage.ref(imagePath);
    const task = ref.put(image);

    return {
      ref,
      task
    };
  }

  deleteFile(imagePath: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(imagePath).delete();
  }

}
