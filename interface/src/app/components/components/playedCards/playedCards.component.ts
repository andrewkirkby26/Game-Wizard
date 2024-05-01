import {Component, Inject, Input, SimpleChanges} from '@angular/core';
import {CommonComponent} from "../common/common.component";
import {Player} from "../../../../../../models/player";
import {RoundPlayer} from "../../../../../../models/roundPlayer";

@Component({
  selector: 'playedCards',
  templateUrl: './playedCards.component.html',
  styleUrls: ['./playedCards.component.css'],
  animations: [

  ]
})
export class PlayedCardsComponent extends CommonComponent {


  // CommonComponentgetStyle(index: number): any {
  //   let rVal: any = {};
  //   try {
  //     let deg = 4;
  //     let xOffset = 60;
  //     let cardCount = this.gameService.currentGame!.getCurrentRound()!.getCurrentPoint()!.playedCards.length;
  //     let centerCardIndex = Math.ceil(cardCount / 2) - 1;
  //     let diffIndex = index - centerCardIndex;
  //     let rotate = diffIndex * deg;
  //     let ys = [0, 5, 18, 39, 69, 89, 109];
  //     let y = ys[Math.abs(diffIndex)];
  //     let x = -xOffset * diffIndex;
  //     rVal['transform'] = 'rotate(' + rotate + 'deg) translate(' + x + '%, ' + y + '%)';
  //   } catch (e) {
  //
  //   }
  //
  //
  //   return rVal;
  // }
}
