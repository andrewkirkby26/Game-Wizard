import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common'
import {AuthenticationService} from './authentication.service';
import {EventService} from './event.service';
import {DataCacheService} from './dataHolderService';
import {Constants} from '../../../../constants/constants';
import {PerspectiveComponent} from '../components/pages/perspective/perspective.component';
import {Utils} from '../../../../utils/utils';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../components/components/dialog/dialog.component';
import {ColorSchemeService} from './colorsScheme.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Snackbar} from '../interfaces/snackbar';
import {HttpClient} from '@angular/common/http';
import {Dialog} from '../interfaces/dialog';
import {SnackbarComponent} from "../components/components/snackbar/snackbar.component";
import firebase from "firebase/compat";
import {GameService} from "./game.service";
import {Game} from "../../../../models/game";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ChatComponent} from "../components/components/chat/chat.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class NavigationService{

    constructor(private router: Router, private bottomSheet: MatBottomSheet, public dialogController: MatDialog,public httpUtil: HttpClient, private route: ActivatedRoute,private location: Location, public authenticationService: AuthenticationService,
      public eventService: EventService, public dataCache: DataCacheService, public colorSchemeService: ColorSchemeService, public _snackBar: MatSnackBar, public gameService: GameService) {

      this.parseView();

      colorSchemeService.load();
      environment.gameService = gameService;

      $(window).on('resize', () => {
        this.updateScreenSize();
        this.eventService.screenSizeChanged.emit();
      });

      setInterval(() => {
        this.cycleOnce();
      }, 1000);
      this.cycleOnce();

      this.eventService.showDialogReq.subscribe((body: Dialog) => {
        this.showDialog(body);
      })

        this.eventService.showDialogByNameReq.subscribe((name: string) => {
            this.showDialogByName(name);
        })

      this.eventService.closeDialogByNameReq.subscribe(name => {
        this.closeDialogByName(name);
      })

      this.eventService.jumpToRedirectReq.subscribe(redirect => {
        this.jumpToRedirect(redirect);
      })

      this.eventService.showSnackBar.subscribe(pack => {
        this.showSnackBar(pack);
      })

      this.eventService.setViewReq.subscribe(view => {
        this.setView(this.getNavItemByView(view));
      })

      this.updateScreenSize();
    }


    /** Emitter used to be notified when screen size is updated */
    @Output() screenSizeUpdate: EventEmitter<string> = new EventEmitter();

    desiredRouteAfterLogin: string | null = null;
    screenSize: string = Constants.SCREEN_SIZE_LARGE;
    salutation = '';
    queryParams = Utils.getAllQueryParameters();
    perspective: PerspectiveComponent | null = null;
    currentTime = new Date();

    navbarItems= [
      {
        view: Constants.ROUTE_HOME,
        minAccessLevel: null
      },
        {
            view: Constants.ROUTE_GAME,
            minAccessLevel: null
        }
    ]

    parseView() {
      this.updateQueryParams();
      let selectedView = this.queryParams.selectedView;
      let check = this.getNavItemByView(selectedView);
      let view = check ? check : this.getNavItemByView(Constants.ROUTE_HOME);
      this.setView(view, true);
    }

    showSnackBar(snack: Snackbar) {
      if (!snack.config) {
        snack.config = {
          duration: 5000
        }
      }
      let config = snack.config;
      config.data = snack;
      this._snackBar.openFromComponent(SnackbarComponent, config);
    }

    /** Method used to set view/perspective of UI. (Expects a navbarItem like object)
     * This method checks to see if a minimum acccess level is required and responds accordingly
     *
     * @param view navbarItem like object (JSON) that can be used to set view
     * @returns boolean of whether it successfully set view
     *  */
    setView(view: any, force?: boolean): boolean {
      this.desiredRouteAfterLogin = null;
      if (!view) {
        return false;
      }

      if (!force && !this.checkIfCanNavigateAway(view)) {
        return false;
      }
      if (view.view) {
        // if (this.authenticationService.initialized) {
        //   if (!this.authenticationService.canGoToView(view)) {
        //     if (this.authenticationService.user == null) {
        //       if (!this.isDialogOpenByName(Constants.DIALOG_LOGIN)) {
        //         this.showDialogByName(Constants.DIALOG_LOGIN);
        //         this.desiredRouteAfterLogin = view.view;
        //         return false;
        //       }
        //     } else {
        //       // let dialog = new Dialog(LangUtil.getScript(LangConstants.ACCESS_LEVEL), LangUtil.getScript(LangConstants.TOO_LOW_OF_ACCESS_LEVEL), []);
        //       // this.showDialog(dialog);
        //       // return false;
        //     }
        //   }
        // }

        this.queryParams.selectedView = view.view;
        this.eventService.logInfo.emit('Navigating to route ' + view.view);
        this.router.navigate([view.view], { relativeTo: this.route, queryParams: this.queryParams });
        return true;
      } else {
        return false;
      }
    }

    selectGame(game: Game) {
        if (game) {
            this.gameService.selectGame(game);
            this.queryParams.gameId = game._id;
            this.setView(this.getNavItemByView(Constants.ROUTE_GAME));
        }
    }

    showDialog(body: Dialog, disableClose = false) {
      let dialogNamesToNotAllowClosingOnClick: any[] = [Constants.DIALOG_BET]
        let noBackdrop: any[] = [Constants.DIALOG_BET]
      this.dialogController.open(DialogComponent, {
        data: body,
        hasBackdrop: !noBackdrop.includes(body.name),
        disableClose: dialogNamesToNotAllowClosingOnClick.includes(body.name!) || disableClose
      });
    }

    showDialogByName(name: string) {
      if (this.isDialogOpenByName(name)) {
        this.closeDialogByName(name);
      }
      let dialog = new Dialog();
      dialog.name = name;
      this.showDialog(dialog);
    }

    closeAllDialogs() {
      this.dialogController.closeAll();
    }

    isAnyDialogOpen(): boolean {
      return this.dialogController.openDialogs.length != 0;
    }

    isDialogOpenByName(name: string | null) {
      let rVal = false;
      try {
        this.dialogController.openDialogs.forEach((dialog) => {
          if (name == dialog.componentInstance.data.name) {
            rVal = true;
          }
        })
      } catch (e) {

      }
      return rVal;
    }

    closeDialogByName(name: string | null) {
      this.dialogController.openDialogs.forEach((dialog) => {
        if (name == dialog.componentInstance.data.name) {
          dialog.close();
        }
      })
    }

    getAvailableNavItemsForUser(): any[] {
      let rVal: any[] = [];

      let temp = this.navbarItems;
      let holder = this;
      temp.forEach(function(item:any) {
        rVal.push(item);
      })

      return rVal;
    }

    goBack(force = false) {
      if (this.perspective == null || (force || this.checkIfCanNavigateAway(null))) {
        history.back();
        setTimeout(() => {
          this.parseView();
        },150);
      }
    }

    updateScreenSize() {
      this.screenSize = Utils.getScreenSize();
    }

    /**
     *
     * Asks currently active perspective if it has any reason it WON'T allow the user to navigate away...
     * .. Thus allowing the perspective to handle that before moving the user away
     *
     * @param desiredNavItem
     * @param isView
     * @returns true if the current perspective has no reason to keep user from navigating away
     */
    checkIfCanNavigateAway(desiredNavItem: any): boolean {
      if (this.perspective != null) {
        return this.perspective.beforeAway(desiredNavItem);
      } else {
        return true;
      }
    }

    /**
     *
     * Method used to get a navbarItem or child navItem with a view attribute matching the supplied view
     * Note: Handles smarts for device/bank view
     *
     * @param view view attribute of desired navItem
     * @returns navbarItem or childNavItem with a matching view attribute
     */
    getNavItemByView(view: string): any | null {
      let rVal: any = null;

      this.getAvailableNavItemsForUser().forEach(function(item: any) {
        if (item.view == view) {
          rVal = item;
        }
      })
      return rVal;
    }

    /** Method used to redirect user AWAY from UI... should NOT be used for inner UI travel */
    jumpToRedirect(redirect: string) {
      window.location.href = redirect;
    }

    /** Cycle once called every 2 seconds just to keep the time up to date */
    cycleOnce() {
      this.currentTime = new Date();
      this.updateQueryParams();
    }

    /** Simple method to force a true browser refresh */
    refresh() {
      window.location.reload();
    }

    jumpHome() {
      this.setView(this.getNavItemByView(Constants.ROUTE_HOME));
    }

    updateQueryParams() {
      this.queryParams = Utils.getAllQueryParameters()
    }

    getCurrentRoute(): string {
      return Utils.getCurrentRoute();
    }

    openChat() {
        this.bottomSheet.open(ChatComponent, {
            hasBackdrop: false,
            autoFocus: 'textArea'
        });
    }

    toggleChat() {
        if (this.bottomSheet._openedBottomSheetRef) {
            this.closeChat()
        } else {
            this.openChat()
        }

    }

    closeChat() {
        this.bottomSheet.dismiss(this.bottomSheet._openedBottomSheetRef)
    }
}
