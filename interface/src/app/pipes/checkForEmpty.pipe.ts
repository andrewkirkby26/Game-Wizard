import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'checkForEmpty'})
export class CheckForEmptyPipe implements PipeTransform {
  transform(text: any, rVal?: any): any {
    if (text && text != '' || text == 0) {
      return text;
    } else {
      if (!rVal) {
        rVal = '-';
      }
      return rVal;
    }
  }
}