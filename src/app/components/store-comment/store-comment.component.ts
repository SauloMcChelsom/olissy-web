import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { FormGroup, FormControl  }  from '@angular/forms';
import { StoreCommentService } from './store-comment.service'
import { AuthService  } from '../../AuthService';
import * as timeago from 'timeago.js';


@Component({
  selector: 'app-store-comment',
  templateUrl: './store-comment.component.html',
  styleUrls: ['./store-comment.component.css']
})

export class StoreCommentComponent implements OnInit, OnDestroy {

  public LOGIN:boolean = false

  public commentPlus:boolean = true

  public FOREIGN_KEY

  public user:any = { clientImageUrl:null, clientName:null, clientLastName:null}

  public comments = { status:false, limit:2, post:[] }

  private unsubscribe$ = new Subject();

  public loading:boolean = true

  public LIMIT:number = 10

  public store = { PRIMARY_KEY:null, commentStore : 0} 

  public formularioComentario: FormGroup = new FormGroup({
    FOREIGN_KEY_STORE : new FormControl(null),
    PRIMARY_KEY_STORE : new FormControl(null),
    FOREIGN_KEY_CLIENT : new FormControl(null),
    commentText: new FormControl(null),
    commentDate : new FormControl(null),
    indexDay : new FormControl(null),
    commentImageUrl : new FormControl(null),
    commentName : new FormControl(null),
    commentView : new FormControl(null),
  })

  constructor(private comentarioService: StoreCommentService,
              private route:ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    this.comentarioService.getReviewsByFOREIGN_KEY(this.route.parent.snapshot.params['id'], this.LIMIT).pipe(takeUntil(this.unsubscribe$)).subscribe(comment=>{
      this.comments.post = comment
      console.log(comment)
      this.loading = false
      this.isLogged()
      this.getStore()
    })
  }

  public async isLogged(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      if(res != null){
        this.FOREIGN_KEY = res.uid
        this.LOGIN = true
        this.getUser()
      }
    })
  }

  getStore(){
    this.comentarioService.getByStoreFOREIGN_KEY(this.route.parent.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
      this.store.PRIMARY_KEY = store[0].PRIMARY_KEY
      this.store.commentStore = store[0].commentStore || 0
    })
  }

  getUser(){
    this.comentarioService.getByUserFOREIGN_KEY(this.FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((user:any)=>{
      this.user.clientImageUrl = user[0].clientImageUrl
      this.user.clientName =  user[0].clientName
      this.user.clientLastName = user[0].clientLastName
    })
  }
  
  public publicarComentario(){
    this.formularioComentario.patchValue({
      FOREIGN_KEY_CLIENT : this.FOREIGN_KEY,
      FOREIGN_KEY_STORE:this.route.parent.snapshot.params['id'],
      PRIMARY_KEY_STORE : this.store.PRIMARY_KEY,
      commentDate : `${new Date()}` ,
      indexDay: new Date(),
      commentImageUrl : this.user.clientImageUrl,
      commentName :this.user.clientName +' '+ this.user.clientLastName,
      commentView: false
    });
    if(this.formularioComentario.get('commentText').value.length > 2){
      this.comentarioService.setCommet(this.formularioComentario.value).then((res)=>{
        this.comentarioService.incrementCommet(this.formularioComentario.get('PRIMARY_KEY_STORE').value).then(()=>{
          this.formularioComentario.reset()
        })
      })
    }
  }

public formatDate(date){
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

  return timeago.format(date, 'pt_BR');

}

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
