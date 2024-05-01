import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Constants} from "../../../../constants/constants";
import {Injectable} from "@angular/core";
import {NavigationService} from "./navigation.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private _router: Router, private navigationService: NavigationService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let path = next.routeConfig?.path;
        let navItem = this.navigationService.getNavItemByView(path!);
        if (!this.authenticationService.initialized)  {
            //If auth service is not initialized
            //Add observable to the chain to wait for it
            return new Observable<boolean>((subscriber) => this.authenticationService.initializedNoti.subscribe(resp => {
                if (this.authenticationService.canGoToView(navItem)) {
                    subscriber.next(true);
                } else {
                    this.navigationService.setView(this.navigationService.getNavItemByView(Constants.ROUTE_HOME));
                    setTimeout(() => {
                      this.navigationService.showDialogByName(Constants.DIALOG_LOGIN);
                    },500);
                    subscriber.next(false);
                }
            }))
        } else {
            //Already initialized
            if (this.authenticationService.canGoToView(navItem)) {
              return true;
            } else {
              this.navigationService.setView(this.navigationService.getNavItemByView(Constants.ROUTE_HOME));
              setTimeout(() => {
                this.navigationService.showDialogByName(Constants.DIALOG_LOGIN);
              },500);
              return false;
            }
        }
    }
}
