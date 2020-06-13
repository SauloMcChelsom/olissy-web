import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../../app.service'
import { AuthService  } from '../../AuthService';
import { ClientOrderDetailAlterService } from './client-order-detail-alter.service'
declare var $ :any;

@Component({
  selector: 'app-client-order-detail-alter',
  templateUrl: './client-order-detail-alter.component.html',
  styleUrls: ['./client-order-detail-alter.component.css']
})
export class ClientOrderDetailAlterComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public produtos:any[] = []

  public note;

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
              private pedidoService:ClientOrderDetailAlterService,
              private router_navigator: Router,
              private route:ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    this.scrollToTop()
    this.setProducts()
  }

  public historyNavigateBack(){
    window.history.back();
  }

  public scrollToTop(){
    $('html, body').animate({scrollTop:0}, 'slow');
  }

  public setProducts(){
    this.pedidoService.getOrder(this.route.snapshot.params['id']).subscribe((product:any)=>{
      this.produtos = product[0].product
      this.note =  product[0].note
      this.setOrder(product)
      this.setTaxaDeliveryForms(product[0].FOREIGN_KEY_STORE)
    })
  }

  public setOrder(resposta){
    console.log(resposta)
    this.formularioPedido.patchValue({
      PRIMARY_KEY:resposta[0].PRIMARY_KEY,
      FOREIGN_KEY_STORE:resposta[0].FOREIGN_KEY_STORE,
      FOREIGN_KEY_CLIENT:resposta[0].FOREIGN_KEY_CLIENT,
      storeViewedTheOrder:resposta[0].storeViewedTheOrder,
      storeImageUrl:resposta[0].storeImageUrl,
      storeName:resposta[0].storeName,
      storeNeighborhood:resposta[0].storeNeighborhood,
      storeStreet:resposta[0].storeStreet,
      storeCellPhone:resposta[0].storeCellPhone,
      storeCity:resposta[0].storeCity,
      storeCNPJ:resposta[0].storeCNPJ,
      storeEmail:resposta[0].storeEmail,
      storeHours:resposta[0].storeHours,
      storeDeliveryEstimate:resposta[0].storeDeliveryEstimate,
      clientAddressFull:resposta[0].clientAddressFull,
      clientCellPhone:resposta[0].clientCellPhone,
      clientMethodPayment:resposta[0].clientMethodPayment,
      clientImageUrl:resposta[0].clientImageUrl,
      clientName:resposta[0].clientName,
      clientLastName:resposta[0].clientLastName,
      clientCity:resposta[0].clientCity,
      clientNeighborhood:resposta[0].clientNeighborhood,
      clientStreet:resposta[0].clientStreet,
      clientEmail:resposta[0].clientEmail,
      informChange:resposta[0].informChange,
      taxing:resposta[0].taxing,
      totalOrderValue:resposta[0].totalOrderValue,
      taxaDelivery:resposta[0].taxaDelivery,
      orderDate:resposta[0].orderDate,
      orderState:resposta[0].orderState,
      rateOfDelivery:resposta[0].rateOfDelivery,
      rateOfDeliveryDescription:resposta[0].rateOfDeliveryDescription,
      indexDay:resposta[0].indexDay,
    })
    this.TaxaDeliveryStatus = false
    this.buttonTaxaDelivery = resposta[0].rateOfDeliveryDescription
  }

  public TotalValorDoPedido(){
    return this.produtos.reduce( (sum, item:any)=>{
      return new Number(sum).valueOf() + new Number(item.productPrice).valueOf() 
    },0)
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
    this.setCheckedRateOfDelivery()
  }

  public setCheckedRateOfDelivery(){
    if(this.TaxaDelivery[0].value == this.formularioPedido.get('rateOfDelivery').value) {
      this.TaxaDelivery[0].checked = true
    }

    if(this.TaxaDelivery[1].value == this.formularioPedido.get('rateOfDelivery').value) {
      this.TaxaDelivery[1].checked = true
    }

    if(this.TaxaDelivery[2].value == this.formularioPedido.get('rateOfDelivery').value) {
      this.TaxaDelivery[2].checked = true
    }

    if(this.TaxaDelivery[3].value == this.formularioPedido.get('rateOfDelivery').value) {
      this.TaxaDelivery[3].checked = true
    }
  }


 
  public setTaxaDeliveryForms(FOREIGN_KEY_STORE){
    this.pedidoService.getStore(FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((resposta:any)=>{
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

  public concluirPedido(){

    this.validationClientMethodPayment()

    this.fieldValidation()

    this.TaxaDeliveryStatusValidation()

    if(this.formularioPedido.valid && this.TaxaDeliveryStatusValidation() && Object.keys(this.produtos).length != 0){
      this.cadastraPedido()
      this.buttonconcluded = false
    }else{
      console.log("formulario invalido")
    }
  }

  public calculateTotalOrder(product, taxaPlataform, TaxaDelivery){
    return Number(product) + Number(taxaPlataform) + Number(TaxaDelivery);
  }

  public cadastraPedido(){
    let pedido:any = []
        pedido = this.formularioPedido.value
        pedido.product = this.produtos
        pedido.note = this.note
        pedido.totalOrderValue = this.TotalValorDoPedido()
        this.pedidoService.changeOrder(pedido).then((res)=>{
          this.historyNavigateBack()
        })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

