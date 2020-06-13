import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { ProductCrudDatabaseService } from './product-crud-database.service';
import { Observable } from 'rxjs';
import productDataBase from './productDataBase'
declare var $ :any;


@Component({
  selector: 'app-product-crud-database',
  templateUrl: './product-crud-database.component.html',
  styleUrls: ['./product-crud-database.component.css']
})
export class ProductCrudDatabaseComponent implements OnInit {

  
/**
  {
    "categoryType": "medicamentos",
    "categoryCatalog": "Fitoterápico",
    "categoryName": "Colesterol"
  }
 */
public ImagePadra:string = "/assets/plataform/product.png"

  public categories = [];

  public provider = ['']

  public andGeneric = ['Sim','Não'];

  public productSession = []

  public productCategory = []

  public productType = []

  public descricaoProdutoHTML;

  public providerListRegistered: Observable<any[]>

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
    'PRIMARY_KEY':new FormControl(null),
    'productImageUrl':new FormControl(null),
    'productImagePath':new FormControl(null),
    'imageNew':new FormControl(null, Validators.required),
    'imageDisplay': new FormControl(this.ImagePadra,Validators.required),
    'productName':new FormControl(null, Validators.required),
    'productDescription':new FormControl(null, Validators.required),
    'productPrice':new FormControl(null, Validators.required),

    'productSession':new FormControl(null),
    'productCategory':new FormControl(null),
    'productType':new FormControl(null),

    'productSessionQuery':new FormControl(null),
    'productCategoryQuery':new FormControl(null),
    'productTypeQuery':new FormControl(null),

    'productNameQuery':new FormControl(null),
    'productDescriptionQuery':new FormControl(null),


    'productDateRegister':new FormControl(null),
    'andGeneric':new FormControl(null, Validators.required),
    'provider':new FormControl(null, Validators.required),
  })

  constructor(private productCrudDatabaseService:ProductCrudDatabaseService ) { }

  ngOnInit() {
    this.getProductSession()
    this.getAllProvider()
    this.editor()
  }

  editor(){
    $(function () {
      $('.textarea').wysihtml5()
    })
  }

  editarDescricaoProduto(DescricaoProduto){
    this.descricaoProdutoHTML = DescricaoProduto
    this.formularioCadastro.patchValue({
      productDescription: DescricaoProduto,
    })
  }

  getProductSession(){
    for (const session in productDataBase.product){
      this.productSession.push({
        productSessionIndece:session,
        productSession:Object.keys(productDataBase.product[session])[0]
      })
    }
  }

  setProductSession(value){
    let productSession = value.substring(0,value.indexOf(","))
    let productSessionIndece = value.replace(`${productSession},`,"")
    this.getProductCategory(productSession, parseInt(productSessionIndece))
  }

  getProductCategory(productSession, productSessionIndece){
    this.productCategory = []
    for (const category in productDataBase.product[productSessionIndece][productSession]){
      this.productCategory.push({
        productCategoryIndece:category,
        productCategory:Object.keys(productDataBase.product[productSessionIndece][productSession][category])[0]
      })
    }
  }

  setProductCategory(value){
   let productCategory = value.substring(0,value.indexOf(","))
   let productCategoryIndece = value.replace(`${productCategory},`,"")

   let productSessionValue =  this.formularioCadastro.get('productSession').value
   let productSession = productSessionValue.substring(0,productSessionValue.indexOf(","))
   let productSessionIndece = productSessionValue.replace(`${productSession},`,"")

   this.getProductType(productSessionIndece, productSession, productCategoryIndece, productCategory)
  }

  getProductType(productSessionIndece:number, productSession:string, productCategoryIndece:number, productCategory:string){
    this.productType = []
    for (const type of productDataBase.product[productSessionIndece][productSession][productCategoryIndece][productCategory]){
      this.productType.push(type)
    }
  }

  cadastrarFornecedor(providerName){
    let providerNameQuery:string = providerName
    this.productCrudDatabaseService.getByNameProvider(this.removeAcento(providerNameQuery.trim())).subscribe((provider)=>{
      if(Object.keys(provider).length == 0 ){
        this.productCrudDatabaseService.createNewProvider({providerName:providerName, providerNameQuery:this.removeAcento(providerNameQuery.trim())})
      }
    })
  }

  getAllProvider(){
    this.providerListRegistered = this.productCrudDatabaseService.getAllProvider()
  }

  public cadastroNovoProduto(){
    let data = new Date()

    this.formularioCadastro.patchValue({
      productImagePath:`product/product-database/${data.getFullYear()}${data.getMonth()}${data.getDay()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}.jpg`,
      productDateRegister: `${new Date()}`,
      productSession:this.formularioCadastro.get('productSession').value.substring(0,this.formularioCadastro.get('productSession').value.indexOf(",")),
      productCategory:this.formularioCadastro.get('productCategory').value.substring(0,this.formularioCadastro.get('productCategory').value.indexOf(","))
    })

    this.formularioCadastro.patchValue({
      productNameQuery:this.removeAcento(this.formularioCadastro.get('productName').value),
      productDescriptionQuery:this.removeAcento(this.formularioCadastro.get('productDescription').value),
      productSessionQuery:this.removeAcento(this.formularioCadastro.get('productSession').value),
      productCategoryQuery:this.removeAcento(this.formularioCadastro.get('productCategory').value),
      productTypeQuery:this.removeAcento(this.formularioCadastro.get('productType').value),
    })

    this.formularioCadastro.get('imageNew').markAsTouched()
    this.formularioCadastro.get('productName').markAsTouched()
    this.formularioCadastro.get('productDescription').markAsTouched()
    this.formularioCadastro.get('productPrice').markAsTouched()

    console.log(this.formularioCadastro.value)

    this.productCrudDatabaseService.sendImagemStorage(this.formularioCadastro.get('productImagePath').value, this.formularioCadastro.get('imageNew').value).then(async (url:any)=>{
      let storeImageUrl = await url

      this.formularioCadastro.patchValue({
        productImageUrl: storeImageUrl,
      })

      this.productCrudDatabaseService.createProduto("productDataBase", this.formularioCadastro.value).then(async (product:any)=>{
        await product;
        this.formularioCadastro.reset()
        this.formularioCadastro.patchValue({
          imageDisplay:this.ImagePadra,
        })
        this.descricaoProdutoHTML = ""
      })
    })
  }

  removeAcento(text){
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;
  }

  public cancelarCadastroProduto(){
    this.formularioCadastro.reset()
  }

  public cadastroNovoProduto_ExibirImagemPadrao(){
    this.formularioCadastro.reset()
    this.formularioCadastro.patchValue({
      imageDisplay:this.ImagePadra,
    })
  }

  public uploadFileCadastrar(event: Event){
    var file = (<HTMLInputElement>event.target).files[0]
    if ((<HTMLInputElement>event.target).files[0] && (<HTMLInputElement>event.target)) {
      var reader = new FileReader();
      reader.onload = ()=> {
        this.formularioCadastro.patchValue({
          imageDisplay:reader.result,
          imageNew: file
        })
      }
      reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
    }
  }
}