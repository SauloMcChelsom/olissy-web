import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'InvoicePipe',
  pure: true
})
export class invoicePipe implements PipeTransform {

  transform(value, method): any {

    if(method == 'formatMethodPayment'){
      return  this.formatMethodPayment(value)
    }

    if(method == 'formatDataOrderList'){
     return  this.formatDataOrderList(value)
    }
  }

  public formatDataOrderList(date){
    return new Date(date).toLocaleString([], { hour12: true});
  }

  public formatMethodPayment(pay):string{
    if(pay == 'money'){
      return "Dinheiro"
    }
    if(pay == 'debit'){
      return "Débito"
    }
    if(pay == 'credit'){
      return "Crédito"
    }
  }
}