import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../../../utils/utils';

@Pipe({name: 'secondsToHourMinSecondsDigital'})
export class SecondsToHourMinSecondsDigitalPipe implements PipeTransform {
  transform(input: number | null): string {
    return Utils.secondsToHourMinSecondsDigital(input);
  }
}