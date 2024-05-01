import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { getFirestore, Firestore, doc, deleteDoc, setDoc, getDoc,collection, query, where, getDocs,QueryFieldFilterConstraint, onSnapshot, QueryOrderByConstraint, QueryLimitConstraint  } from "firebase/firestore";
import { Observable, of } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { orderBy } from 'firebase/firestore';
import { getStorage, FirebaseStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import {StorageFile} from "../interfaces/storageFile";

@Injectable({
  providedIn: 'root',
})
export class StorageService{

  storage: FirebaseStorage;

  constructor(public firebaseService: FirebaseService) {
    this.storage = getStorage(firebaseService.app);
  }

  async findAll(url: string): Promise<StorageFile[]> {
    let rVal: StorageFile[] = [];
    let link = ref(this.storage, url);
    await listAll(link).then((res) => {
      res.items.forEach((itemRef: any) => {
        let file = new StorageFile(itemRef);
        rVal.push(file);
        getDownloadURL(ref(this.storage, itemRef.fullPath)).then((fullURL) => {
          file.url = fullURL;
          file.name = itemRef.fullPath.split('/')[itemRef.fullPath.split('/').length - 1];
          try {
            file.extension = file.name.split('.')[file.name.split('.').length - 1];
          } catch (e) {
            file.extension = null;
          }
        });
      });
    });
    return rVal;
  }

  async getURL(url: string) {
    return getDownloadURL(ref(this.storage, url));
  }
}
