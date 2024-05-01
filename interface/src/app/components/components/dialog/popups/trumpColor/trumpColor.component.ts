import { Component, Inject } from '@angular/core';
import { Input } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { Dialog } from 'src/app/interfaces/dialog';
import {Constants} from "../../../../../../../../constants/constants";
import {Message} from "../../../../../../../../models/chat";
import {Utils} from "../../../../../../../../utils/utils";

@Component({
  selector: 'trumpColor',
  templateUrl: './trumpColor.component.html',
  styleUrls: ['./trumpColor.component.css', '../../dialog.component.css']
})
export class TrumpColorComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);

  selectedColor: string | null = null;

  selectColor() {
    let currentRound = this.gameService.currentGame?.getCurrentRound();
    let currentPoint = currentRound?.getCurrentPoint();
    let user = this.authenticationService.user;

    if (currentRound && currentPoint && user && this.selectedColor && currentRound.trumpCard) {
      currentRound.trumpCard.color = this.selectedColor;
      this.gameService.saveCurrentGame();
      let message = new Message({
        text: user.displayName + ' picked ' + this.selectedColor + ' as the trump color'
      })
      Utils.sendMessage(this.gameService.currentGame!, message);
      this.navigationService.closeDialogByName(Constants.DIALOG_COLOR_CHOOSE)
    }
  }
}
