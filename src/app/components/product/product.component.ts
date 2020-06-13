import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl  }  from '@angular/forms';
import { AuthService  } from '../../AuthService';
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { AppService } from '../../app.service'
import { ProductService } from './product.service'
import { DataService } from "../../data.service";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public loading:boolean = true

  public commentPlus:boolean = true

  public displayStoreInfo:any

  public FOREIGN_KEY_STORE_ORDER_CART

  public LOGIN:boolean = false

  public comments = { status:false, limit:2, post:[] }

  public FOREIGN_KEY

  public createReactUser:boolean = false

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

  constructor(private productService:ProductService, 
              private authService: AuthService,
              private appService:AppService,
              private router_navigator: Router,
              private data: DataService,
              private metaTagService: Meta,
              private titleService: Title
              ) { }

  ngOnInit(){ 
    this.searchEngineOptimization()
    this.data.subject.pipe(takeUntil(this.unsubscribe$)).subscribe(productDB =>{

      if(Object.keys(productDB).length == 0){
        this.product()
      }else{
        this.searchProductDB(productDB)  
      }
    }) 
    let router = window.location.href.split('/' ) 
    if(router[3]  == 'product'){
      this.url = false
    }
  }

  public setDescription(value, index){
    this.result.product[index].description = value
  }

  public purchase(productDatabse, product){
    product.productImageUrl = productDatabse.productImageUrl
    product.productDescription = productDatabse.productDescription
    product.provider = productDatabse.provider
    product.andGeneric = productDatabse.andGeneric
    product.productSession = productDatabse.productSession
    product.productType = productDatabse.productType
    product.productName = productDatabse.productName
    product.productCategory = productDatabse.productCategory
  
    this.appService.produtos = []
    product.quantities = 1
    product.productPriceOrigin = product.productPrice
    this.appService.produtos.push(product)
    this.router_navigator.navigate(['/complete-orders' , product.FOREIGN_KEY])
  }
 
  public async getReact(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      if(res != null){
        this.FOREIGN_KEY = res.uid
        this.LOGIN = true
        this.getUser(this.FOREIGN_KEY)
        this.productService.getReact(res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((react)=>{
          if(Object.keys(react).length != 0){
            this.result.react = react[0]
            this.reactFilter()
          }
          this.createReact(react, res.uid)
        })
      }
    })
  }
  
  public createReact(react, id){
    if(Object.keys(react).length == 0 && this.createReactUser == false){
      this.productService.react(id)
      this.createReactUser = true
    }
  }

  public getUser(FOREIGN_KEY){
    this.productService.getUser(FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((user)=>{
      this.user = user[0]
    })
  }

  public setLove(product){

    this.reactLoading = false
    let PRIMARY_KEY = this.result.react.PRIMARY_KEY

    //se nao existir react, adcionar
    if( Object.keys(this.result.react.product).length == 0 ){
      this.productService.setReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:true }).then(()=>{
        this.productService.incrementProductQuantities(product.PRIMARY_KEY).then(()=>{
          this.reactLoading = true
        })
      })
    }else{
      if(product.react){
        this.productService.delReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:true }).then(()=>{
          this.productService.setReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:false }).then(()=>{
            this.productService.decrementProductQuantities(product.PRIMARY_KEY).then(()=>{
              this.reactLoading = true
            })
          })
        })
      }else{
        this.productService.delReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:false }).then(()=>{
          this.productService.setReact(PRIMARY_KEY, { FOREIGN_KEY:product.PRIMARY_KEY, react:true }).then(()=>{
            this.productService.incrementProductQuantities(product.PRIMARY_KEY).then(()=>{
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
    this.productService.getComments(PRIMARY_KEY, this.comments.limit).pipe(takeUntil(this.unsubscribe$)).subscribe((comments)=>{
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
      this.productService.setCommet(this.formularioComentario.value).then((res)=>{
        this.productService.incrementCommet(this.formularioComentario.get('PRIMARY_KEY_PRODUCT').value).then(()=>{
          this.formularioComentario.reset()
        })
      })
    }
  }

  public setCommentPlus(){
    this.commentPlus = false
    this.productService.getComments(this.formularioComentario.get('PRIMARY_KEY_PRODUCT').value, (this.comments.limit++)*2).pipe(takeUntil(this.unsubscribe$)).subscribe((comments)=>{
      setTimeout(() => {
        this.comments.status = false
        this.comments.post = comments
        this.commentPlus = true
      }, 1000);
    })
  }







  public searchEngineOptimization(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'olissy, olissy farmacia, delivery de farmacia em guarapari, farmacia em guarapari, farmacia guarapari' },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle('olissy');
    this.metaTagService.updateTag(
      { name: 'description', content: ' Olissy trata-se de uma Marketplace, local de compras e vendas de produtos, no ambiente online, isso se traduz em um espaço virtual, aonde a olissy permite que farmácias e drogarias anunciem seus produtos e serviços através da plataforma da olissy. Assim, a olissy, é como se fosse um shopping center virtual, onde vários lojistas vendem seus produtos e serviços diretamente aos consumidores.' }
    );
  }

  public searchProductDB(ProductDB){
    if(ProductDB.search == "suggestion"){
      this.searchProductDBSuggested(ProductDB.product)
    }
    if(ProductDB.search == "typing"){
      this.searchProductDBTyping(ProductDB.product)
    }
  }

  public searchProductDBSuggested(ProductDB){
    this.result.productDataBase = []
    this.result.product = []
    this.result.store = []
    this.productService.productSuggested(ProductDB.PRIMARY_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((product:any)=>{
      this.result.productDataBase[0] =  ProductDB 
      this.result.product = product
      this.result.product[0].description = true
      this.result.product[0].index = 0
      this.store()
      this.getReact()
    })
  }

  public searchProductDBTyping(ProductDB){
    this.result.productDataBase = []
    this.result.product = []
    this.result.store = []

    for (const index in ProductDB){
      this.productService.productSuggested(ProductDB[index].PRIMARY_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((product:any)=>{
        this.result.productDataBase[index] =  ProductDB[index]
        this.result.product[index] = product[0]
        this.result.product[index].description = true
        this.result.product[index].index = index
        this.store()
        if( (parseInt(index) + 1)  == ProductDB.length){
          this.getReact()
        }
      })
    }
  }



  public product(){
    this.loading = false
    this.productService.product(this.result.limit).pipe(takeUntil(this.unsubscribe$)).subscribe((product:any)=>{
      this.loading = true
      this.result.product = product
      this.result.size = product.length
      this.store()
      this.productDataBase()
      this.enableScroll()
      this.getReact()
    })
  } 

  public store(){
    for(let index in this.result.product){
      this.productService.store(this.result.product[index].FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        let storeNotDuplicate 
        if(Object.keys(store).length != 0){
          storeNotDuplicate = this.filterRemoveDuplicateStore(store[0].PRIMARY_KEY)
        }
        if(storeNotDuplicate == false){
          this.result.store.push( store[0] )
        }
      })
    }
  }

  public productDataBase(){
    for(let index in this.result.product){
      this.result.product[index].description = true
      this.result.product[index].index = index
      this.productService.productDataBase(this.result.product[index].PRIMARY_KEY_PRODUCT_DB).pipe(takeUntil(this.unsubscribe$)).subscribe((productDataBase:any)=>{
            
        let storeNotDuplicate = this.filterRemoveDuplicateProductDataBase(productDataBase[0].PRIMARY_KEY)
        
        if(storeNotDuplicate == false){
          this.result.productDataBase.push( productDataBase[0] )
        }

      })
    }
  }

  public filterRemoveDuplicateStore(PRIMARY_KEY):boolean{
    for (const key in this.result.store) {
      if(this.result.store[key].PRIMARY_KEY == PRIMARY_KEY){
       return true
      }
    }
    return false
  }

  public filterRemoveDuplicateProductDataBase(PRIMARY_KEY):boolean{
    for (const key in this.result.productDataBase) {
      if(this.result.productDataBase[key].PRIMARY_KEY == PRIMARY_KEY){
      return true
      }
    }
    return false
  }

  public selectDisplayStoreInfo(store){
    if(store.negotiateRateLivery.status){
      this.TaxaDelivery[0] = { description:'Negociar taxa de entrega por Telefone', rule:true }
    }

    if(store.onlyInNeighborhood.status){
      this.TaxaDelivery[1] = { description: `Entrega GRÁTIS no bairro ${store.storeNeighborhood}`,  rule:true }
    }

    if(store.deliveryFreeAbove.status){
      this.TaxaDelivery[2] = { description:`Entrega grátis acima de R$${store.deliveryFreeAbove.taxa} por ${store.deliveryFreeAbove.km}/km`, rule:true }
    }

    if(store.deliveryBy.status){
      this.TaxaDelivery[3] = { description: `Entrega por R$${store.deliveryBy.taxa}/KM`, rule:true }
    }

    this.displayStoreInfo = store
  }

  public  loadingPlusProduct(){
    this.loading = false
    this.disableScroll()
    setTimeout(() => {
      this.result.limit = this.result.limit * 10
      this.product()
    }, 1000);
  }

  public disableScroll(){ 
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
    window.onscroll = function() { 
      window.scrollTo(scrollLeft, scrollTop); 
    }; 
  }

  public enableScroll(){ 
    setTimeout(() => {
      window.onscroll = function() {}; 
    }, 3000);
  }
 
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if(this.url){
      console.log("destruir")
      this.data.setProductDB(false)
    }
  }

}
