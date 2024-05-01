import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../../../utils/utils';

@Pipe({ name: 'unichToDayTime' })
export class UnichToDayTimePipe implements PipeTransform {
  transform(input: any, twentyFourHour?: boolean): string {
    try {
      if (input == null) {
        return '-';
      }
      var date: Date;
      if (input instanceof Date) {
        date = input;
      } else {
        date = new Date(input);
      }
      return Utils.dateFormatter(date, (twentyFourHour ? "#M#/#D# #hhhh#:#mm#" : "#M#/#D# #h#:#mm# #AMPM#"));
    } catch (e) {
      return input;
    }
  }
}