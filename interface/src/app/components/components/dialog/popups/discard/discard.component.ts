import { Component, Inject } from '@angular/core';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { Dialog } from 'src/app/interfaces/dialog';
import {Constants} from "../../../../../../../../constants/constants";

@Component({
  selector: 'discard',
  templateUrl: './discard.component.html',
  styleUrls: ['./discard.component.css', '../../dialog.component.css']
})
export class DiscardComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);

  selectedColor: string | null = null;

  override ngOnInit() {
    super.ngOnInit();
  }

}
