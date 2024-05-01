import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'allUppercase'})
export class AllUppercasePipe implements PipeTransform {
  transform(input: string): string {
    if (input) {
      input = input.toString();
    } else {
      return input;
    }
    return input.toUpperCase();
  }
}