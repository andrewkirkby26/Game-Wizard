import {Component, Inject} from '@angular/core';
import {CommonComponent} from "../common/common.component";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ top: '-100vh' }),
        animate(500, style({top: '0vh'}))
      ]) ,
      transition(':leave', [
        style({ top: '0vh' }),
        animate(500, style({ top: '-100vh'}))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ]) ,
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0}))
      ])
    ])
  ]
})
export class NavbarComponent extends CommonComponent {

  deleteGame() {
    this.gameService.removeById(this.gameService.currentGame!._id!).then(c => {
      this.navigationService.jumpHome();
      this.gameService.currentGame = null;
    })
  }

}
