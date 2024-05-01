import {Component} from '@angular/core';
import {NavigationService} from 'src/app/services/navigation.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {EventService} from 'src/app/services/event.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {DataCacheService} from 'src/app/services/dataHolderService';
import {CommonComponent} from '../../components/common/common.component';
import {ColorSchemeService} from 'src/app/services/colorsScheme.service';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {StorageService} from "../../../firebase/storage.service";
import {GameService} from "../../../services/game.service";

@Component({
  selector: 'perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.css']
})
export class PerspectiveComponent  extends CommonComponent {

  constructor(public override http: HttpClient,  public override authenticationService: AuthenticationService, public override navigationService: NavigationService, public override eventService: EventService,
    public override sanitizer: DomSanitizer, public override router: Router, public override dataCache: DataCacheService, public override colorSchemeService: ColorSchemeService,  public override formBuilder: FormBuilder, public override storageService: StorageService,
    public override gameService: GameService) {
    super(http, authenticationService, navigationService, eventService,sanitizer, router, dataCache, colorSchemeService, formBuilder, storageService, gameService)

    this.navigationService.perspective = this;

    setTimeout(() => {
      this.updateBrowserTabTitle(null);
    },100);

  }

  browserTabSuffix = '';
  tempHolderForDesiredNavItem : any | null = null;

  updateBrowserTabTitle(newVal: string | null) {
    if (newVal) {
      this.browserTabSuffix = newVal;
    }
    let ending = '';
    if (this.browserTabSuffix) {
      ending = this.browserTabSuffix;
    }
    document.title = this.environment.name + ' - ' + ending;
  }

  /** Pages override this method... method needs work
   *
   * Return:
   *  true: page is allowing the use to be taken away from this page
   *  false: page has an error/popup that must be shown before use can navigate away
   */
  beforeAway(desiredNavItem: any): boolean {
    this.tempHolderForDesiredNavItem = desiredNavItem;
    return true;
  }

  navigateAway() {
    if (this.tempHolderForDesiredNavItem != null) {
      this.navigationService.setView(this.tempHolderForDesiredNavItem, true);
    } else {
      this.navigationService.goBack(true);
    }
  }

  override ngOnInit() {
    super.ngOnInit();
  }
}
