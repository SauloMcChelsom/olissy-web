import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StoreOrderPipe',
  pure: true
})
export class StoreOrderPipe implements PipeTransform {

  transform(value, method): any {

    if(method == 'formatDataOrderList'){
     return  this.formatDataOrderList(value)
    }

    if(method == 'formatOrderState'){
      return  this.formatOrderState(value)
     }
  }

  public formatDataOrderList(date){
    return new Date(date).toLocaleString([], { hour12: true});
  }

  public formatOrderState(state){
    if(state == "reserved"){
      return "Reservado"
    }
    if(state == "pending"){
      return "Pendente"
    }
    if(state == "accept"){
      return "Aceito"
    }
    if(state == "packaging"){
      return "Empacotando"
    }
    if(state == "delivering"){
      return "Entregando"
    }
    if(state == "realized"){
      return "Realizado"
    }
    if(state == "finished"){
      return "Finalizado"
    }
    if(state == "abandoned"){
      return "Desistência"
    }
    if(state == "refused"){
      return "Recusado"
    }
  }
}