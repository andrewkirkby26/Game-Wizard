import { Component, Inject } from '@angular/core';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { Dialog } from 'src/app/interfaces/dialog';
import {Game} from "../../../../../../../../models/game";
import {Player} from "../../../../../../../../models/player";
import {GamePlayer} from "../../../../../../../../models/gamePlayer";

@Component({
  selector: 'viewInvite',
  templateUrl: './viewInvite.component.html',
  styleUrls: ['./viewInvite.component.css', '../../dialog.component.css']
})
export class ViewInviteComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);
  game: Game | null = null;

  override ngOnInit() {
    super.ngOnInit();

    this.game = this.data.data.game;
  }

  accept() {
    let player = new GamePlayer({
      user: this.authenticationService.user!,
      index: this.game?.players.length
    })
    this.gameService.acceptGameInvite(this.game!._id!, player).then((g) => {
      if (g) {
        this.eventService.closeDialogByNameReq.emit(this.Constants.DIALOG_VIEW_INVITE)
      }
    })
  }

  deny() {

  }
}
