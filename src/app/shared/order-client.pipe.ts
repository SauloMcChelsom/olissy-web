import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderClientPipe',
  pure: true
})
export class OrderClientPipe implements PipeTransform {

  transform(value, method): any {

    if(method == 'formatMethodPayment'){
      return  this.formatMethodPayment(value)
    }
 
    if(method == 'formatInfoOrderState'){
      return  this.formatInfoOrderState(value)
    }

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

  public formatInfoOrderState(state){
    if(state == "sending"){ 
      return `seu pedido foi enviado para loja, aguarde a loja aceitar seu pedido.`
    }
    if(state == "reserved"){
      return `seu pedido esta reservado, aguarde a loja aceitar seu pedido.`
    }
    if(state == "pending"){
      return `seu pedido esta pendente por que foi alterado pela, ou algo similar, verifique a NOTA deixada pela loja, possivelmente a loja inseriu a taxa de entrega`
    }
    if(state == "accept"){
      return `seu pedido foi aceito, pela loja`
    }
    if(state == "packaging"){
      return "aguarde sua loja esta embalando seus itens com muito carinho"
    }
    if(state == "delivering"){
      return "agora estamos entregando seus itens, não saia da ir!"
    }
    if(state == "realized"){
      return "entregamos seus itens, gostou? deixa um comentario e volta denovo"
    }
    if(state == "finished"){
      return " este pedido foi finalizado com sucesso, obrigado"
    }
    if(state == "canceled"){
      return "este pedido esta cancelado"
    }
  }
}