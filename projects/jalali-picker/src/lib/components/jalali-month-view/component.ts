import { Component, OnInit,
          Input, Output, EventEmitter }        from '@angular/core';

declare var require: any;
const jalaali = require('jalaali-js');

@Component({
  selector: 'jalali-month-view',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class JalaliMonthViewComponent implements OnInit {

  @Output() onChangeFunction? = new EventEmitter()
  @Input()  selectedMonth;
  @Output() selectedMonthChange = new EventEmitter<number>();
  
  thisMonth: number;

  months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  constructor() {
    
  }

  return() {
    this.selectedMonthChange.emit(this.selectedMonth);
    if(this.onChangeFunction) {
      this.onChangeFunction.emit(this.selectedMonth)
    }
  }

  selectMonth(idx) {
    this.selectedMonth = idx;
    this.selectedMonthChange.emit(this.selectedMonth);
    if(this.onChangeFunction) {
      this.onChangeFunction.emit(this.selectedMonth)
    }
  }

  ngOnInit() {

    var now = new Date();

    var jDate = jalaali.toJalaali(now.getFullYear(),now.getMonth()+1,now.getDate());

    this.thisMonth = jDate.jm;

    if(!this.selectedMonth) {
      this.selectedMonth = jDate.jm;
    }

  }

}
