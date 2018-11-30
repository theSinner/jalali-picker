import { NgModule }                            from '@angular/core';
import { JalaliDateInputComponent }            from './components/jalali-date-input/component';
import { JalaliDatePickerComponent }           from './components/jalali-date-picker/component';
import { JalaliDatePickerDialog }              from './components/jalali-date-picker/dialog';

import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { MatInputModule }                      from '@angular/material/input';
import { MatIconModule }                       from '@angular/material/icon';
import { MatButtonModule }                     from '@angular/material/button';
import { FlexLayoutModule }                    from "@angular/flex-layout";

import { JalaliPipe }                          from './pipes/jalalify';
import { JalaliTextPipe }                      from './pipes/jalalifyText';
import { JalaliHourPipe }                      from './pipes/jalalifyHour';
import { JalaliYearViewComponent }             from './components/jalali-year-view/component';
import { JalaliMonthViewComponent }            from './components/jalali-month-view/component';
import { JalaliTimeViewComponent }             from './components/jalali-time-view/component';
import { FormsModule }                         from '@angular/forms';


@NgModule({
  declarations: [
    JalaliDateInputComponent,
    JalaliDatePickerComponent,
    JalaliPipe,
    JalaliTextPipe,
    JalaliHourPipe,
    JalaliYearViewComponent,
    JalaliMonthViewComponent,
    JalaliTimeViewComponent,
    JalaliDatePickerDialog,
  ],

  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
  ],

  entryComponents: [
    JalaliDatePickerDialog,
  ],

  providers: [
    JalaliPipe,
    JalaliTextPipe,
    JalaliHourPipe,
  ],

  exports: [
    JalaliDateInputComponent,
    JalaliDatePickerComponent,
    JalaliPipe,
    JalaliTextPipe,
    JalaliHourPipe,
  ]
})
export class JalaliPickerModule { }
