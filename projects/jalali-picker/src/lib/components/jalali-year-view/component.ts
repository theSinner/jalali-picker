import { Component, OnInit,
          Input, Output, EventEmitter }        from '@angular/core';

declare var require: any;
const jalaali = require('jalaali-js');


@Component({
  selector: 'jalali-year-view',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class JalaliYearViewComponent implements OnInit {

  @Output() onChangeFunction? = new EventEmitter()
  @Input()  selectedYear;
  @Output() selectedYearChange = new EventEmitter<number>();
  currentPage = 0;

  years = [];

  thisYear: number;

  constructor() { }

  selectYear(idx) {
    this.selectedYear = idx;
    this.selectedYearChange.emit(this.selectedYear);
    if(this.onChangeFunction) {
      this.onChangeFunction.emit(this.selectedYear)
    }
  }

  return() {
    this.selectedYearChange.emit(this.selectedYear);
    if(this.onChangeFunction) {
      this.onChangeFunction.emit(this.selectedYear)
    }
  }

  changePage(unit) {
    this.currentPage += unit;
    this.updateYearBox();
  }

  updateYearBox() {

    this.years = [];

    let startYear = this.thisYear - (this.thisYear%16) + (this.currentPage*16);

    for(var i=0;i<16;i++) {
      this.years.push(startYear+i);
    }
  }

  ngOnInit() {



    var now = new Date();

    var jDate = jalaali.toJalaali(now.getFullYear(),now.getMonth()+1,now.getDate());

    this.thisYear = jDate.jy;

    if(!this.selectedYear) {
      this.selectedYear = jDate.jy;
    }

    this.updateYearBox();

  }

}
