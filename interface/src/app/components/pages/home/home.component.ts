import { Component, EventEmitter, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';
import { Dialog } from 'src/app/interfaces/dialog';
import { Button } from 'src/app/interfaces/button';
import {Constants} from "../../../../../../constants/constants";
import {Game} from "../../../../../../models/game";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../perspective/perspective.component.css']
})
export class HomePageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Home'

  override ngAfterViewInit() {
    super.ngAfterViewInit();

  }

  viewInvite(game: Game) {
    let dialog = new Dialog();
    dialog.data = {
      game: game
    }
    dialog.name = Constants.DIALOG_VIEW_INVITE;
    this.eventService.showDialogReq.emit(dialog);
  }
}
