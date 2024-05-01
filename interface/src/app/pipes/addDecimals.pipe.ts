import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'addDecimals'})
export class AddDecimalsPipe implements PipeTransform {
  transform(number: any, numberOfDecimals: number): any {
    if (number && !numberOfDecimals) {
      return number;
    } else if (number != null) {
      try { 
        number = parseFloat(number);
        return number.toFixed(numberOfDecimals)
      } catch (e) { 
        return number;
      }
    }
  }
}