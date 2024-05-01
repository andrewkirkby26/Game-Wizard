import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeNullsFromArray'})
export class RemoveNullsFromArrayPipe implements PipeTransform {
  transform(input: any[]): any[] {
    let rVal: any[] = [];

    for (let i = 0; i < input.length; i++) {
      if (!input[i] && input[i] != false) {
        
      } else {
        rVal.push(input[i]);
      }
    }
    return rVal;
  }
}