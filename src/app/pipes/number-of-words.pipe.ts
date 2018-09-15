import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOfWords'
})
export class NumberOfWordsPipe implements PipeTransform {

  transform(value: any): number {
    if (value) {
      return value.split(' ').filter(word => word.trim() !== '').length;
    }
    return 0;
  }

}
