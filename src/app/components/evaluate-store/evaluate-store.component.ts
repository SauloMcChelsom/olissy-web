import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl  }  from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../AuthService'
import { EvaluateStoreService} from './evaluate-store.service';


@Component({
  selector: 'app-evaluate-store',
  templateUrl: './evaluate-store.component.html',
  styleUrls: ['./evaluate-store.component.css']
})

export class EvaluateStoreComponent implements OnInit, OnDestroy {

  public UserIsLogged:boolean = false

  private unsubscribe$ = new Subject();

  public formularioComentario: FormGroup = new FormGroup({
    PRIMARY_KEY : new FormControl(null),
    FOREIGN_KEY_CLIENT : new FormControl(null),
    FOREIGN_KEY_STORE : new FormControl(null),
    commentText: new FormControl(null),
    indexDay : new FormControl(null),
    commentDate : new FormControl(null),
    commentImageUrl : new FormControl(null),
    commentName : new FormControl(null),
    commentView : new FormControl(false),
  })

  public asyncCount:boolean = true

  constructor(private authService:AuthService,
              private avaliacaoService:EvaluateStoreService,
              private router_navigator: Router,
              private route:ActivatedRoute) {}

  ngOnInit() {
    this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
      if(isLogged === null){
        this.UserIsLogged = false
      }else{
        this.cliente(isLogged.uid)
        this.UserIsLogged = true
      }
    })
  }

  public isLogged() {
    return  this.authService.isLogged()
  }

  public publicarComentarioClick(){
    this.avaliacaoService.comentar(this.formularioComentario.value).then(()=>{
      this.avaliacaoService.getCommentStoreCount(this.formularioComentario.get('FOREIGN_KEY_STORE').value).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
        
        if(Object.keys(res).length == 0 && this.asyncCount == true){
          this.asyncCount = false
          let commentStoreCount = {
            FOREIGN_KEY : this.formularioComentario.get('FOREIGN_KEY_STORE').value,
            PRIMARY_KEY : "",
            count : 1
          }
          this.avaliacaoService.createCommentStoreCount(commentStoreCount).then(()=>{
            this.formularioComentario.reset()
            this.router_navigator.navigate(['/product'])
          })
        }
        if(Object.keys(res).length != 0 && this.asyncCount == true){
          this.asyncCount = false
          this.avaliacaoService.incrementcommentStoreCount(res[0].PRIMARY_KEY).then(()=>{
            this.formularioComentario.reset()
            this.router_navigator.navigate(['/product'])
          })
        }
      })
    })
  }

  public publicarComentarioEnter(){
    this.avaliacaoService.comentar(this.formularioComentario.value).then(a=>{
      this.avaliacaoService.getCommentStoreCount(this.formularioComentario.get('FOREIGN_KEY_STORE').value).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
        
        if(Object.keys(res).length == 0 && this.asyncCount == true){
          this.asyncCount = false
          let commentStoreCount = {
            FOREIGN_KEY : this.formularioComentario.get('FOREIGN_KEY_STORE').value,
            PRIMARY_KEY : "",
            count : 1
          }
          this.avaliacaoService.createCommentStoreCount(commentStoreCount).then(()=>{
            this.formularioComentario.reset()
            this.router_navigator.navigate(['/product'])
          })
        }
        if(Object.keys(res).length != 0 && this.asyncCount == true){
          this.asyncCount = false
          this.avaliacaoService.incrementcommentStoreCount(res[0].PRIMARY_KEY).then(()=>{
            this.formularioComentario.reset()
            this.router_navigator.navigate(['/product'])
          })
        }
      })
    })
  }

  public cliente(FOREIGN_KEY){
    this.avaliacaoService.cliente(FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.formularioComentario.patchValue({
        FOREIGN_KEY_CLIENT : res[0].PRIMARY_KEY,
        FOREIGN_KEY_STORE : this.route.snapshot.params['id'],
        commentDate : `${new Date()}`,
        indexDay: new Date(),
        commentImageUrl : res[0].clientImageUrl,
        commentName : res[0].clientName+""+res[0].clientLastName,
      });
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

