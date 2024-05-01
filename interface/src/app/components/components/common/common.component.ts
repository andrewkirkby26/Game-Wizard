import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { timeStamp } from 'console';
import { NavigationService } from 'src/app/services/navigation.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventService } from 'src/app/services/event.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataCacheService } from 'src/app/services/dataHolderService';
import { Constants } from '../../../../../../constants/constants';
import { Subscription } from 'rxjs';
import { ColorSchemeService } from 'src/app/services/colorsScheme.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {StorageService} from "../../../firebase/storage.service";
import {GameService} from "../../../services/game.service";
import { GameLogic} from "../../../../../../logic/GameLogic";
import {Utils} from "../../../../../../utils/utils";
import { Card } from "../../../../../../models/card";

@Component({
  selector: 'common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit{
  environment = environment;
  Constants = Constants;
  Math = Math;
  pollRate = 1000;
  Card = Card;
  GameLogic = GameLogic;
  Utils = Utils;
  DESTROYED = false;
  numberOfPolls = 0;
  subscriptions: Subscription[] = [];
  @Input()
  pid = Utils.createDomId(16);
  pollTimerId: any | null = null;
  @Input()
  shouldPollBase = true;
  percentVisible = 0;

  constructor(public http: HttpClient, public authenticationService: AuthenticationService, public navigationService: NavigationService, public eventService: EventService,
    public sanitizer: DomSanitizer, public router: Router, public dataCache: DataCacheService,  public colorSchemeService: ColorSchemeService, public formBuilder: FormBuilder, public storageService: StorageService,
    public gameService: GameService) {


  }
  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
    this.DESTROYED = true;
    clearTimeout(this.pollTimerId);
    this.subscriptions.forEach(function (subscription) {
      try {
          subscription.unsubscribe();
      } catch (e) {

      }
    })
  }

  //To be overriden where needed
  ngOnChanges(changes: SimpleChanges) {

  }

  addSubscription(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  //To be overriden where needed
  ngOnInit() {
    this.handleOverflowScroll();
  }

  handleOverflowScroll() {

  }

  poll() {
    if (!this.DESTROYED && this.shouldPollBase) {
      this.numberOfPolls++;
      try {
        this.cycleOnce();
      } catch (e) {

      }

      let temp = this;
      this.pollTimerId = setTimeout(function() {
        temp.poll();
      },this.pollRate);
    }
  }

  //To be oberriden where needed
  cycleOnce() {
    this.shouldPollBase = false;
  }

  calcPercentVisible(elem: any | null, parentDepth: number = 1): number {
    let rVal = 0;
    if (parentDepth <= 0) {
      parentDepth = 1;
    }
    if (elem) {
      try {
        elem = elem as HTMLElement;
        let top = elem.offsetTop!;
        let parent = elem.parentElement;
        if (parentDepth > 1) {
          for (let i = 1; i < parentDepth; i++) {
            try {
              top += parent!.offsetTop;
              parent = parent!.parentElement;
            } catch (e) {

            }

          }
          try {
            top += parent!.offsetTop;
          } catch (e) {

          }
        }
        let parentTop = parent!.scrollTop;
        let parentHeight = parent!.offsetHeight;
        let parentBottom = parentTop + parentHeight;
        let max =  parentBottom - top;
        rVal = max / parentHeight;
      } catch (e) {
        // console.log(e)
      }
    }

    return rVal;
  }

  getVerticalAnimation(percent: number | null = null) {
    let offset = 8;
    percent = Math.min(2, percent != null ? percent : this.percentVisible);
    return {
      transform: 'translateY(' + (offset - (percent * offset)) + 'rem)',
      opacity: Math.min(1, percent + .2)
    };
  }

  getLeftAnimation(percent: number | null = null) {
    let offset = 4;
    percent = Math.min(2, percent != null ? percent : this.percentVisible);
    return {
      transform: 'translateX(-' + (offset - (percent * offset)) + 'rem)',
      opacity: Math.min(1, percent + .2)
    };
  }

  getRightAnimation(percent: number | null = null) {
    let offset = 4;
    percent = Math.min(2, percent != null ? percent : this.percentVisible);
    return {
      transform: 'translateX(' + (offset - (percent * offset)) + 'rem)',
      opacity: Math.min(1, percent + .2)
    };
  }

  getScaleAnimation(percent: number | null = null) {
    percent = Math.min(2, percent != null ? percent : this.percentVisible);
    return {
      transform: 'scale(' + Math.min(1, Math.max(.5, percent)) + ')',
      opacity: Math.min(1, percent + .2)
    };
  }

  getOpacityAnimation(percent: number | null = null) {
    percent = Math.min(2, percent != null ? percent : this.percentVisible);
    return {
      opacity: Math.min(1, percent + .2)
    };
  }

  parseInt(s: string): number {
    return (s != null && s!= '') ? parseInt(s) : 0;
  }
}
