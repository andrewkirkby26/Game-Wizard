import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { Button } from 'src/app/interfaces/button';
import { Dialog } from 'src/app/interfaces/dialog';
import { Constants } from '../../../../../../constants/constants';

@Component({
  selector: 'mydialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  data = new Dialog('', '', []);
  Constants = Constants;

  constructor(@Inject(MAT_DIALOG_DATA) public body: Dialog, public eventService: EventService) {
    this.data = body;
  }

  buttonClicked(button: Button) {
    this.eventService.closeDialogByNameReq.emit(null);
    setTimeout(() => {
      button.emitter.emit(button.param);
    },250);
  }
}
