import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../../constants/constants';
import { EventService } from '../services/event.service';
import { getFunctions , httpsCallable} from 'firebase/functions';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService{

  functions: any;

  constructor(public http: HttpClient, public eventService: EventService, public firebaseService: FirebaseService) { 
    this.functions = getFunctions(firebaseService.app);
  } 
  
  callFunction(functionName: string, data: any) {
    const functionCall = httpsCallable(this.functions, functionName);
    functionCall(data)
      .then((result) => {
        // console.log(result)
      });
  }
}
