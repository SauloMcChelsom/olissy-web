import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StoreProductRecordService } from './store-product-record.service';
import { AuthService  } from '../../AuthService';
import { DataService } from "../../data.service";
declare var $ :any;

@Component({
  selector: 'app-store-product-record',
  templateUrl: './store-product-record.component.html',
  styleUrls: ['./store-product-record.component.css']
})

export class StoreProductRecordComponent implements OnInit, OnDestroy {

  public loading:boolean = true

  public carregarMais = false

  public LIMIT:number = 1

  private unsubscribe$ = new Subject();

  public token:any = ""

  public emVendas = ['sim','nao'];


  public currencyMask : any = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ' '
      }
    }
  };

  public formularioAtualizar: FormGroup = new FormGroup({
    'FOREIGN_KEY':new FormControl(null, Validators.required),
    'PRIMARY_KEY':new FormControl(null, Validators.required),
    'productPrice':new FormControl(null, Validators.required),
    'productForSale':new FormControl(null, Validators.required),
    'productQuantities':new FormControl(0, Validators.required),
    'productImageUrl' : new FormControl(0, Validators.required),
    'productName' : new FormControl(0, Validators.required),
    'productSession' : new FormControl(0, Validators.required),
    'productCategory' : new FormControl(0, Validators.required),
    'productType' : new FormControl(0, Validators.required),
    'andGeneric' : new FormControl(0, Validators.required),
    'provider' : new FormControl(0, Validators.required),
    'productDescription' : new FormControl(0, Validators.required),
  })

  public formularioDeletar: FormGroup = new FormGroup({
    'FOREIGN_KEY':new FormControl(null, Validators.required),
    'PRIMARY_KEY':new FormControl(null, Validators.required),
    'PRIMARY_KEY_STORE':new FormControl(null, Validators.required),
    'productPrice':new FormControl(null, Validators.required),
    'productForSale':new FormControl(null, Validators.required),
    'productQuantities':new FormControl(0, Validators.required),
    'productImageUrl' : new FormControl(0, Validators.required),
    'productName' : new FormControl(0, Validators.required),
    'productSession' : new FormControl(0, Validators.required),
    'productCategory' : new FormControl(0, Validators.required),
    'productType' : new FormControl(0, Validators.required),
    'andGeneric' : new FormControl(0, Validators.required),
    'provider' : new FormControl(0, Validators.required),
    'productDescription' : new FormControl(0, Validators.required),
  })

  public result = { store : null, product : null, productDataBase : [], limit : 10, offset : 0, size : 0  }

  constructor(private comercioService:StoreProductRecordService,
              private storeProductRecordService:StoreProductRecordService,
              private data: DataService,
              private authService: AuthService) {}

  public ngOnInit() {
    this.toke()
    this.data.subject.pipe(takeUntil(this.unsubscribe$)).subscribe(productDB =>this.searchProductDB(productDB)) 
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

    this.result.productDataBase = [ProductDB]

    this.productForProductDB()
  }

  public searchProductDBTyping(ProductDB){
    this.result.productDataBase = []
    this.result.product = []
    this.result.store = []
   
    this.result.productDataBase = ProductDB 
    
    this.productForProductDB()
  }

  public productForProductDB(){
    for(let index in this.result.productDataBase){
      this.storeProductRecordService.productForProductDB(this.token.uid, this.result.productDataBase[index].PRIMARY_KEY).subscribe((product:any)=>{
        if(Object.keys(product).length != 0 ){
          this.result.product.push(product[0])
        }
      })
    }
    this.loading = true
  }

  public toke(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe(async (res:any)=>{
      this.token = await res
      this.product(this.token.uid)
    })
  }

  public product(FOREIGN_KEY) {
    this.loading = false
    this.storeProductRecordService.product(FOREIGN_KEY, this.result.limit).pipe(takeUntil(this.unsubscribe$)).subscribe((product:any)=>{
      this.loading = true
      this.result.product = product
      this.result.size = product.length
      this.productDataBase()
      this.enableScroll()
    })
  }

  public productDataBase(){
    for(let index in this.result.product){
      this.storeProductRecordService.productDataBase(this.result.product[index].PRIMARY_KEY_PRODUCT_DB).pipe(takeUntil(this.unsubscribe$)).subscribe((productDataBase:any)=>{
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

  public atualizarItem(){
    this.atualizarItemText()
    $('#atualizar').modal('hide')
    this.formularioAtualizar.reset()
  }

  public atualizarItemText(){
    if(this.formularioAtualizar.status === "VALID"){
      Object.keys(this.formularioAtualizar.controls).forEach(key => {//obter todas keys e valores dinamicos do formulario
        if( this.formularioAtualizar.get(key).dirty ){//verificar se valor foi alterado
            //console.log({ [key]: this.formularioAtualizar.get(key).value })

            //se foi alterado, entao atualiza esta key
            this.comercioService.update("product",
                                        this.formularioAtualizar.get('PRIMARY_KEY').value,
                                        { [key]: this.formularioAtualizar.get(key).value } )
        }
      });
    }
  }

  public DeletarItem(){
    this.comercioService.deleterCollectionStorage("product", this.formularioDeletar.get('PRIMARY_KEY').value, this.formularioDeletar.get('PRIMARY_KEY_STORE').value  )
    this.formularioDeletar.reset()
    $('#excluir').modal('hide')
  }

  public SelecionarProdutoAtualizar(product, productDB){
    this.formularioAtualizar.patchValue({
      productPrice:product.productPrice,
      productForSale:product.productForSale,
      FOREIGN_KEY: product.FOREIGN_KEY,
      PRIMARY_KEY: product.PRIMARY_KEY,
      productQuantities: product.productQuantities,
      productImageUrl : productDB.productImageUrl,
      productName : productDB.productName,
      productSession : productDB.productSession,
      productType : productDB.productType,
      productCategory : productDB.productCategory,
      andGeneric : productDB.andGeneric,
      provider : productDB.provider,
      productDescription : productDB.productDescription
    });
  }

  public selecionarProdutoDeletar(product, productDB){
    this.formularioDeletar.patchValue({
      FOREIGN_KEY: product.FOREIGN_KEY,
      PRIMARY_KEY:product.PRIMARY_KEY,
      PRIMARY_KEY_STORE:product.PRIMARY_KEY_STORE,
      productQuantities: product.productQuantities,
      productPrice:product.productPrice,
      productForSale:product.productForSale,
      productImageUrl : productDB.productImageUrl,
      productName : productDB.productName,
      productSession : productDB.productSession,
      productType : productDB.productType,
      productCategory : productDB.productCategory,
      andGeneric : productDB.andGeneric,
      provider : productDB.provider,
      productDescription : productDB.productDescription
    });
  }

  public  loadingPlusProduct(){
    this.loading = false
    this.disableScroll()
    setTimeout(() => {
      this.result.limit = this.result.limit * 10
      this.product(this.token.uid)
    }, 1000);
  }

  public cancelarDeleteProduto(){
    this.formularioDeletar.reset()
  }

  public cancelarAtualizaProduto(){
    this.formularioAtualizar.reset()
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

  public ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.data.setProductDB(false)
  }

}



