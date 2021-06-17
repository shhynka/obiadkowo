import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'gs://obiadkowo-6a1d0.appspot.com';
    this.storage.upload(filePath, file);
  }

  deleteFile(downloadUrl) {
    this.storage.refFromURL(downloadUrl).delete();
  }

}
