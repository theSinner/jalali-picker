import { Pipe, PipeTransform }                  from '@angular/core';

declare var require: any;
const jalaali = require('jalaali-js');

@Pipe({
  name: 'jalalify'
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let gDate = new Date(value);
    let jDate = jalaali.toJalaali(gDate.getFullYear(), gDate.getMonth()+1, gDate.getDate());
    return jDate.jy+'/'+jDate.jm+'/'+jDate.jd;
  }
}