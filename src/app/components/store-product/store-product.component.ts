import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl  }  from '@angular/forms';
import { AppService } from '../../app.service';
import { StoreProductService } from './store-product.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { AuthService  } from '../../AuthService';


@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit, OnDestroy {



  private unsubscribe$ = new Subject();

  public loading:boolean = true

  public commentPlus:boolean = true

  public displayStoreInfo:any

  public FOREIGN_KEY_STORE_ORDER_CART

  public LOGIN:boolean = false

  public comments = { status:false, limit:2, post:[] }

  public FOREIGN_KEY

  public user:any = { clientImageUrl:null, clientName:null, clientLastName:null}

  public TaxaDelivery = [{ description:'', rule:false },{ description:'', rule:false },{ description:'', rule:false },{ description:'', rule:false }];

  public url:boolean = true

  public reactLoading:boolean = true 

  public result = { store : [], product : null, productDataBase : [], react:null, limit : 10, offset : 0, size : 0  }

  public formularioComentario: FormGroup = new FormGroup({
    PRIMARY_KEY_PRODUCT : new FormControl(null),
    FOREIGN_KEY_CLIENT : new FormControl(null),
    commentText: new FormControl(null),
    commentDate : new FormControl(null),
    indexDay : new FormControl(null),
    commentImageUrl : new FormControl(null),
    commentName : new FormControl(null),
    commentView : new FormControl(false),
  })

  constructor(private appService: AppService,
              private authService: AuthService,
              private storeProductService: StoreProductService,
              private route: ActivatedRoute) {}

  public ngOnInit() {
    this.product()
  }

  public setDescription(value, index){
    this.result.product[index].description = value
  }

  public async getReact(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      if(res != null){
        this.FOREIGN_KEY = res.uid
        this.LOGIN = true
        this.getUser(this.FOREIGN_KEY)
        this.storeProductService.getReact(res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((react)=>{
          if(Object.keys(react).length != 0){
            this.result.react = react[0]
            this.reactFilter()
          }
        })
      }
    })
  }

  public getUser(FOREIGN_KEY){
    this.storeProductService.getUser(FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((user)=>{
      this.user = user[0]
    })
  }

  public setLove(product){
    this.reactLoading = false
    let PRIMARY_KEY = this.result.react.PRIMARY_KEY

    //se nao existir react, adcionar
    if( Object.keys(this.result.react.product).length == 0 ){
      this.storeProductService.setReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:true }).then(()=>{
        this.storeProductService.incrementProductQuantities(product.PRIMARY_KEY).then(()=>{
          this.reactLoading = true
        })
      })
    }else{
      if(product.react){
        this.storeProductService.delReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:true }).then(()=>{
          this.storeProductService.setReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:false }).then(()=>{
            this.storeProductService.decrementProductQuantities(product.PRIMARY_KEY).then(()=>{
              this.reactLoading = true
            })
          })
        })
      }else{
        this.storeProductService.delReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:false }).then(()=>{
          this.storeProductService.setReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:true }).then(()=>{
            this.storeProductService.incrementProductQuantities(product.PRIMARY_KEY).then(()=>{
              this.reactLoading = true
            })
          })
        })
      }
    }
  }

  public reactFilter(){
    for(let product in this.result.product){
      this.result.product[product].react = false
      for(let react in this.result.react.product){      
        if(this.result.react.product[react].FOREIGN_KEY == this.result.product[product].PRIMARY_KEY && this.result.react.product[react].react == true){ 
          this.result.product[product].react = true
        } 
      }
    }
  }

  public setComment(PRIMARY_KEY){
    this.comments.status = true
    this.comments.limit = 2
    this.formularioComentario.patchValue({
      PRIMARY_KEY_PRODUCT : PRIMARY_KEY,
      commentText:""
    });
    this.storeProductService.getComments(PRIMARY_KEY, this.comments.limit).pipe(takeUntil(this.unsubscribe$)).subscribe((comments)=>{
      this.comments.status = false
      this.comments.post = comments
    })
  }
 
  public publicarComentario(){
    this.formularioComentario.patchValue({
      FOREIGN_KEY_CLIENT : this.FOREIGN_KEY,
      commentDate : `${new Date()}` ,
      indexDay: new Date(),
      commentImageUrl : this.user.clientImageUrl,
      commentName :this.user.clientName +' '+ this.user.clientLastName,
    });
    if(this.formularioComentario.get('commentText').value.length > 2){
      this.storeProductService.setCommet(this.formularioComentario.value).then((res)=>{
        this.storeProductService.incrementCommet(this.formularioComentario.get('PRIMARY_KEY_PRODUCT').value).then(()=>{
          this.formularioComentario.reset()
        })
      })
    }
  }

  public setCommentPlus(){
    this.commentPlus = false
    this.storeProductService.getComments(this.formularioComentario.get('PRIMARY_KEY_PRODUCT').value, (this.comments.limit++)*2).pipe(takeUntil(this.unsubscribe$)).subscribe((comments)=>{
      setTimeout(() => {
        this.comments.status = false
        this.comments.post = comments
        this.commentPlus = true
      }, 1000);
    })
  }



















  
  public product() {
    this.loading = false
    this.storeProductService.store(this.route.parent.snapshot.params.id).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
      if(Object.keys(store).length != 0){
        this.storeProductService.product(this.route.parent.snapshot.params.id, this.result.limit).pipe(takeUntil(this.unsubscribe$)).subscribe((product:any)=>{
          this.loading = true
          this.result.product = product
          this.result.size = product.length
          this.productDataBase()
          this.getReact()
        })
      }
    })
  }

  public productDataBase(){
    for(let index in this.result.product){
      this.result.product[index].description = true
      this.result.product[index].index = parseInt(index)
      this.storeProductService.productDataBase(this.result.product[index].PRIMARY_KEY_PRODUCT_DB).pipe(takeUntil(this.unsubscribe$)).subscribe((productDataBase:any)=>{
        let storeNotDuplicate = this.filterRemoveDuplicateProductDataBase(productDataBase[0].PRIMARY_KEY)
        if(storeNotDuplicate == false){
          this.result.productDataBase.push( productDataBase[0] )
        }  
      })
    }
  }
  
  public filterRemoveDuplicateProductDataBase(PRIMARY_KEY):boolean{
    for (const key in this.result.productDataBase) {
      if(this.result.productDataBase[key].PRIMARY_KEY == PRIMARY_KEY){
        return true
      }
    }
    return false
  }

  public  loadingPlusProduct(){
    this.loading = false
    setTimeout(() => {
      this.result.limit = this.result.limit * 10
      this.product()
    }, 1000);
  }

  public filterRemoveDuplicate(product):boolean{
    for (const key in this.result.product) {
      if(this.result.product[key].PRIMARY_KEY == product){
       return true
      }
    }
    return false
  }

  public ngAfterContentChecked() {
    if (Object.keys(this.appService.ListaProdutosPesquisado).length != 0) {
      this.result.product = this.appService.ListaProdutosPesquisado;
    }
  }

  public incrementarItemCarrinho(product, productDB) {
    let item = product
        item.productName = productDB.productName

    const foundItem: any = this.appService.produtos.find(items => items.PRIMARY_KEY === item.PRIMARY_KEY);

    
    if(foundItem){
      if( item.quantities < item.productQuantities ){
        foundItem.quantities++;
        foundItem.productPrice = foundItem.productPriceOrigin * foundItem.quantities;
      }
    }else{
      item.quantities = 1;

      //bang reativo, ele altera tando this.appService e this.result.product
      //para nao alterar preço, sertificar ele passar aqui por uma so vez
      if(item.productPriceOrigin == null){
        item.productPriceOrigin = new Number(item.productPrice).valueOf();
      }

      this.appService.produtos.push(item);
    }
  }

  public decrementarItemCarrinho(item){
    for (const key in this.result.product) {
      if(this.result.product[key].PRIMARY_KEY == item.PRIMARY_KEY){
      this.result.product[key].quantities--
      if(this.result.product[key].quantities > 0){
        this.result.product[key].productPrice = (this.result.product[key].productPrice - this.result.product[key].productPriceOrigin)
      }
      }
      this.removerItemCarrinho(this.result.product[key].PRIMARY_KEY, item.PRIMARY_KEY, this.result.product[key].quantities)
    }
  }

  public removerItemCarrinho(menu_PRIMARY_KEY, itemDecrement_PRIMARY_KEY, quantities ){
    if(menu_PRIMARY_KEY == itemDecrement_PRIMARY_KEY && quantities == 0){
      for (const index in this.appService.produtos) {
        if(this.appService.produtos[index].PRIMARY_KEY == itemDecrement_PRIMARY_KEY){
          this.appService.produtos.splice(Number(index), 1)
        }
      }
    }
  }

  public TotalValorDoPedido(){
    return this.appService.produtos.reduce( (sum, item:any)=>{
      return new Number(sum).valueOf() + new Number(item.productPrice).valueOf()
    },0)
  }

  public TotalProdutoCarrinho(){
    return this.appService.produtos.length
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
 