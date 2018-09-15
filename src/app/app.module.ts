import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialElementsModule } from './material/material-elements.model';
import { SecondsToTimePipe } from './pipes/seconds-to-time.pipe';
import { CharsCountPipe } from './pipes/chars-count.pipe';
import { NumberOfWordsPipe } from './pipes/number-of-words.pipe';
import { AverageWordsPerMinutePipe } from './pipes/average-words-per-minute.pipe';
import { CheckTypingErrorsPipe } from './pipes/check-typing-errors.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SecondsToTimePipe,
    CharsCountPipe,
    NumberOfWordsPipe,
    AverageWordsPerMinutePipe,
    CheckTypingErrorsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialElementsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
