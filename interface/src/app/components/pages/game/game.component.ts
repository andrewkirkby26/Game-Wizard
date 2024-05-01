import { Component, EventEmitter, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { PerspectiveComponent } from '../perspective/perspective.component';
import {Dialog} from "../../../interfaces/dialog";
import {Constants} from "../../../../../../constants/constants";
import {Snackbar} from "../../../interfaces/snackbar";

@Component({
  selector: 'gamePage',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', '../perspective/perspective.component.css']
})
export class GamePageComponent extends PerspectiveComponent {

  override browserTabSuffix = 'Game'

  override ngOnInit() {
    super.ngOnInit();

    if (!this.gameService.currentGame) {
      let params = this.Utils.getAllQueryParameters();
      if (params.gameId) {
        this.gameService.findById(params.gameId).then((g) => {
          if (g) {
            this.navigationService.selectGame(g);
            this.handlePopUps();
          }
        })
      }
    } else {
      this.handlePopUps()
    }

    this.addSubscription(this.eventService.currentGameUpdated.subscribe((game) => {
      this.handlePopUps();
    }))
  }

  numChats(): number {
    let rVal = 0;

    this.gameService.currentMessages.forEach((m) => {
      if (!m.isNotification()) {
        rVal++;
      }
    })

    return rVal;
  }

  handlePopUps() {
    setTimeout(() => {
      let currentRound = this.gameService.currentGame?.getCurrentRound();
      let currentPoint = currentRound?.getCurrentPoint();
      let user = this.authenticationService.user;

      if ( user && this.gameService.currentGame?.isPlayersTurn(user._id!)) {
        if (currentRound && currentPoint) {
          let trumpCard = currentRound.trumpCard;
          let numCardsPlayed = currentPoint.playedCards.length;

          if (trumpCard?.isWizard() && trumpCard.color == null && numCardsPlayed == 0) {
            if (!this.navigationService.isDialogOpenByName(Constants.DIALOG_COLOR_CHOOSE)) {
              this.navigationService.showDialogByName(Constants.DIALOG_COLOR_CHOOSE)
            }
          } else if (currentRound.isBetting()) {
            if (!this.navigationService.isDialogOpenByName(Constants.DIALOG_BET)) {
              let availBets = currentRound.getAvailableBets(currentRound.isLastPlayerToBet(user._id!));
              let dialog = new Dialog()
              dialog.name = Constants.DIALOG_BET;
              dialog.data = {
                availBets: availBets
              }
              this.navigationService.showDialog(dialog)
            }
          }
        }


      }
    }, 1000);
  }
}
