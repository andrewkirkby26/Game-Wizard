import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { getFirestore, Firestore, doc, deleteDoc, Timestamp, Query, setDoc, getDoc,collection, QueryCompositeFilterConstraint, addDoc, query, where, getDocs,QueryFieldFilterConstraint, onSnapshot, QueryOrderByConstraint, QueryLimitConstraint  } from "firebase/firestore";
import { Observable, of } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { orderBy } from 'firebase/firestore';
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root',
})
export class FirestoreService{

  db: Firestore;

  constructor(public firebaseService: FirebaseService) {
    this.db = getFirestore(firebaseService.app);
  }

  async getDocumentByCollectionAndName(collection: string, docName: string){
    const docRef = doc(this.db, collection, docName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data: any = docSnap.data();
      data._id = docSnap.id;
      return data;
    } else {
      return null;
    }
  }

  async queryForDocuments(coll_name: string, qu: QueryCompositeFilterConstraint | QueryFieldFilterConstraint | null, order?: QueryOrderByConstraint | null, limit?: QueryLimitConstraint | null) {
    let rVal: any[] = [];
    let coll_ref = collection(this.db, coll_name);
    let q: QueryCompositeFilterConstraint | QueryFieldFilterConstraint | Query;
    if (qu != null) {
      if (qu instanceof QueryCompositeFilterConstraint) {
        q = query(coll_ref, qu);
      } else {
        q = query(coll_ref, qu);
      }
    } else {
      q = query(coll_ref);
    }

    if (order) {
      if (limit) {
        if (qu) {
          if (qu instanceof QueryCompositeFilterConstraint) {
            q = query(coll_ref, qu, order, limit);
          } else {
            q = query(coll_ref, qu, order, limit);
          }
        } else {
          q = query(coll_ref, order, limit);
        }
      } else {
        if (qu) {
          if (qu instanceof QueryCompositeFilterConstraint) {
            q = query(coll_ref, qu, order);
          } else {
            q = query(coll_ref, qu, order);
          }
        } else {
          q = query(coll_ref, order);
        }
      }
    } else if (limit) {
      if (qu) {
        if (qu instanceof QueryCompositeFilterConstraint) {
          q = query(coll_ref, qu, limit);
        } else  {
          q = query(coll_ref, qu, limit);
        }
      } else {
        q = query(coll_ref, limit);
      }
    }

    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data: any = doc.data();
      data._id = doc.id;
      rVal.push(data);
    });
    return rVal;
  }

  async deleteDocumentByCollectionAndName(collection: string, docName: string){
    const docRef = doc(this.db, collection, docName);
    await deleteDoc(docRef);
  }

  async setDocument(collection: string, docName: string | null | undefined, docObj: any) {
    if (docName != null) {
      await setDoc(doc(this.db, collection, docName), Object.assign({}, docObj));
    } else {
      await this.addDocument(collection, docObj);
    }
  }

  async addDocument(collectionName: string, docObj: any) {
    delete docObj._id;
    await addDoc(collection(this.db, collectionName), Object.assign({}, docObj));
  }

  async findAll(coll_name: string, order?: QueryOrderByConstraint | null, limit?: QueryLimitConstraint | null) {
    return this.queryForDocuments(coll_name, null, order, limit)
  }

  timestampFromDate(date: Date): Timestamp {
    return Timestamp.fromMillis(date.valueOf());
  }
}
