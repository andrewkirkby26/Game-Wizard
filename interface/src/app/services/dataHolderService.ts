import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { NavigationService } from './navigation.service';
import { Observable, of } from 'rxjs';
import { Button } from 'src/app/interfaces/button';
import { domainToASCII } from 'url';
import { catchError } from 'rxjs/internal/operators/catchError';

// The purpose of this service is to simply be a place that components can put data to persit throughout this session. (Past their lifecycle)
// That way upon their rebirth/reinit they can check if data is already here as opposed to having to wait for http calls to come back again

//PLEASE FOR ALL THAT IS HOLY USE LONG UNIQUE NAMES!!! Otherwise components will overwrite other components data
@Injectable({
  providedIn: 'root',
})
export class DataCacheService{

  /** MASSIVE VARIABLE... this guy is used all over the UI as a way to store data for other classes, services, or data..
   * .. that can survive a life cycle of an individual component
   * 
   */
  data: any = {};

}
