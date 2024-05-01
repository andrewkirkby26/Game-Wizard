import {Component, Inject, Input, SimpleChanges} from '@angular/core';
import {CommonComponent} from "../common/common.component";
import {Card} from "../../../../../../models/card";
import {Player} from "../../../../../../models/player";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [

  ]
})
export class CardComponent extends CommonComponent {

  @Input()
  card: Card | null = null;

  @Input()
  big = false;

  @Input()
  forceVisible = false;
  isVisible(): boolean {
    let rVal = this.forceVisible;

    if (!rVal && this.authenticationService.user && this.card) {
      let isUsersCard = this.authenticationService.user._id == this.card.playerId;
      let isFirstRound = this.gameService.currentGame?.isFirstRound();

      if (isUsersCard) {
        if (!isFirstRound) {
          rVal = true;
        }
      } else {
        if (isFirstRound) {
          rVal = true;
        }
      }
    }

    return rVal;
  }

  isSelectable(): boolean {
    let rVal = false;
    if (!this.forceVisible) {
      if (this.big && this.card && this.authenticationService.user && this.gameService.currentGame?.getCurrentRound()) {
        rVal = this.card.playable &&
            this.authenticationService.user?._id == this.card.playerId &&
            this.gameService.currentGame.getCurrentRound()!.isActive() &&
            this.gameService.currentGame?.activePlayerId == this.card.playerId
      }
    }

    return rVal;
  }

  playCard() {
    try {
      if (this.isSelectable()) {
        let game = this.gameService.currentGame;
        if (game && this.card) {
          game.playCard(this.card);
          this.gameService.save(game);
        }
      }
    } catch (e) {

    }
  }
}
