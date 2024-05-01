import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../../../utils/utils';

@Pipe({name: 'hourMinSecondsBetweenTowTimes'})
export class HourMinSecondsBetweenTwoTimes implements PipeTransform {
  transform(start: any, finish: any): string {
    return Utils.hourMinSecondsBetweenTwoTimes(start, finish);
  }
}