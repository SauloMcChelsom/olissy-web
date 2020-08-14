import { Pipe, PipeTransform } from '@angular/core';
import * as timeago from 'timeago.js';

@Pipe({
  name: 'formatterDateForFriend',
  pure: true
})
export class AppComponentPipe implements PipeTransform {

  transform(date: any): any {
    let locale:any = (number, index, totalSec)=> {
      return [
        ['Agora mesmo', 'precisamente agora'],
        ['%s segundos atrás', 'há %s segundos'],
        ['1 minuto atrás', 'há 1 minuto'],
        ['%s minuto atrás', 'há %s minutos'],
        ['1 hora atrás', 'há 1 hora'],
        ['%s hora atrás', 'há %s horas'],
        ['1 dia atrás', 'há 1 dia'],
        ['%s dias atrás', 'há %s dias'],
        ['1 semana atrás', 'há 1 semana'],
        ['%s semanas atrás', 'há %s semanas'],
        ['1 mês atrás', 'há 1 mês'],
        ['%s meses atrás', 'há %s meses'],
        ['1 ano atrás', 'há 1 ano'],
        ['%s anos atrás', 'há %s anos']
      ][index];
    }
  
    timeago.register('pt_BR', locale ); 

    
    let date_firebase = date
    let date_object = new Date(date_firebase)
    let date_frinend = date_object.getTime()

    return timeago.format(date_frinend, 'pt_BR');
  }
}