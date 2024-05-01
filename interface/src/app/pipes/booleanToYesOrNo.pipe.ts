import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'booleanToYesOrNo'})
export class BooleanToYesOrNoPipe implements PipeTransform {
  transform(text: any): string {
    if (text == true || text == 'true') {
      return 'Yes';
    } else if (text == '-'){
      return '-';
    } else {
      return 'No';
    }
  }
}