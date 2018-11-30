import { Pipe, PipeTransform }                  from '@angular/core';

declare var require: any;
const jalaali = require('jalaali-js');

const persianMonths = ['','فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const weekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];

@Pipe({
  name: 'jalalify_hour'
})
export class JalaliHourPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    
    let gDate = new Date(value);
    let jDate = jalaali.toJalaali(gDate.getFullYear(), gDate.getMonth()+1, gDate.getDate());

    let hours = gDate.getHours().toString();
    let minutes = gDate.getMinutes().toString();
    if(gDate.getHours()<10) {
      hours = "0"+hours;
    }

    if(gDate.getMinutes()<10) {
      minutes = "0"+minutes;
    }

    var res = jDate.jd + ' ' + persianMonths[parseInt(jDate.jm)]
    res += ' ' + jDate.jy;
    res += ' - ' + hours +':'+ minutes;
    return res;
    
  }
}