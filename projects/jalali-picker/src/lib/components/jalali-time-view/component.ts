import { Component, OnInit,
          Input, Output, EventEmitter }        from '@angular/core';

declare var require: any;
const jalaali = require('jalaali-js');

@Component({
  selector: 'jalali-time-view',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class JalaliTimeViewComponent implements OnInit {

  @Output() onChangeFunction? = new EventEmitter()
  
  @Input()  selectedHour;
  @Output() selectedHourChange = new EventEmitter<number>();

  @Input()  selectedMinute;
  @Output() selectedMinuteChange = new EventEmitter<number>();

  @Input()  selectedSecond;
  @Output() selectedSecondChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    var now = new Date();

    if(!this.selectedHour) {
      this.selectedHour = now.getHours();
    }

    if(!this.selectedMinute) {
      this.selectedMinute = now.getMinutes();
    }

    if(!this.selectedSecond) {
      this.selectedSecond = now.getSeconds();
    }

  }

  changeValue(mode, unit) {
    
    if(mode == 'hour') {

      this.selectedHour += unit;
      
      if(this.selectedHour > 23) {
        this.selectedHour = 23;
      } else if(this.selectedHour < 0) {
        this.selectedHour = 0;
      }

      // if(this.selectedHour < 10) {
      //   this.selectedHour = "0"+this.selectedHour;
      // }

      this.selectedHourChange.emit(this.selectedHour);
    }

    if(mode == 'minute') {
      
      this.selectedMinute += unit;
      
      if(this.selectedMinute > 59) {
        this.selectedMinute = 59;
      } else if(this.selectedMinute < 0) {
        this.selectedMinute = 0;
      }

      // if(this.selectedMinute < 10) {
      //   this.selectedMinute = "0"+this.selectedMinute;
      // }
      
      this.selectedMinuteChange.emit(this.selectedMinute);
    }

    if(mode == 'second') {
      
      this.selectedSecond += unit;
      
      if(this.selectedSecond > 59) {
        this.selectedSecond = 59;
      } else if(this.selectedSecond < 0) {
        this.selectedSecond = 0;
      }

      // if(this.selectedSecond < 10) {
      //   this.selectedSecond = "0"+this.selectedSecond;
        
      // }
      
      this.selectedSecondChange.emit(this.selectedSecond);
    }

    if(this.onChangeFunction) {
      this.onChangeFunction.emit(this.selectedHour)
    }

  }

  valueChanged(mode, itm) {
    
    if(mode == 'hour') {
      
      if(this.selectedHour > 23) {
        this.selectedHour = 23;
      } else if(this.selectedHour < 0) {
        this.selectedHour = 0;
      }

      // if(this.selectedHour < 10) {
      //   this.selectedHour = "0"+this.selectedHour;
      // }

      this.selectedHourChange.emit(this.selectedHour);
    }

    if(mode == 'minute') {
      
      if(this.selectedMinute > 59) {
        this.selectedMinute = 59;
      } else if(this.selectedMinute < 0) {
        this.selectedMinute = 0;
      }

      // if(this.selectedMinute < 10) {
      //   this.selectedMinute = "0"+this.selectedMinute;
      // }
      
      this.selectedMinuteChange.emit(this.selectedMinute);
    }

    if(mode == 'second') {
      
      if(this.selectedSecond > 59) {
        this.selectedSecond = 59;
      } else if(this.selectedSecond < 0) {
        this.selectedSecond = 0;
      }

      // if(this.selectedSecond < 10) {
      //   this.selectedSecond = "0"+this.selectedSecond;
      // }
      
      this.selectedSecondChange.emit(this.selectedSecond);
    }

    if(this.onChangeFunction) {
      this.onChangeFunction.emit(this.selectedHour)
    }

  }

}
