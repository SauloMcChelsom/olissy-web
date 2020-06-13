
import { Component, Input,  } from '@angular/core';

@Component({
  selector: 'mt-modal-nao-logado',
  templateUrl: './modal-user-not-logged.component.html',
  styleUrls: ['./modal-user-not-logged.component.css']
})

export class ModalUserNotLoggedComponent {

  @Input() tipo_mensagem:string

  public titulo:string = ""

  public texto:string = ""

  constructor() { }

  ngDoCheck(){
    if(this.tipo_mensagem == 'amaram'){
      this.titulo = "Amou esta publicação?"
      this.texto = "Faça login para que sua opinião seja levada em conta."
    }
    if(this.tipo_mensagem == 'seguiram'){
      this.titulo = "Quer seguir esta loja?"
      this.texto = "Faça login para seguir este comercio."
    }
    if(this.tipo_mensagem == 'comentar'){
      this.titulo = "Este comentario e importante para nós"
      this.texto = "Faça login para que este comentario seja visivel a todos"
    }
  }

}
