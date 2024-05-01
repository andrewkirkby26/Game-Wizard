import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {FirebaseConfig} from "../../../../constants/firebaseConfig";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService{

  app = initializeApp(FirebaseConfig.FIREBASE_CONFIG);
}
