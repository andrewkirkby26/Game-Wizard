import {Component, Inject, Input, SimpleChanges} from '@angular/core';
import {CommonComponent} from "../common/common.component";
import {Player} from "../../../../../../models/player";
import {RoundPlayer} from "../../../../../../models/roundPlayer";

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [

  ]
})
export class PlayerComponent extends CommonComponent {

  @Input()
  player!: RoundPlayer;

  @Input()
  index!: number;

  @Input()
  active: boolean = false;


  override ngOnInit() {
    super.ngOnInit();
  }
}
