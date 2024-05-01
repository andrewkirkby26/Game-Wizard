import {EventEmitter, Injectable, Output} from '@angular/core';
import {Snackbar} from '../interfaces/snackbar';
import {Dialog} from '../interfaces/dialog';


@Injectable({
  providedIn: 'root',
})
export class EventService{

  @Output() openPopup: EventEmitter<string> = new EventEmitter();
  @Output() jumpToRedirectReq: EventEmitter<string> = new EventEmitter();
  @Output() setViewReq: EventEmitter<string> = new EventEmitter();
  @Output() showDialogReq: EventEmitter<Dialog> = new EventEmitter();
  @Output() showDialogByNameReq: EventEmitter<any> = new EventEmitter();
  @Output() closeDialogByNameReq: EventEmitter<any> = new EventEmitter();
  @Output() closeAllDialogsReq: EventEmitter<any> = new EventEmitter();
  @Output() showSnackBar: EventEmitter<Snackbar> = new EventEmitter();
  @Output() logInfo: EventEmitter<any> = new EventEmitter();
  @Output() logWarn: EventEmitter<any> = new EventEmitter();
  @Output() logError: EventEmitter<any> = new EventEmitter();
  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter();
  @Output() logoutReq: EventEmitter<any> = new EventEmitter();
  @Output() screenSizeChanged: EventEmitter<any> = new EventEmitter();

  @Output() currentGameUpdated: EventEmitter<any> = new EventEmitter();
}
