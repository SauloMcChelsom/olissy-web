import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../app.service'
import { AuthService  } from '../../AuthService';
import { CompleteOrdersService  } from './complete-orders.service';
declare var $ :any;


@Component({
  selector: 'app-complete-orders',
  templateUrl: './complete-orders.component.html',
  styleUrls: ['./complete-orders.component.css']
})
export class CompleteOrdersComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public produtos:any[] = []

  public ID = false

  public buttonconcluded:boolean = true

  public cellPhoneMask: any = {
    mask: '(00) 0 0000-0000',
    lazy: false
  };

  public FormaPagamento = [
    {description: 'Dinheiro', value: 'money', checked:false},
    {description: "Cartão de Débito", value: 'debit', checked:false},
    {description: "Cartão de Crédito", value: 'credit', checked:false}
  ];

  public TaxaDelivery = [];

  public TaxaDeliveryStatus:boolean = false

  public buttonTaxaDelivery:string = "Escolha a opção"

  public data = new Date();

  public formularioPedido: FormGroup = new FormGroup({
    "PRIMARY_KEY": new FormControl(null),
    "FOREIGN_KEY_STORE": new FormControl(null),
    "FOREIGN_KEY_CLIENT":new FormControl(null),
    "storeViewedTheOrder": new FormControl(false),
    "storeImageUrl": new FormControl(null),
    "storeName": new FormControl(null),
    "storeNeighborhood": new FormControl(null),
    "storeStreet": new FormControl(null),
    "storeCellPhone": new FormControl(null),
    "storeCity": new FormControl(null),
    "storeCNPJ": new FormControl(null),
    "storeEmail": new FormControl(null),
    "storeHours": new FormControl(null),
    "storeDeliveryEstimate": new FormControl(null),
    "clientAddressFull": new FormControl(null, Validators.required),
    "clientCellPhone": new FormControl(null, Validators.required),
    "clientMethodPayment": new FormControl(null, Validators.required),
    'clientImageUrl':new FormControl(null),
    "clientName": new FormControl(null),
    "clientLastName": new FormControl(null),
    "clientCity": new FormControl(null),
    "clientNeighborhood": new FormControl(null),
    "clientStreet": new FormControl(null),
    "clientEmail": new FormControl(null),
    "note": new FormControl([]),
    "informChange": new FormControl(null, Validators.required),
    "taxing": new FormControl('0.25'),
    "totalOrderValue": new FormControl(null),
    "taxaDelivery": new FormControl(0),
    "orderDate": new FormControl(`${new Date()}`),
    "orderState": new FormControl("reserved"),
    "rateOfDelivery": new FormControl(false),
    "rateOfDeliveryDescription": new FormControl(false),
    "indexDay":new FormControl(null),
  }) 

  constructor(private Appservice: AppService,
              private pedidoService:CompleteOrdersService,
              private router_navigator: Router,
              private route:ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    this.scrollToTop()
    this.authToken()
    this.setIdStoreInPedido()
    this.setStoreForms()
    this.setClientForms()
    this.setProducts()
  }

  public historyNavigateBack(){
    window.history.back();
  }

  public scrollToTop(){
    $('html, body').animate({scrollTop:0}, 'slow');
  }

  public async authToken(){
    this.authService.isLogged().subscribe((res:any)=>{
      if(res != null &&  Object.keys(this.produtos).length != 0){
        this.ID = res.uid
      }else{
        this.router_navigator.navigate(['/login'])
      }
    })
  }

  public setProducts(){
    this.produtos = this.Appservice.produtos
  }

  public setIdStoreInPedido(){
    this.formularioPedido.patchValue({
      FOREIGN_KEY_STORE : this.route.snapshot.params['id'],
      indexDay: new Date()
    })
  }

  public TotalValorDoPedido(){
    return this.produtos.reduce( (sum, item:any)=>{
      return new Number(sum).valueOf() + new Number(item.productPrice).valueOf() 
    },0)
  }

  public removerItem(indice){
     this.Appservice.produtos.splice(indice,1)
  }

  public aumentartem(item:any){
    let foundItem = this.Appservice.produtos.find( (items)=> items.productName ===  item.productName)
    if( item.quantities < item.productQuantities ){
      foundItem.quantities++;
      foundItem.productPrice = foundItem.productPriceOrigin * foundItem.quantities;
    }
  }

  public diminuirItem(item:any){
    let foundItem = this.Appservice.produtos.find( (items)=> items.productName ===  item.productName)
    if(foundItem.quantities == 1){

    }else{
      foundItem.quantities = foundItem.quantities - 1
      foundItem.productPrice = foundItem.productPrice - foundItem.productPriceOrigin
    }
  }

  public setTaxaDelivery(taxa, index:number){
    $('#displayRateOfDelivery').modal('toggle');
    this.formularioPedido.patchValue({
      rateOfDelivery:taxa.target.value,
      rateOfDeliveryDescription:this.TaxaDelivery[index].description
    })
    this.TaxaDeliveryStatus = false
    this.buttonTaxaDelivery = this.TaxaDelivery[index].description
  }

  public setMessageRateOfDelivery(){
    this.TaxaDeliveryStatusValidation()
  }


  public concluirPedido(){

    this.validationClientMethodPayment()

    this.fieldValidation()

    this.TaxaDeliveryStatusValidation()

    if(this.formularioPedido.valid && this.ID && this.TaxaDeliveryStatusValidation() && Object.keys(this.produtos).length != 0){
      this.cadastraPedido()
      this.buttonconcluded = false
    }else{
      console.log("formulario invalido")
    }
  }

  public cadastraPedido(){
    let pedido:any = []
        pedido = this.formularioPedido.value
        pedido.product = this.produtos
        pedido.totalOrderValue = this.TotalValorDoPedido()
    this.pedidoService.criarPedido("order", pedido).then((res:any)=>{
      for(const index in pedido.product) {
        this.pedidoService.decrementProductQuantities(pedido.product[index].PRIMARY_KEY, pedido.product[index].quantities)
        if((parseInt(index) + 1) == pedido.product.length){
          this.Appservice.pedido = []
          this.formularioPedido.reset
          this.produtos = []
          this.Appservice.produtos = []
          this.router_navigator.navigate([`/evaluate-store/${this.formularioPedido.get('FOREIGN_KEY_STORE').value}`])
        }
      }
    })
  }
 
  public setStoreForms(){
    this.pedidoService.getByFOREIGN_KEY('store', this.route.snapshot.params['id']).pipe(takeUntil(this.unsubscribe$)).subscribe((resposta:any)=>{
      this.FormaPagamento[0].checked = resposta[0].money
      this.FormaPagamento[1].checked = resposta[0].debit
      this.FormaPagamento[2].checked = resposta[0].credit
      
      if(resposta[0].negotiateRateLivery.status){
        this.TaxaDelivery.push({description:'Negociar taxa de entrega por Telefone', rule:false, value: 'negotiateRateLivery', checked:false})
      }

      if(resposta[0].onlyInNeighborhood.status){
        this.TaxaDelivery.push({description: `Entrega GRÁTIS no bairro ${resposta[0].storeNeighborhood}`,  rule:false, value: 'onlyInNeighborhood', checked:false})
      }

      if(resposta[0].deliveryFreeAbove.status){
        this.TaxaDelivery.push({description:`Entrega grátis acima de R$${resposta[0].deliveryFreeAbove.taxa} por ${resposta[0].deliveryFreeAbove.km}/km`, rule:true, value: 'deliveryFreeAbove',  checked:false})
      }

      if(resposta[0].deliveryBy.status){
        this.TaxaDelivery.push({description: `Entrega por R$${resposta[0].deliveryBy.taxa}/KM`, rule:true, value: 'deliveryBy', checked:false})
      }

      this.formularioPedido.patchValue({
        storeImageUrl: resposta[0].storeImageUrl,
        storeName : resposta[0].storeName,
        storeNeighborhood : resposta[0].storeNeighborhood,
        storeStreet : resposta[0].storeStreet,
        storeCellPhone : resposta[0].storeCellPhone,
        storeCity : resposta[0].storeCity,
        storeCNPJ : resposta[0].storeCNPJ,
        storeEmail : resposta[0].storeEmail,
        storeHours : resposta[0].storeHours,
        storeDeliveryEstimate : resposta[0].storeDeliveryEstimate
      })
    })
  }

  public setClientForms(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      if(res != null){
        this.pedidoService.getByFOREIGN_KEY('client', res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((resposta:any)=>{
          this.formularioPedido.patchValue({
            clientImageUrl:resposta[0].clientImageUrl,
            FOREIGN_KEY_CLIENT: resposta[0].FOREIGN_KEY,
            clientName: resposta[0].clientName,
            clientLastName: resposta[0].clientLastName,
            clientCity: resposta[0].clientCity,
            clientNeighborhood: resposta[0].clientNeighborhood,
            clientStreet: resposta[0].clientStreet,
            clientEmail: resposta[0].clientEmail,
          })
          this.formularioPedido.patchValue({
            clientAddressFull : `${resposta[0].clientStreet}, Bairro:${resposta[0].clientNeighborhood}, ${resposta[0].clientCity}/${resposta[0].clientState}-${resposta[0].clientCountry}, cep:${resposta[0].clientCEP}`,
            clientCellPhone: resposta[0].clientCellPhone
          })
        })
      }
    })
  }

  public validationClientMethodPayment(){
    if(this.formularioPedido.get('clientMethodPayment').valid && this.formularioPedido.get('informChange').valid == false){
      this.formularioPedido.patchValue({
        informChange:"0.00"
      })
    }
  }

  public TaxaDeliveryStatusValidation():boolean{
    let valid = null
    if( this.formularioPedido.get('rateOfDelivery').value == false ){
     this.TaxaDeliveryStatus = true
     valid = false
    }
    if( this.formularioPedido.get('rateOfDelivery').value ){
      valid = true
     }
    return valid
  }

  public fieldValidation(){
    this.formularioPedido.get('clientAddressFull').markAsTouched()
    this.formularioPedido.get('clientCellPhone').markAsTouched()
    this.formularioPedido.get('clientMethodPayment').markAsTouched()
  }

  public calculateTotalOrder(product, taxaPlataform, TaxaDelivery){
    return Number(product) + Number(taxaPlataform) + Number(TaxaDelivery);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

