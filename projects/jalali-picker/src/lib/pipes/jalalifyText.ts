import { Pipe, PipeTransform }                  from '@angular/core';

declare var require: any;
const jalaali = require('jalaali-js');

const persianMonths = ['','فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const weekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];

@Pipe({
  name: 'jalalify_text'
})
export class JalaliTextPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    
    if(args=='multiline') {

      let gDate = new Date(value);
      let jDate = jalaali.toJalaali(gDate.getFullYear(), gDate.getMonth()+1, gDate.getDate());

      var res = weekDays[gDate.getDay()] + '\n' + jDate.jd + ' ' + persianMonths[parseInt(jDate.jm)]
      res += '\n' + jDate.jy;
      return res;  

    } else {

      let gDate = new Date(value);
      let jDate = jalaali.toJalaali(gDate.getFullYear(), gDate.getMonth()+1, gDate.getDate());

      var res = weekDays[gDate.getDay()] + ' ' + jDate.jd + ' ' + persianMonths[parseInt(jDate.jm)]
      res += ' ' + jDate.jy;
      return res;

    }

    
  }
}