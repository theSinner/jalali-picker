import { Component, OnInit, Inject,
         EventEmitter, Input, Output }         from '@angular/core';

import { MatDialog, MatDialogRef,
         MAT_DIALOG_DATA }                     from '@angular/material';

declare const jQuery:any;
declare const $ :any;

declare var require: any;
const jalaali = require('jalaali-js');


@Component({
  selector: 'jalali-date-picker-dialog',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class JalaliDatePickerDialog implements OnInit {

  @Input() clickToChoose: boolean = false;
  @Input() timePicker: boolean = false;

  @Output() changeFunction? = new EventEmitter()
  @Input()  selectedDate?;
  @Output() selectedDateChange = new EventEmitter<string>();
  @Input() mode: string = 'horizontal';

  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;

  selectedHour: number;
  selectedMinute: number;
  selectedSecond: number;

  viewMode: string = 'day';
  today: string;
  monthBox: any[][];
  weekDaysLables = {
    'short': ['ش', '۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج'],
    'normal': ['شنبه', '۱شنبه', '۲شنبه', '۳شنبه', '۴شنبه', '۵شنبه', 'جمعه'],
    'extened': ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
  }

  persianMonths = ['','فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];


  constructor(
      public dialogRef: MatDialogRef<JalaliDatePickerDialog>
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.onNoClick();
  }

  choose() {
    
    let value = new Date(this.selectedDate);

    if(this.timePicker) {
      value.setHours(this.selectedHour);
      value.setMinutes(this.selectedMinute);
      value.setSeconds(this.selectedSecond);
    }
    else {
      value.setHours(0);
      value.setMinutes(0);
      value.setSeconds(0); 
    }

    let valueStr = value.toISOString().substr(0, 19);
    valueStr = valueStr+'Z';

    this.selectedDateChange.emit(valueStr);
    
    if(this.changeFunction) {
      this.changeFunction.emit(valueStr);
    }

    this.close();

  }

  goToday() {

    var now = new Date();
    
    this.selectedDate = this.getUniqueDate(now).toISOString();

    var jDate = jalaali.toJalaali(now.getFullYear(),now.getMonth()+1,now.getDate());
    
    this.selectedYear = jDate.jy;

    this.selectedMonth = jDate.jm;

    this.selectedDay = jDate.jd;

    this.updateMonthBox();

  }


  getUniqueDate(dt) {
    dt.setHours(12);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }

  dataChanged(ev) {
    this.viewMode = 'day';
    this.updateMonthBox();
  }

  goNextMonth() {
    this.selectedMonth += 1;
    if(this.selectedMonth > 12) {
      this.selectedMonth = 1;
      this.selectedYear += 1;
    }
    this.updateMonthBox();
  }

  goPrevMonth() {
    this.selectedMonth -= 1;
    if(this.selectedMonth < 1) {
      this.selectedMonth = 12;
      this.selectedYear -= 1;
    }
    this.updateMonthBox();
  }

  showMonthBox() {
    this.viewMode = 'month';
  }

  showYearBox() {
    this.viewMode = 'year';
  }

  ngOnInit() {
    
    var now = new Date();

    this.today = this.getUniqueDate(now).toISOString();
    
    let selectedDate = this.selectedDate;

    if(!this.selectedDate) {
      this.selectedDate = this.getUniqueDate(now).toISOString();  
    } else {
      now = new Date(this.selectedDate);
    }

    var jDate = jalaali.toJalaali(now.getFullYear(),now.getMonth()+1,now.getDate());
    if(!this.selectedYear) {
      this.selectedYear = jDate.jy;
    }

    if(!this.selectedMonth) {
      this.selectedMonth = jDate.jm;
    }

    if(!this.selectedDay) {
      this.selectedDay = jDate.jd;
    }

    let dt = new Date();

    if(selectedDate) {
      dt = new Date(selectedDate);
    }

    this.selectedHour = dt.getHours();
    this.selectedMinute = dt.getMinutes();
    this.selectedSecond = dt.getSeconds();

    console.log(this.selectedHour);
    console.log(this.selectedMinute);
    console.log(this.selectedSecond);

    this.updateMonthBox();
  }

  updateSelectedDate() {
    let gDate = jalaali.toGregorian(this.selectedYear, this.selectedMonth, this.selectedDay);
    var firstDayOfMonth = new Date(gDate.gy, gDate.gm -1, gDate.gd);
    this.selectedDate = this.getUniqueDate(firstDayOfMonth);
  }

  selectDate(itm) {
    this.selectedDate = itm['value'];
    if(this.clickToChoose && !this.timePicker) {

      let value = new Date();
      
      value.setHours(0);
      value.setMinutes(0);
      value.setSeconds(0);

      let valueStr = value.toISOString().substr(0, 19);
      valueStr = valueStr+'Z';

      this.selectedDateChange.emit(valueStr);
      if(this.changeFunction) {
        this.changeFunction.emit(valueStr)
      }

      this.close();

    }
    
  }

  updateMonthBox() {
    this.monthBox = [];
    var monthLength = jalaali.jalaaliMonthLength(this.selectedYear, this.selectedMonth);
    var tempDay = 1;
    var weekDay;
    var gDate;
    var weekCounter = 0;
    gDate = jalaali.toGregorian(this.selectedYear, this.selectedMonth, 1);
    var firstDayOfMonth = new Date(gDate.gy, gDate.gm -1, gDate.gd).getDay() + 1;
    if(firstDayOfMonth==7)
    {
      firstDayOfMonth = 0;
    }
    this.monthBox.push([]);
    for(var i=0;i<firstDayOfMonth;i++) {
      this.monthBox[weekCounter].push({
        'label': ''
      });
    }
    var offset = firstDayOfMonth;
    while(tempDay <= monthLength) {
      
      if(weekCounter !=0) {
        this.monthBox.push([]);
      }
      gDate = jalaali.toGregorian(this.selectedYear,this.selectedMonth,tempDay);
      weekDay = new Date(gDate.gy, gDate.gm -1, gDate.gd).getDay() + 1;
      if(weekDay==7)
      {
        weekDay = 0;
      }
      for(let i=weekDay;i<7 && tempDay<=monthLength;i++) {
        gDate = jalaali.toGregorian(this.selectedYear,this.selectedMonth,tempDay);
        var tempDate = new Date(gDate.gy, gDate.gm -1, gDate.gd);
        this.monthBox[weekCounter].push({
          'label': tempDay,
          'value': this.getUniqueDate(tempDate).toISOString()
        });
        tempDay += 1;

      }

      offset = 0;

      weekCounter += 1;
    }
  }


}
