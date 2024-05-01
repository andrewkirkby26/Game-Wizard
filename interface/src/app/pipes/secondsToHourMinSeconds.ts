import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../../../utils/utils';

@Pipe({name: 'secondsToHourMinSeconds'})
export class SecondsToHourMinSecondsPipe implements PipeTransform {
  transform(input: number): string {
    return Utils.secondsToHourMinSeconds(input);
  }
}