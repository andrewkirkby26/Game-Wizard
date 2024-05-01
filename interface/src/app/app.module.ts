import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
// import {MatStepperHarness} from '@angular/material/stepper/testing';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {AuthenticationService} from './services/authentication.service';
import {DataCacheService} from './services/dataHolderService';
import {EventService} from './services/event.service';
import {Utils} from '../../../utils/utils';
import {AppComponent} from './components/components/app/app.component';
import {CommonComponent} from './components/components/common/common.component';
import {DialogComponent} from './components/components/dialog/dialog.component';
import {HomePageComponent} from './components/pages/home/home.component';
import {PerspectiveComponent} from './components/pages/perspective/perspective.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/authGuard.service';
import {ColorSchemeService} from './services/colorsScheme.service';
import {UnichToExactDateAndTimePipe} from './pipes/unichToExactDateAndTime.pipe';
import {UnichToDayTimePipe} from './pipes/unichToDayTime.pipe';
import {HttpInterceptorWithCredentials} from './utils/httpInterceptor';
import {LoginComponent} from './components/components/dialog/popups/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './components/components/dialog/popups/logout/logout.component';
import {SortJsonListByPipe} from './pipes/sortJsonListBy.pipe';
import {SecondsToHourMinSecondsPipe} from './pipes/secondsToHourMinSeconds';
import {SecondsToHourMinSecondsDigitalPipe} from './pipes/secondsToHourMinSecondsDigital';
import {CommasToNumberPipe} from './pipes/commasToNumber.pipe';
import {HourMinSecondsBetweenTwoTimes} from './pipes/hourMinSecondsBetweenTwoTimes';
import {AddDecimalsPipe} from './pipes/addDecimals.pipe';
import {AllUppercasePipe} from './pipes/allUppercase.pipe';
import {BooleanToYesOrNoPipe} from './pipes/booleanToYesOrNo.pipe';
import {CamelCaseSpacePipe} from './pipes/camelCaseSpace.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {CheckForEmptyPipe} from './pipes/checkForEmpty.pipe';
import {HourMinSecondsSinceTime} from './pipes/hourMinSecondsSinceTime';
import {JsonToListPipe} from './pipes/jsonToList';
import {RemoveNullsFromArrayPipe} from './pipes/removeNullsFromArray.pipe';
import {RemoveNumbersFromStringPipe} from './pipes/removeNumbersFromString.pipe';
import {ReversePipe} from './pipes/reverse.pipe';
import {ToZeroPipe} from './pipes/toZero.pipe';
import {SafePipe} from './pipes/safe.pipe';
import {SnackbarComponent} from "./components/components/snackbar/snackbar.component";
import {FirebaseService} from "./firebase/firebase.service";
import {FunctionsService} from "./firebase/functions.service";
import {StorageService} from "./firebase/storage.service";
import {GameService} from "./services/game.service";
import {NavbarComponent} from "./components/components/navbar/navbar.component";
import {NewGameComponent} from "./components/components/dialog/popups/newGame/newGame.component";
import {ViewInviteComponent} from "./components/components/dialog/popups/viewInvite/viewInvite.component";
import {GamePageComponent} from "./components/pages/game/game.component";
import {PlayerComponent} from "./components/components/player/player.component";
import {HandComponent} from "./components/components/hand/hand.component";
import {CardComponent} from "./components/components/card/card.component";
import {BetComponent} from "./components/components/dialog/popups/bet/bet.component";
import {PlayedCardsComponent} from "./components/components/playedCards/playedCards.component";
import {TrumpColorComponent} from "./components/components/dialog/popups/trumpColor/trumpColor.component";
import {DiscardComponent} from "./components/components/dialog/popups/discard/discard.component";
import {ChatComponent} from "./components/components/chat/chat.component";

@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    DialogComponent,
    PlayedCardsComponent,
    HomePageComponent,
    GamePageComponent,
    LoginComponent,
    SecondsToHourMinSecondsPipe,
    PlayerComponent,
    BetComponent,
    DiscardComponent,
    PerspectiveComponent,
    ChatComponent,
    HourMinSecondsBetweenTwoTimes,
    SecondsToHourMinSecondsDigitalPipe,
    SnackbarComponent,
    TrumpColorComponent,
    UnichToDayTimePipe,
    CapitalizePipe,
    BooleanToYesOrNoPipe,
    SafePipe,
    HandComponent,
    CardComponent,
    HourMinSecondsSinceTime,
    CamelCaseSpacePipe,
    CheckForEmptyPipe,
    JsonToListPipe,
    ViewInviteComponent,
    ToZeroPipe,
    NavbarComponent,
    NewGameComponent,
    LogoutComponent,
    CommasToNumberPipe,
    ReversePipe,
    RemoveNumbersFromStringPipe,
    RemoveNullsFromArrayPipe,
    SortJsonListByPipe,
    UnichToExactDateAndTimePipe,
    AddDecimalsPipe,
    AllUppercasePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    // MatStepperHarness,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [
    DataCacheService,
    AuthenticationService,
    ColorSchemeService,
    GameService,
    FirebaseService,
    StorageService,
    FunctionsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorWithCredentials ,
      multi: true
    },
    EventService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
