import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatterDateForPayment',
  pure: true
})
export class AdminPaymentPipe implements PipeTransform {

  transform(date: any): any {
    var data = new Date(date);
    var dia  = data.getDate().toString();
    var diaF = (dia.length == 1) ? '0'+dia : dia;
    var mes  = (data.getMonth()+1).toString();
    var mesF = (mes.length == 1) ? '0'+mes : mes;
    var anoF = data.getFullYear();
    var formatter = diaF+"/"+mesF+"/"+anoF
    return formatter
  }
}