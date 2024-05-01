import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeNumbersFromString'})
export class RemoveNumbersFromStringPipe implements PipeTransform {
  transform(input: string): string {
    if (input) {
      input = input.toString();
      return input.replace(/[0-9]/g, '');
    }else {
      return '';
    }
  }
}