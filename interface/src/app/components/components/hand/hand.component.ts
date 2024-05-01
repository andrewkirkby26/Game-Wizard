import {Component, Inject, Input, SimpleChanges} from '@angular/core';
import {CommonComponent} from "../common/common.component";
import {Player} from "../../../../../../models/player";
import {RoundPlayer} from "../../../../../../models/roundPlayer";

@Component({
  selector: 'hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css'],
  animations: [

  ]
})
export class HandComponent extends CommonComponent {

  @Input()
  player: RoundPlayer | null = null;

  @Input()
  active: boolean = false;

  @Input()
  small = false;


  // getStyle(index: number): any {
  //   let rVal: any = {};
  //   if (this.player) {
  //     let deg = 4;
  //     let xOffset = this.small ? 60 : 60;
  //     let cardCount = this.player.hand.length;
  //     let centerCardIndex = Math.ceil(cardCount / 2) - 1;
  //     let diffIndex = index - centerCardIndex;
  //     let rotate = diffIndex * deg;
  //     let ys = [0, 5, 18, 39, 69, 89, 109];
  //     let y = ys[Math.abs(diffIndex)];
  //     let x = -xOffset * diffIndex;
  //     rVal['transform'] = 'rotate(' + rotate + 'deg) translate(' + x + '%, ' + y + '%)';
  //   }
  //
  //   return rVal;
  // }
}
