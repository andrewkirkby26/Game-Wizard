import {Component, Inject, Input, ViewChild} from '@angular/core';
import {CommonComponent} from "../../../common/common.component";
import {Dialog} from "../../../../../interfaces/dialog";
import {Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {MatSelectionList} from "@angular/material/list";
import {Snackbar} from "../../../../../interfaces/snackbar";
import {Constants} from "../../../../../../../../constants/constants";
import {Game} from "../../../../../../../../models/game";
import {Player} from "../../../../../../../../models/player";
import {GamePlayer} from "../../../../../../../../models/gamePlayer";
import {User} from "../../../../../../../../models/user";

@Component({
  selector: 'newGame',
  templateUrl: './newGame.component.html',
  styleUrls: ['./newGame.component.css', '../../dialog.component.css'],
  animations: [

  ]
})
export class NewGameComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);
  game!: Game ;
  player!: GamePlayer;

  gameSetupStep = this.formBuilder.group({
    firstCtrl: ['Game', Validators.required],
    secondCtrl: [3, Validators.required],
  });
  inviteStep = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  selectedInvites: string[] = [];
  @ViewChild("stepper")
  stepper!: MatStepper;
  @ViewChild("inviteList")
  inviteList!: MatSelectionList;

  override ngOnInit() {
    super.ngOnInit();

    this.game = new Game(null);
    this.player = new GamePlayer({
      user: this.authenticationService.user!,
      index: 0
    })
    this.game.addPlayer(this.player);
    this.game.config.name = 'Game'
  }

  finishGame() {
    this.game.invitedPlayerIds = [];
    this.inviteList.selectedOptions.selected.forEach((i) => {
      this.game.invitedPlayerIds.push(i.value);
    })

    let numCPUs = this.game.config.totalNumPlayers - this.game.invitedPlayerIds.length - 1;

    for (let i = 0; i < numCPUs; i++) {
      let cpuPlayer = new GamePlayer({
        user: new User({
          _id: 'CPU' + (i + 1),
          displayName: 'CPU ' + (i + 1),
          cpu: true,
          photoURL: 'https://cdn3.iconfinder.com/data/icons/electronic-3/500/cpu-512.png'
        }),
        index: i + 1
      })
      this.game.addPlayer(cpuPlayer);
    }

    this.gameService.save(this.game).then((s) => {
      if (s != null) {
        let s = new Snackbar('Game created succesfully', null, null);
        this.eventService.showSnackBar.emit(s);

        this.eventService.closeDialogByNameReq.emit(Constants.DIALOG_NEW_GAME)
      }
    });
  }
}
