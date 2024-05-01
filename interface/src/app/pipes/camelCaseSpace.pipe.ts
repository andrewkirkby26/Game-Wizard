import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'camelCaseSpace'})
export class CamelCaseSpacePipe implements PipeTransform {
  transform(input: string): string {
    if (input) {
      input = input.toString();
    }
    return (input.length > 0) ? input.charAt(0).toUpperCase() + input.replace(/([A-Z])/g, ' $1').trim().substr(1) : input;
  }
}