import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(input: any): string {
    if (input || input == false) {
      input = input.toString();
    }
    if (!input) {
      return '';
    }
    return (input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1) : input;
  }
}