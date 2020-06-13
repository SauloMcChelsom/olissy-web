import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../AuthService'
import { ClientOpenYourStoreService } from './client-open-your-store.service'
import estadosCidades from '../../../assets/estados-cidades'
declare var $ :any

@Component({
  selector: 'app-client-open-your-store',
  templateUrl: './client-open-your-store.component.html',
  styleUrls: ['./client-open-your-store.component.css']
})

export class ClientOpenYourStoreComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public loading:boolean = false

  public categorias = [];

  public PRIMARY_KEY_USUARIO:string = ""

  public states = estadosCidades.endereco[0].estados
  public citys = estadosCidades.endereco[0].estados[0].cidades

  public avatar = "/assets/plataform/avatar.png"

  public phoneMask: any = {
    mask: '(00) 0000-0000',
    lazy: false
  };

  public cellPhoneMask: any = {
    mask: '(00) 0 0000-0000',
    lazy: false
  };

  public cnpjMask: any = {
    mask: '00.000.000/0000-00',
    lazy: false
  };

  public cepMask: any = {
    mask: '00000-000',
    lazy: false
  };

  public checkPayment = [
    {description: 'Dinheiro', value: 'money', checked:false},
    {description: "Débito", value: 'debit', checked:false},
    {description: "Crédito", value: 'credit', checked:false}
  ];

  public TaxaDelivery = [
    {description: 'Negociar taxa de entrega', rule:false, value: 'negotiateRateLivery', checked:false},
    {description: "Entrega somente no bairro (Grátis)",  rule:false, value: 'onlyInNeighborhood', checked:false},
    {description: "Entrega grátis acima de R$0.00 por 0/km", taxa:0.00, km:0, rule:true, value: 'deliveryFreeAbove',  checked:false},
    {description: "Entrega por R$0.00/KM", taxa:0.00, rule:true, value: 'deliveryBy', checked:false}
  ];

  public checkPaymentStatus:any = "clean"

  public taxaDeliveryStatus:any = "clean"

  public formularioAbrirMinhaLoja: FormGroup = new FormGroup({
    'FOREIGN_KEY':new FormControl(null),
    'PRIMARY_KEY':new FormControl(null),
    'follow':new FormControl(0),
    'commentStore':new FormControl(0),
    'sale':new FormControl(0),
    'productQuantity':new FormControl(0),
    'storeImagePath': new FormControl(null),
    'storeImageUrl': new FormControl(null),
    'imageDisplay': new FormControl(null),
    'imageNew': new FormControl(null,Validators.required),
    'storeName': new FormControl(null,Validators.required),
    'storeHours':new FormControl(null,Validators.required),
    'storeDeliveryEstimate':new FormControl(null,Validators.required),
    'storeCategory':new FormControl('farmacia',Validators.required),
    'storeAbout':new FormControl(null,Validators.required),
    'storeNeighborhood':new FormControl(null,Validators.required),
    'storeStreet':new FormControl(null,Validators.required),
    'storeCellPhone':new FormControl(null,Validators.required),
    'storeEmail':new FormControl(null),
    'storeTelephone':new FormControl(null,Validators.required),
    'storeCNPJ':new FormControl(null,Validators.required),
    'authorizationOpenStore':new FormControl(true,Validators.required),
    'storeOpenOrClosed':new FormControl(true,Validators.required),
    'storeCountry': new FormControl('Brazil'),
    'storeCity': new FormControl('Acrelândia'),
    'storeState': new FormControl('AC'),
    'storeCEP': new FormControl(null),
    'money': new FormControl(false),
    'debit': new FormControl(false),
    'credit': new FormControl(false),
    'negotiateRateLivery': new FormControl({status:false}),
    'onlyInNeighborhood': new FormControl({status:false}),
    'deliveryFreeAbove': new FormControl({status:false, taxa:0, km:0}),
    'deliveryBy': new FormControl({status:false}),
  })

  constructor(private authService:AuthService,
              private abrirSuaLojaService:ClientOpenYourStoreService,
              private router_navigator: Router) { }

  ngOnInit() {

    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.abrirSuaLojaService.getByFOREIGN_KEY('user', res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((user:any)=>{
        this.PRIMARY_KEY_USUARIO = user[0].PRIMARY_KEY
      })
    })

    this.formularioAbrirMinhaLoja.patchValue({
      imageDisplay:this.avatar,
    })

    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.abrirSuaLojaService.getByFOREIGN_KEY('store', res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        if(!store[0].PRIMARY_KEY){
          this.setIdDocInformularioCliente(res.uid, res.email)
        }else{
          this.formularioAbrirMinhaLoja.patchValue({
            FOREIGN_KEY:store[0].FOREIGN_KEY,
            PRIMARY_KEY:store[0].PRIMARY_KEY,
            storeImagePath:`user/${store[0].PRIMARY_KEY}.jpg`,
            storeEmail: store[0].storeEmail
          })
        }
      })
    })
  }

  onCheckChange(event) {

    if(event.target.value == "money"){
      this.formularioAbrirMinhaLoja.patchValue({
        money: event.target.checked
      })
    }

    if(event.target.value == "debit"){
      this.formularioAbrirMinhaLoja.patchValue({
        debit: event.target.checked
      })
    }

    if(event.target.value == "credit"){
      this.formularioAbrirMinhaLoja.patchValue({
        credit: event.target.checked
      })
    }

    if(this.formularioAbrirMinhaLoja.get('money').value || this.formularioAbrirMinhaLoja.get('debit').value || this.formularioAbrirMinhaLoja.get('credit').value){
      this.checkPaymentStatus = true
    }else{
      this.checkPaymentStatus = false
    }

  }

  public setTaxaDeliveryAboveKmValue(value){
    if(parseFloat(value) > 0 ){
      let text = `Entrega grátis acima de R$${this.TaxaDelivery[2].taxa} por ${value}/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].km = parseFloat(value)
      this.formularioAbrirMinhaLoja.patchValue({
        deliveryFreeAbove: { status:false, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
      })
      if(this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.taxa > 0 && this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.km > 0){
        this.taxaDeliveryStatus = true
        $("#deliveryFreeAbove").prop("checked", true)
        this.formularioAbrirMinhaLoja.patchValue({
          deliveryFreeAbove: { status:true, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
        })
      }
    }else{
      $("#deliveryFreeAbove").prop("checked", false)
      let text = `Entrega grátis acima de R$${this.TaxaDelivery[2].taxa} por 0/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].km = 0
      this.formularioAbrirMinhaLoja.patchValue({
        deliveryFreeAbove: { status:false, taxa:this.TaxaDelivery[2].taxa, km:0 }
      })
      if(!this.formularioAbrirMinhaLoja.get('negotiateRateLivery').value.status &&
         !this.formularioAbrirMinhaLoja.get('onlyInNeighborhood').value.status && 
         !this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.status && 
         !this.formularioAbrirMinhaLoja.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }

  public setTaxaDeliveryAbobeTaxa(value){
    if(parseFloat(value) > 0 ){
      let text = `Entrega grátis acima de R$${value} por ${this.TaxaDelivery[2].km}/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].taxa = parseFloat(value)
      this.formularioAbrirMinhaLoja.patchValue({
        deliveryFreeAbove: { status:false, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
      })
      if(this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.taxa > 0 && this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.km > 0){
        this.taxaDeliveryStatus = true
        $("#deliveryFreeAbove").prop("checked", true)
        this.formularioAbrirMinhaLoja.patchValue({
          deliveryFreeAbove: { status:true, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
        })
      }
    }else{
      $("#deliveryFreeAbove").prop("checked", false)
      let text = `Entrega grátis acima de R$0 por ${this.TaxaDelivery[2].km}/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].taxa = 0
      this.formularioAbrirMinhaLoja.patchValue({
        deliveryFreeAbove: { status:false, taxa:0, km:this.TaxaDelivery[2].km }
      })
      if(!this.formularioAbrirMinhaLoja.get('negotiateRateLivery').value.status &&
         !this.formularioAbrirMinhaLoja.get('onlyInNeighborhood').value.status && 
         !this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.status && 
         !this.formularioAbrirMinhaLoja.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }

  public setTaxaDeliveryByKmValue(value){
    if(parseFloat(value) > 0 ){
      $("#deliveryBy").prop("checked", true)
      this.taxaDeliveryStatus = true
      let text = `Entrega por R$${value}/KM`
      this.TaxaDelivery[3].description = text
      this.TaxaDelivery[3].taxa = parseFloat(value)
      this.formularioAbrirMinhaLoja.patchValue({
        deliveryBy: { status:true, taxa:this.TaxaDelivery[3].taxa}
      })
    }else{
      $("#deliveryBy").prop("checked", false)
      let text = `Entrega por R$0/KM`
      this.TaxaDelivery[3].description = text
      this.TaxaDelivery[3].taxa = 0
      this.formularioAbrirMinhaLoja.patchValue({
        deliveryBy: { status:false, taxa:0}
      })
      if(!this.formularioAbrirMinhaLoja.get('negotiateRateLivery').value.status &&
         !this.formularioAbrirMinhaLoja.get('onlyInNeighborhood').value.status && 
         !this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.status && 
         !this.formularioAbrirMinhaLoja.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }


  public setTaxaDelivery(event){

    if(event.target.value == "negotiateRateLivery"){
      this.formularioAbrirMinhaLoja.patchValue({
        negotiateRateLivery: { status:event.target.checked }
      })
    }

    if(event.target.value == "onlyInNeighborhood"){
      this.formularioAbrirMinhaLoja.patchValue({
        onlyInNeighborhood: { status:event.target.checked }
      })
    }

    if(event.target.value == "deliveryFreeAbove" && this.TaxaDelivery[2].taxa <= 0 && this.TaxaDelivery[2].km <= 0){
      $("#deliveryFreeAbove").prop("checked", false)
    }else{
      if(event.target.value == "deliveryFreeAbove" ){
        $("#deliveryFreeAbove").prop("checked", true)
      }
    }

    if(event.target.value == "deliveryBy" && this.TaxaDelivery[3].taxa <= 0){
      $("#deliveryBy").prop("checked", false)
    }else{
      if(event.target.value == "deliveryBy" ){
        $("#deliveryBy").prop("checked", true)
      }
    }

    if(this.formularioAbrirMinhaLoja.get('negotiateRateLivery').value.status || this.formularioAbrirMinhaLoja.get('onlyInNeighborhood').value.status || this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.status || this.formularioAbrirMinhaLoja.get('deliveryBy').value.status){
      this.taxaDeliveryStatus = true
    }else{
      this.taxaDeliveryStatus = false
    }
  }

  public setIdDocInformularioCliente(FOREIGN_KEY, EMAIL){
    this.abrirSuaLojaService.getIdDocByFOREIGN_KEY("store", FOREIGN_KEY).get().pipe(takeUntil(this.unsubscribe$)).subscribe( (res)=> {
     let PRIMARY_KEY = ""
      res.forEach(function (doc) {
        //console.log(doc.id, ' => ', doc.data());
        PRIMARY_KEY = doc.id
      });
      this.formularioAbrirMinhaLoja.patchValue({
        PRIMARY_KEY:PRIMARY_KEY,
        FOREIGN_KEY:FOREIGN_KEY,
        storeImagePath:`user/${PRIMARY_KEY}.jpg`,
        storeEmail: EMAIL
      })
    })
  }

  public abrirMinhaLoja(){

    this.formularioAbrirMinhaLoja.get('imageNew').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeHours').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeName').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeDeliveryEstimate').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeCategory').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeAbout').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeCity').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeNeighborhood').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeStreet').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeCellPhone').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeEmail').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeAbout').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeTelephone').markAsTouched()
    this.formularioAbrirMinhaLoja.get('storeCNPJ').markAsTouched()

    if((this.formularioAbrirMinhaLoja.get('money').value || this.formularioAbrirMinhaLoja.get('debit').value || this.formularioAbrirMinhaLoja.get('credit').value) &&
      (this.formularioAbrirMinhaLoja.get('negotiateRateLivery').value.status || this.formularioAbrirMinhaLoja.get('onlyInNeighborhood').value.status || this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.status || this.formularioAbrirMinhaLoja.get('deliveryBy').value.status)){
      this.checkPaymentStatus = true
      this.taxaDeliveryStatus = true
      if(this.formularioAbrirMinhaLoja.status === "VALID"){
        this.loading = true
        console.log("cadastrado com sucesso!")
        this.abrirSuaLojaService.setImagemStorage(this.formularioAbrirMinhaLoja.get('storeImagePath').value, this.formularioAbrirMinhaLoja.get('imageNew').value).then(async (url:any)=>{
          let storeImageUrl = await url
          this.formularioAbrirMinhaLoja.patchValue({
            storeImageUrl: storeImageUrl,
          })
          this.abrirSuaLojaService.cadastrarLoja(this.formularioAbrirMinhaLoja.value, this.formularioAbrirMinhaLoja.get('PRIMARY_KEY').value, this.PRIMARY_KEY_USUARIO).then((cadastro:any)=>{
            this.router_navigator.navigate(['/store-product-registration']);
          })
        })
      }else{
        this.loading = false
      }
    }else{
      if(!this.formularioAbrirMinhaLoja.get('money').value && !this.formularioAbrirMinhaLoja.get('debit').value && !this.formularioAbrirMinhaLoja.get('credit').value) {
        this.checkPaymentStatus = false
      }
      if(!this.formularioAbrirMinhaLoja.get('negotiateRateLivery').value.status && !this.formularioAbrirMinhaLoja.get('onlyInNeighborhood').value.status && !this.formularioAbrirMinhaLoja.get('deliveryFreeAbove').value.status && !this.formularioAbrirMinhaLoja.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }


  public uploadFileImagem(event: Event){
    this.FileImagem(event)
  }

  public FileImagem(event: Event){
    var file = (<HTMLInputElement>event.target).files[0]
    if ((<HTMLInputElement>event.target).files[0] && (<HTMLInputElement>event.target)) {
      var reader = new FileReader();
      reader.onload = ()=> {
        this.formularioAbrirMinhaLoja.patchValue({
          imageDisplay:reader.result,
          imageNew: file
        }) 
      }
      reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
    }
  }

  public uploadFile(event: Event, FORM:number = 0){
    var file = (<HTMLInputElement>event.target).files[0]
    if(file){
      this.ImageBase64Reduse(file, 100, 100, FORM).then(blob => {
        URL.createObjectURL(blob);
      }, err => {
        console.error("Photo error", err);
      });
    }
  }

  public ImageBase64Reduse(FILE:File, MAX_WIDTH:number, MAX_HEIGHT:number, FORM:number) :Promise<Blob> {
    return new Promise((resolve, reject) => {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var maxW = MAX_WIDTH;
      var maxH = MAX_HEIGHT;
      var img = new Image();
          img.src = URL.createObjectURL(FILE)

      img.onload = ()=> {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;

        canvas.width = iwScaled;
        canvas.height = ihScaled;
        context.drawImage(img, 0, 0, iwScaled, ihScaled);

        var Base64 = canvas.toDataURL("image/png", 1.0)
        var block = Base64.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];

        this.b64toBlob(realData, contentType, Base64, FORM)
      }
    });
  }

  public b64toBlob(b64Data, contentType, Base64, FORM:number) {
    contentType = contentType || '';
    let sliceSize =  50;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    this.formularioAbrirMinhaLoja.patchValue({
      imageDisplay:Base64,
      imageNew: blob
    })
  }


  setState(state){
    for (const uf in this.states) {
      if (this.states[uf].sigla == state) {
        this.citys = this.states[uf].cidades
      }
    }
    this.formularioAbrirMinhaLoja.patchValue({
      storeCity : null
    })
    this.formularioAbrirMinhaLoja.get('storeCity').markAsTouched()
  }

  setCep(caracter){
    let caracterUnderline = caracter.replace(/_/g, ''); 
    let caracterSubtrair = caracterUnderline.replace(/-/g, ''); 
    let cep = caracterSubtrair
    if(cep.length == 8){
      this.abrirSuaLojaService.getCEP(cep).subscribe((cepResponse:any)=>{
        if(cepResponse.cep == caracterUnderline){
           this.formularioAbrirMinhaLoja.patchValue({
            storeNeighborhood : cepResponse.bairro,
            storeCity : cepResponse.localidade,
            storeStreet : cepResponse.logradouro,
            storeState : cepResponse.uf,
          })
          for (const uf in this.states) {
            if (this.states[uf].sigla == cepResponse.uf) {
              this.citys = this.states[uf].cidades
            }
          }
        }
      })
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

