import { Component, ViewChild, ElementRef } from '@angular/core';
import { Text } from './interfaces/text';
import { MatSnackBar } from '@angular/material';
import { NumberOfWordsPipe } from './pipes/number-of-words.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NumberOfWordsPipe]
})
export class AppComponent {
  @ViewChild('inputText')
  inputText: ElementRef<HTMLTextAreaElement>;
  textSelector: string;

  textContents: Text[] = [
    {
      id: 'one',
      content: 'This is a text for the demo'
    },
    {
      id: 'two',
      content: 'Another text for a simple demonstration of changes'
    },
    {
      id: 'three',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        In auctor ultrices ex in vestibulum. Vivamus cursus neque a diam
        blandit dapibus. Maecenas consequat felis sit amet enim egestas
        venenatis. Etiam lobortis bibendum eros, et mollis leo aliquet sed.
        Mauris convallis ex vel sapien interdum vestibulum. Maecenas malesuada
        porttitor metus a scelerisque. Proin tincidunt enim luctus massa ultricies,
        ut placerat ligula sodales.`
    }
  ];
  timer: number;
  intervalSubscription$: any;
  wordsPerMinute: number[] = [];
  showResults = false;

  constructor(private snackbar: MatSnackBar, private numberOfWordsPipe: NumberOfWordsPipe) {
    this.timer = 0;
  }

  /**
   * Start the application and restart the test
   * @param event type Event
   */
  start(event) {
    this.inputText.nativeElement.value = '';
    if (this.intervalSubscription$) {
      clearInterval(this.intervalSubscription$);
      this.intervalSubscription$ = undefined;
    }
    this.timer = 0;
    this.wordsPerMinute = [];
    this.showResults = false;
    setTimeout(() => {
      this.inputText.nativeElement.focus();
    }, 200);
  }

  /**
   * Start, check and stop timer control
   * @param event type Any
   */
  checkTimer(event: any) {
    if (!this.textSelector) {
      this.snackbar.open('A text is required', 'Close');
      return;
    }
    const stringSize = this.inputText.nativeElement.value.trim().length;
    if (stringSize >= this.textSelector.trim().length) {
      // stop the timer
      clearInterval(this.intervalSubscription$);
      this.intervalSubscription$ = undefined;
      this.showResults = true;
    } else if (stringSize > 0) {
      // start the timer
      if (!this.intervalSubscription$) {
        this.showResults = false;
        this.intervalSubscription$ = setInterval(tick => {
          this.timer++;
          this.calculateWordsPerMinute();
        }, 1000);
      }
    }
  }

  calculateWordsPerMinute() {
    if ((this.timer % 60) === 0) {
      if (this.wordsPerMinute.length === 0) {
        this.wordsPerMinute = [
          this.numberOfWordsPipe.transform(this.inputText.nativeElement.value)
        ];
      } else {
        const currentTotal = this.wordsPerMinute.reduce((pastValue, newValue) => pastValue + newValue);
        const totalWords = this.numberOfWordsPipe.transform(this.inputText.nativeElement.value);
        const newWordsCount = totalWords - currentTotal;
        if (newWordsCount > 0) {
          this.wordsPerMinute = [
            ...this.wordsPerMinute,
            newWordsCount
          ];
        }
      }
    }
  }
}
