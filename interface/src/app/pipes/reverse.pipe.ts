import { Pipe, PipeTransform } from '@angular/core';
/*
Trims the supplied string to 
a desired length with ... if it is too long
*/
@Pipe({name: 'reverse'})
export class ReversePipe implements PipeTransform {
  transform(items: any[]): any[] {
    return items.slice().reverse();
  }
}