import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../../../utils/utils';

@Pipe({name: 'hourMinSecondsSinceTime'})
export class HourMinSecondsSinceTime implements PipeTransform {
  transform(input: any): string {
    return Utils.hourMinSecondsSinceTime(input);
  }
}