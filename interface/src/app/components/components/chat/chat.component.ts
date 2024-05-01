import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import {CommonComponent} from "../common/common.component";
import {Card} from "../../../../../../models/card";
import {Player} from "../../../../../../models/player";
import {GameService} from "../../../services/game.service";
import {NavigationService} from "../../../services/navigation.service";
import {Chat, Message} from "../../../../../../models/chat";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [

  ]
})
export class ChatComponent implements  OnInit{

  message = '';
  showGameNotis = true;

  constructor(public gameService: GameService, public navigationService: NavigationService, public authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.showGameNotis = this.authenticationService.getPreference('showNotis', true);
  }


  sendMessage() {
    let chat = new Message({
      text: this.message,
      authorUserId: this.authenticationService.user?._id
    });
    // this.gameService.currentGame?.chat.addChat(chat);
    this.gameService.sendMessage(chat);
    // this.gameService.sa
    this.message = '';
  }

  setShowNotis() {
    this.authenticationService.setPreference('showNotis', this.showGameNotis);
  }
}
