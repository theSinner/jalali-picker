import { Component, OnInit, Input,
          Renderer, ViewChild,ElementRef,
          Output, EventEmitter  }              from '@angular/core';


import { JalaliHourPipe }                      from '../../pipes/jalalifyHour';
import { JalaliTextPipe }                      from '../../pipes/jalalifyText';
import { MatDialog }                           from '@angular/material';
import { JalaliDatePickerDialog }              from '../jalali-date-picker/dialog';

declare const jQuery:any;
declare const $ :any;


@Component({
  selector: 'jalali-date-input',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class JalaliDateInputComponent implements OnInit {

  @Input() placeholder?: string;
  @Input() showDialog?: boolean = false;
  @Input() clickToChoose: boolean = false;
  @Input() timePicker: boolean = false;
  @Input() openMode: boolean = false;

  @Input() mode: string = 'horizontal';
    
  @Output() onChangeFunction? = new EventEmitter()
  @Input()  value?;
  @Output() valueChange = new EventEmitter<string>();

  dateToShow: String;

  @ViewChild('container') container:ElementRef;
  @ViewChild('floatBox') floatBox:ElementRef;
  globalListnersUnlisteners: Function[] = [];


  constructor(private readonly renderer: Renderer,
              public jalalifyHour: JalaliHourPipe,
              public dialog: MatDialog,
              public jalalifyText: JalaliTextPipe) { }

  ngOnInit() {
    if(!this.placeholder) {
      this.placeholder = "انتخاب تاریخ";
    }
    this.globalListnersUnlisteners.push(
      this.renderer.listen(document, 'keydown', (e: KeyboardEvent) => {
        this.onKeyPress(e);
      }),
      this.renderer.listen(document, 'click', () => {
        this.onBodyClick();
      })
    );

    if(this.value) {
      
      if(typeof this.value == "object") {
        this.value = this.value.toISOString();
      }

      if(this.timePicker) {
        this.dateToShow = this.jalalifyHour.transform(this.value);
      } else {
        this.dateToShow = this.jalalifyText.transform(this.value);
      }

    }

    this.hideCalendar = this.hideCalendar.bind(this);

  }

  convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  onChange(ev) {

    console.log(ev);
    this.valueChange.emit(ev);
    if(this.onChangeFunction) {
      this.onChangeFunction.emit(ev);
    }
    if(this.timePicker) {
      this.dateToShow = this.jalalifyHour.transform(ev);
    } else {
      this.dateToShow = this.jalalifyText.transform(ev);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    switch (event.keyCode) {
      case (9):
      case (27):
        this.hideCalendar();
        break;
    }
  }



  showCalendar() {
    if(!this.showDialog) {

      this.openMode = true; 
      console.log(this.container.nativeElement);
      console.log($(this.container.nativeElement));

      let top = $(this.container.nativeElement).position().top;
      let height = $(this.container.nativeElement).height();

      let left = $(this.container.nativeElement).position().left;
      let width = $(this.container.nativeElement).width();


      let pickerBoxWidth = this.convertRemToPixels(25);
      let pickerBoxHeight = $(this.floatBox.nativeElement).height();

      console.log(pickerBoxWidth);

      console.log(left);

      console.log(width);

      let resultTop = top + height;

      if($(document).height() < resultTop + pickerBoxHeight) {
        resultTop = top - pickerBoxHeight;
      }

      let resultLeft = 0;

      if(pickerBoxWidth>width) {
        resultLeft = left - (pickerBoxWidth-width)/2;
      }
      else {
        resultLeft = left + (width-pickerBoxWidth)/2;
      }

      console.log(resultTop);
      console.log(resultLeft);

      if(resultLeft < 0) {
        resultLeft = 10;
      } else if(resultLeft > $(document).width()) {
        resultLeft = $(document).width() - pickerBoxWidth - 10; 
      }

      console.log(resultLeft);

      $(this.floatBox.nativeElement).addClass('float');
      $(this.floatBox.nativeElement).css('top', resultTop);
      $(this.floatBox.nativeElement).css('left', resultLeft);

    }
    
    else {
      const dialogRef = this.dialog.open(JalaliDatePickerDialog, {
        panelClass: 'jalaliPickerDialog',
        'width': '33rem',
        data: {}
      });
      dialogRef.componentInstance.timePicker = this.timePicker;
      dialogRef.componentInstance.clickToChoose = this.clickToChoose;
      dialogRef.componentInstance.selectedDate = this.value;
      dialogRef.componentInstance.mode = this.mode;
      dialogRef.componentInstance.changeFunction.subscribe((ev) => {
        this.onChange(ev);
      });
      dialogRef.afterClosed().subscribe(() => {
        dialogRef.componentInstance.changeFunction.unsubscribe();
      });
      
    }
  }

  hideCalendar() {
    this.openMode = false; 
  }

  onBodyClick() {
    // this.hideCalendar();
  }

}
