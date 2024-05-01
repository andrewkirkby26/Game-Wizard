import {Component, Inject} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Snackbar} from "../../../interfaces/snackbar";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {Constants} from "../../../../../../constants/constants";

@Component({
  selector: 'snackbarComponent',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {

  snack: Snackbar;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public body: Snackbar, public eventService: EventService) {
    this.snack = body;
  }

  protected readonly Constants = Constants;
}
