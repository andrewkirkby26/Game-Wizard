import { Component, Inject } from '@angular/core';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { Dialog } from 'src/app/interfaces/dialog';
import {Game} from "../../../../../../../../models/game";
import {Player} from "../../../../../../../../models/player";
import {GamePlayer} from "../../../../../../../../models/gamePlayer";
import {Constants} from "../../../../../../../../constants/constants";

@Component({
  selector: 'bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css', '../../dialog.component.css']
})
export class BetComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);

  bet: string | null = null;
  availableBets: string[] = [];

  override ngOnInit() {
    super.ngOnInit();

    this.availableBets = [];

    //@ts-ignore
    this.data.data.availBets.forEach((b) => {
      this.availableBets.push(b + '')
    })
  }

  placedBet() {
    let currentRound = this.gameService.currentGame?.getCurrentRound();
    let user = this.authenticationService.user;

    if (currentRound && currentRound.isBetting() && user && this.bet) {
      this.gameService.currentGame?.placeBet(user._id!, parseInt(this.bet));
      this.gameService.saveCurrentGame();
      this.navigationService.closeDialogByName(Constants.DIALOG_BET)
    }
  }
}
