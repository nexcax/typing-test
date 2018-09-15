import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageWordsPerMinute'
})
export class AverageWordsPerMinutePipe implements PipeTransform {

  transform(wordsPerMinute: number[]): number {
    console.log(wordsPerMinute.length);
    if (wordsPerMinute.length) {
      const total = wordsPerMinute.reduce((pastValue, newValue) => pastValue + newValue);
      return Math.floor(total / wordsPerMinute.length);
    } else {
      return 0;
    }
  }

}
