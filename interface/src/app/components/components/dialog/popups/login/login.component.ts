import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { Button } from 'src/app/interfaces/button';
import { Dialog } from 'src/app/interfaces/dialog';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../dialog.component.css']
})
export class LoginComponent extends CommonComponent {

  @Input()
  data = new Dialog('', '', []);
  username = new FormControl('');
  password = new FormControl('');
  loading = false;

  // login() {
  //   this.username.setErrors(null);
  //   this.password.setErrors(null);
  //
  //   let useVal = this.username.value;
  //   let passVal = this.password.value;
  //   if (useVal == null || useVal == '' ||  passVal == null || passVal == '') {
  //     if (useVal == '' || useVal == null) {
  //       this.username.setErrors({'label': '*' + this.LangUtil.getScript(this.LangConstants.REQUIRED)});
  //     }
  //     if (passVal == '' || passVal == null) {
  //       this.password.setErrors({'label': '*' + this.LangUtil.getScript(this.LangConstants.REQUIRED)});
  //     }
  //   } else {
  //     this.loading = true;
  //     this.authenticationService.login(useVal, passVal).subscribe(resp => {
  //       this.loading = false;
  //       if (typeof(resp) == 'string') {
  //         if (resp == 'Incorrect Password') {
  //           this.password.setErrors({'label': this.LangUtil.getScript(this.LangConstants.INCORRECT_PASSWORD)});
  //         } else if (resp == 'User does not exist with that username')  {
  //           this.username.setErrors({'label': this.LangUtil.getScript(this.LangConstants.USERNAME_NOT_FOUND)});
  //         } else {
  //           this.username.setErrors({'label': resp});
  //         }
  //       } else {
  //         this.navigationService.closeDialogByName(this.Constants.DIALOG_LOGIN);
  //       }
  //     });
  //   }
  // }
}
