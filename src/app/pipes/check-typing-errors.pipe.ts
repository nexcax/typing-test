import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'checkTypingErrors'
})
export class CheckTypingErrorsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    entryText: string,
    currentTextSelected?: string,
    showPercentages?: boolean
  ): any {
    const result = this.getTypingErrors(entryText, currentTextSelected);
    if (showPercentages === true) {
      return result.error;
    } else {
      return result.errors
        .map(error => {
          if (error[1]) {
            return `<span class="error">${error[0]}</span>`;
          } else {
            return error[0];
          }
        })
        .join(' ');
    }
  }

  getTypingErrors(entryText: string, currentTextSelected?: string) {
    const userEntryTexts = entryText
      .split(' ')
      .filter(word => word.trim() !== '');
    const typingTexts = currentTextSelected
      .split(' ')
      .filter(word => word.trim() !== '');
    const totalWords = typingTexts.length;
    let totalHits = typingTexts.length;
    const errors = [];
    for (let i = 0; i < totalWords; i++) {
      if (userEntryTexts[i]) {
        // count real hits in words typed
        if (userEntryTexts[i] !== typingTexts[i]) {
          totalHits--;
          errors.push([userEntryTexts[i], true]);
        } else {
          errors.push([userEntryTexts[i], false]);
        }
      } else {
        totalHits--;
        errors.push([typingTexts[i], true]);
      }
    }
    let percentage = 0;
    if (typingTexts.length > 0) {
      percentage = 100 - ((totalHits * 100) / typingTexts.length);
    }
    return {
      errors,
      error: percentage.toFixed(2) + '%'
    };
  }
}
