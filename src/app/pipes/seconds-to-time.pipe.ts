import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {
  transform(seconds: any): string {
    let hours = `${Math.floor(seconds / 3600)}`;
    let minutes = `${Math.floor((seconds - Number(hours) * 3600) / 60)}`;
    let secondsCalculated = `${seconds - Number(hours) * 3600 - Number(minutes) * 60}`;
    if (Number(hours) < 10) {
      hours = '0' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    }
    if (Number(secondsCalculated) < 10) {
      secondsCalculated = '0' + secondsCalculated;
    }
    return hours + ':' + minutes + ':' + secondsCalculated;
  }
}
