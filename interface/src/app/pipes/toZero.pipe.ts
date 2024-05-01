import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toZero'})
export class ToZeroPipe implements PipeTransform {
  transform(text: string): string {
    if (text && text != '') {
      return text;
    } else {
      return '0';
    }
  }
}