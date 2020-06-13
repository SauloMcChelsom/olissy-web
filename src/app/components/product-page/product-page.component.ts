import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl  }  from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../app.service'
import { AuthService } from '../../AuthService'
import { ProductPageService } from './product-page.service'
import { store, client } from './../../interfaces';
declare var $ :any;
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public asyncCount:boolean = true

  public loading:boolean = true

  public LIMIT:number = 2

  public PRIMARY_KEY_PRODUCT_STORE:string = ""

  public LINK_RETURN:string = ""

  public LINK_STORE_ABOUT_USER:string = ""

  public UserIsLogged:boolean = false

  public modal_nao_logado:string = ""

  public comments = []

  public product:any = {FOREIGN_KEY:"", productPrice:0, productImageUrl:"" }

  public store:any

  public client:client

  public storeReact:any

  public love:number = 0

  public view:number = 0

  public sale:number = 0

  public follow:number = 0

  public PRIMARY_KEY_PRODUCT_STATUS:string = ""

  public love_status:boolean = false

  public view_status:boolean = false

  public sale_status:boolean = false

  public PRIMARY_KEY_STORE_STATUS:string = ""

  public follow_status:boolean = false

  public displayStoreInfo:any

  public displayLoadingProduct:boolean = false

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

  constructor(private metaTagService: Meta, 
              private titleService: Title,
              private appService:AppService,
              private produtoService:ProductPageService,
              private route:ActivatedRoute,
              private authService:AuthService
              ) { }

  ngOnInit() {
    this.PRIMARY_KEY_PRODUCT_STORE = this.route.snapshot.params['id']
    this.produtos()
    this.scrollToTop()
  }

  public searchEngineOptimization(keywords1, keywords2, title, description){
    this.metaTagService.addTags([
      { name: 'keywords', content: `olissy, olissy farmacia, olissy delivery, ${keywords1}, ${keywords2}` },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle(`${title}`);
    this.metaTagService.updateTag(
      { name: 'description', content: `${description}` }
    );
  }

  public scrollToTop(){
    $('html, body').animate({scrollTop:0}, 'slow');
  }

  public comentario(FOREIGN_KEY){
    this.produtoService.comentarios(FOREIGN_KEY, this.LIMIT).pipe(takeUntil(this.unsubscribe$)).subscribe((comment)=>{
      this.comments = comment
    })
  }

  public loadingPlusProduct(){
    this.loading = false
    this.produtoService.comentarios(this.PRIMARY_KEY_PRODUCT_STORE, (this.LIMIT++)*2).pipe(takeUntil(this.unsubscribe$)).subscribe((comment)=>{
      setTimeout(() => {
        this.comments = comment
        this.loading = true
      }, 1000);
    })
  }

  public  produtos(){//mostrar o produto na tela
    this.produtoService.produto('product', this.PRIMARY_KEY_PRODUCT_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((product: any)=>{

       this.comentario(product[0].PRIMARY_KEY)

       this.produtoService.produto('productDataBase', product[0].PRIMARY_KEY_PRODUCT_DB).pipe(takeUntil(this.unsubscribe$)).subscribe((productDatabse: any)=>{
        
        this.produtoService.store(product[0].FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((store: any)=>{

          if(Object.keys(store).length != 0){
            this.displayLoadingProduct = true
          }

          this.LINK_RETURN = `/store-page/${store[0].FOREIGN_KEY}/store-product`

          this.store =  store[0]
          this.follow = store[0].follow

          this.product = product[0]
          this.product.productImageUrl = productDatabse[0].productImageUrl
          this.product.productDescription = productDatabse[0].productDescription
          this.product.provider = productDatabse[0].provider
          this.product.andGeneric = productDatabse[0].andGeneric
          this.product.productSession = productDatabse[0].productSession
          this.product.productType = productDatabse[0].productType
          this.product.productName = productDatabse[0].productName
          this.product.productCategory = productDatabse[0].productCategory

          this.searchEngineOptimization(productDatabse[0].productCategory, productDatabse[0].productType, productDatabse[0].productName, productDatabse[0].productDescription)
      

          this.love = product[0].love
          this.view = product[0].view
          this.sale = product[0].sale

          this.searchEngineOptimization(productDatabse[0].productCategory, productDatabse[0].productType, productDatabse[0].productName, productDatabse[0].productDescription)

        
          this.adicionarProdutoNoCarrinho(product[0])

           this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
            if(isLogged === null){
              this.UserIsLogged = false
            }else{
              this.UserIsLogged = true
              this.cliente(isLogged.uid)
              this.getStoreReact(this.store.FOREIGN_KEY, isLogged.uid)
              this.getProductStatusReact(isLogged.uid)
              this.getStoreStatusReact(isLogged.uid)
            }
          })
        })
      })
    })
  }

  public isLogged() {
    return  this.authService.isLogged()
  }

  public cliente(FOREIGN_KEY){
    this.produtoService.cliente(FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.client = res[0]
    })
  }

  public getStoreReact(FOREIGN_KEY_STORE, FOREIGN_KEY_CLIENT){
    this.produtoService.getStoreReact(FOREIGN_KEY_CLIENT, FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any)=>{
      this.storeReact = res
    })
  }

  public getProductStatusReact(FOREIGN_KEY_CLIENT){
    var reacao = {
      FOREIGN_KEY_CLIENT: FOREIGN_KEY_CLIENT,
      FOREIGN_KEY_PRODUCT: this.PRIMARY_KEY_PRODUCT_STORE,
      PRIMARY_KEY:"",
      clientReactionsLove:false,
      clientReactionsSale:false,
      clientReactionsView:true
    }
    this.produtoService.reacoes('reactionsProduct', this.product.PRIMARY_KEY, FOREIGN_KEY_CLIENT).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
       if(Object.keys(res).length == 0){
        this.produtoService.criar_reacao(reacao, 'reactionsProduct')
        this.produtoService.visualizar_1(this.product.PRIMARY_KEY)
       }else{
        this.love_status = res[0].clientReactionsLove
        this.PRIMARY_KEY_PRODUCT_STATUS = res[0].PRIMARY_KEY
        this.sale_status = res[0].clientReactionsSale
        this.view_status = res[0].clientReactionsView
       }
    })
  }

  public getStoreStatusReact(FOREIGN_KEY_CLIENT){
    var reacao = {
      FOREIGN_KEY_CLIENT: FOREIGN_KEY_CLIENT,
      FOREIGN_KEY_STORE: this.store.FOREIGN_KEY,
      PRIMARY_KEY:"",
      clientReactionsFollow:false,
    }
    this.produtoService.existe_reactions_store(reacao.FOREIGN_KEY_CLIENT, reacao.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      if(Object.keys(res).length == 0){
        this.produtoService.criar_reacao_loja(reacao, 'reactionsStore')
      }else{
        this.follow_status = res[0].clientReactionsFollow
        this.PRIMARY_KEY_STORE_STATUS = res[0].PRIMARY_KEY
      }
    })
  }

  public seguir(){
    if(this.UserIsLogged == false){
      this.modal_nao_logado = "seguiram"
      return true
    }
    if(!this.follow_status && this.UserIsLogged == true){
      this.produtoService.seguir_1(this.store.PRIMARY_KEY)
      this.produtoService.reacoes_seguir(true, this.PRIMARY_KEY_STORE_STATUS)
      return true
    }
    if(this.follow_status && this.UserIsLogged == true){
      this.produtoService.seguir_0(this.store.PRIMARY_KEY)
      this.produtoService.reacoes_seguir(false, this.PRIMARY_KEY_STORE_STATUS)
      return true
    }
  }

  public amar(){
    if(this.UserIsLogged == false){
      this.modal_nao_logado = "amaram"
      return true
    }
    if(!this.love_status && this.UserIsLogged == true){
      this.produtoService.amar_1(this.product.PRIMARY_KEY)
      this.produtoService.reacoes_amar(true, this.PRIMARY_KEY_PRODUCT_STATUS)
      return true
    }
    if(this.love_status && this.UserIsLogged == true){
      this.produtoService.amar_0(this.product.PRIMARY_KEY)
      this.produtoService.reacoes_amar(false, this.PRIMARY_KEY_PRODUCT_STATUS)
      return true
    }
  }

  public publicarComentarioClick(){
    if(this.UserIsLogged == false){
      this.modal_nao_logado = "comentar"
      return true
    }
    this.formularioComentario.patchValue({
      FOREIGN_KEY_CLIENT : this.client.FOREIGN_KEY,
      PRIMARY_KEY_PRODUCT : this.product.PRIMARY_KEY,
      commentDate : `${new Date()}` ,
      indexDay: new Date(),
      commentImageUrl : this.client.clientImageUrl,
      commentName :this.client.clientName +' '+ this.client.clientLastName,
    });
    this.produtoService.comentar(this.formularioComentario.value).then(a=>{
      this.produtoService.getCommentProductCount(this.product.PRIMARY_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
        console.log(res)
        if(Object.keys(res).length == 0 && this.asyncCount == true){
          this.asyncCount = false
          let commentProductCount = {
            PRIMARY_KEY_PRODUCT : this.product.PRIMARY_KEY,
            PRIMARY_KEY : "",
            count : 1
          }
          this.produtoService.createCommentProductCount(commentProductCount).then(()=>{
            this.formularioComentario.reset()
          })
        }
        if(Object.keys(res).length != 0 && this.asyncCount == true){
          this.asyncCount = false
          this.produtoService.incrementcommentStoreCount(res[0].PRIMARY_KEY).then(()=>{
            this.formularioComentario.reset()
          })
        }
      })
    })
  }

  public publicarComentarioEnter(){
    this.asyncCount = true
    if(this.UserIsLogged == false){
      this.modal_nao_logado = "comentar"
      $('#modalNaoLogado').modal('show');
      return true
    }
    this.formularioComentario.patchValue({
      FOREIGN_KEY_CLIENT : this.client.FOREIGN_KEY,
      PRIMARY_KEY_PRODUCT : this.product.PRIMARY_KEY,
      commentDate : `${new Date()}` ,
      indexDay: new Date(),
      commentImageUrl : this.client.clientImageUrl,
      commentName :this.client.clientName +' '+ this.client.clientLastName,
    });
    this.produtoService.comentar(this.formularioComentario.value).then(a=>{
      this.produtoService.getCommentProductCount(this.product.PRIMARY_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
        console.log(res, this.product.PRIMARY_KEY)
        if(Object.keys(res).length == 0 && this.asyncCount == true){
          this.asyncCount = false
          let commentProductCount = {
            PRIMARY_KEY_PRODUCT : this.product.PRIMARY_KEY,
            PRIMARY_KEY : "",
            count : 1
          }
          this.produtoService.createCommentProductCount(commentProductCount).then(()=>{
            this.formularioComentario.reset()
          })
        }
        if(Object.keys(res).length != 0 && this.asyncCount == true){
          this.asyncCount = false
          this.produtoService.incrementcommentStoreCount(res[0].PRIMARY_KEY).then(()=>{
            this.formularioComentario.reset()
          })
        }
      })
    })
  }

  public adicionarProdutoNoCarrinho(item){
    this.appService.produtos = []
    item.quantities = 1
    item.productPriceOrigin = item.productPrice
    console.log(item)
    this.appService.produtos.push(item)
  }

  public historyNavigateBack(){
    window.history.back();
  }

  public formatarDataTime(d){
    let data = new Date(d)
    let my = data.toLocaleString([], { hour12: true})
    return my
  }

  public formatHours(d){
    let data = new Date(d);
    let my = data.toLocaleString([], { hour12: true})
    return my
  }

  public selectDisplayStoreInfo(store){
    console.log(store)
    this.displayStoreInfo = store
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
