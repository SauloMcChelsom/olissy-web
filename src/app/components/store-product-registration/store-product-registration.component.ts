import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { StoreProductRegistrationService } from './store-product-registration.service';
import { AuthService  } from '../../AuthService';
import { DataService } from "../../data.service";
declare var $ :any;

@Component({
  selector: 'app-store-product-registration',
  templateUrl: './store-product-registration.component.html',
  styleUrls: ['./store-product-registration.component.css']
})

export class StoreProductRegistrationComponent implements OnInit, OnDestroy {

  public loading:boolean = true

  public LIMIT:number = 5

  private unsubscribe$ = new Subject();

  public token:any = ""

  public emVendas = ['sim','nao'];

  public productSession = []

  public productCategory = []

  public productType = []

  public providerListRegistered: Observable<any[]>

  public productDatabase = []

  public andGeneric = ['Sim','Não'];

  public produtoSelecionadoParaCadastar

  public currencyMask : any = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ' '
      }
    }
  };

  public formularioCadastro: FormGroup = new FormGroup({
    'PRIMARY_KEY_PRODUCT_DB':new FormControl(null),
    'PRIMARY_KEY_STORE':new FormControl(null),
    'FOREIGN_KEY':new FormControl(null, Validators.required),
    'PRIMARY_KEY':new FormControl(null),
    'productPrice':new FormControl(null, Validators.required),
    'productForSale':new FormControl(null, Validators.required),
    'productDateRegister':new FormControl(`${new Date()}`),
    'productQuantities':new FormControl(0),
    'love':new FormControl(0),
    'sale':new FormControl(0),
    'comment':new FormControl(0),
  })

  public result = { store : null, product : null, productDataBase : [], limit : 10, offset : 0, size : 0  }


  constructor(private comercioService:StoreProductRegistrationService,
              private storeProductRegistrationService:StoreProductRegistrationService,
              private data: DataService,
              private authService: AuthService) {}

  ngOnInit() {
    this.getToken()
    this.productDataBase()
    this.data.subject.pipe(takeUntil(this.unsubscribe$)).subscribe(productDB =>this.searchProductDB(productDB))
  }

  searchProductDB(ProductDB){
    if(ProductDB.search == "suggestion"){
      this.searchProductDBSuggested(ProductDB.product)
    }
    if(ProductDB.search == "typing"){
      this.searchProductDBTyping(ProductDB.product)
    }
  }

  searchProductDBSuggested(ProductDB){
    this.result.productDataBase = []
    this.result.product = []
    this.result.store = []


    ProductDB.registration = false
    this.result.productDataBase = [ProductDB]


    this.product()
  }

  searchProductDBTyping(ProductDB){
    this.result.productDataBase = []
    this.result.product = []
    this.result.store = []
   
 
    this.result.productDataBase = ProductDB 

    for(let index in ProductDB){
      this.result.productDataBase[index].registration = false
    }
    
    this.product()
  }

  public getToken(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.token = res
      this.getStore(this.token.uid)
    })
  }

  public productDataBase(){
    this.storeProductRegistrationService.productDataBase(this.result.limit).pipe(takeUntil(this.unsubscribe$)).subscribe((productDataBase:any)=>{
      this.result.productDataBase = []
      for(let index in productDataBase){
        productDataBase[index].registration = false
        this.result.productDataBase.push(productDataBase[index])
      }
      this.product()
      this.enableScroll()
    })
  }

  public product(){
    for(let index in this.result.productDataBase){
      this.storeProductRegistrationService.product(this.token.uid, this.result.productDataBase[index].PRIMARY_KEY).subscribe((product:any)=>{
        if(Object.keys(product).length == 0 ){
          this.result.productDataBase[index].registration = true
        }
      })
    }
  }

  public getStore(FOREIGN_KEY){
    this.comercioService.getStoreByFOREIGN_KEY(FOREIGN_KEY).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
      this.formularioCadastro.patchValue({
        PRIMARY_KEY_STORE:store[0].PRIMARY_KEY
      })
    })
  }

  public loadingPlusProduct(){
    this.loading = false
    this.disableScroll()
    setTimeout(() => {
      this.result.limit = this.result.limit + 10
      this.productDataBase()
      this.loading = true
    }, 1000);
  }

  public selecionadoProdutoCadastrar(PRODUCT){
    this.produtoSelecionadoParaCadastar = PRODUCT
    this.formularioCadastro.patchValue({
      PRIMARY_KEY_PRODUCT_DB:PRODUCT.PRIMARY_KEY,
      FOREIGN_KEY: this.token.uid,
      productPrice:PRODUCT.productPrice,
      love: 0,
      sale: 0,
      comment: 0,
      productDateRegister: `${new Date()}`,
    })
  }

  public cadastraProduto(){
    this.formularioCadastro.get('productPrice').markAsTouched()
    this.formularioCadastro.get('productForSale').markAsTouched()
    this.formularioCadastro.get('productQuantities').markAsTouched()
    if(this.formularioCadastro.status === "VALID"){
      this.comercioService.createProduct(this.formularioCadastro.value)
      this.formularioCadastro.reset()
      this.productDataBase()
      $('#selecionadoProdutoCadastrar').modal('hide')
    } 
  }

  public cancelarCadastraProduto(){
    this.formularioCadastro.reset()
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
    }, 1000);
  }

  public cancelarCadastroProduto(){
    this.formularioCadastro.reset()
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.data.setProductDB(false)
  }

}