import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charsCount'
})
export class CharsCountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${value} / ${args || 0}`;
  }

}
