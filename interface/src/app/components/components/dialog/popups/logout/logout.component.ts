import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { Button } from 'src/app/interfaces/button';
import { Dialog } from 'src/app/interfaces/dialog';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css', '../../dialog.component.css']
})
export class LogoutComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);

  logout() {
    this.authenticationService.logout();
    this.navigationService.closeDialogByName(this.Constants.DIALOG_LOGOUT);
  }
}
