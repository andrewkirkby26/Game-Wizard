import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../../../utils/utils';

@Pipe({ name: 'unichToExactDateAndTime' })
export class UnichToExactDateAndTimePipe implements PipeTransform {
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
      return Utils.dateFormatter(date, (twentyFourHour ? "#MM#/#DD#/#YY# #hhhh#:#mm#:#ss#" : "#MM#/#DD#/#YY# #h#:#mm#:#ss# #AMPM#"));
    } catch (e) {
      return input;
    }
  }
}