import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators  }  from '@angular/forms'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { AuthService } from '../../AuthService'
import { StorePanelService } from './store-panel.service'
import estadosCidades from '../../../assets/estados-cidades'
declare var $ :any

@Component({
  selector: 'app-store-panel',
  templateUrl: './store-panel.component.html',
  styleUrls: ['./store-panel.component.css']
})

export class StorePanelComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject()

  public loading:boolean = false

  public PRIMARY_KEY_USUARIO:string = ""

  public states = estadosCidades.endereco[0].estados
  public citys = estadosCidades.endereco[0].estados[0].cidades


  public avatar = "https://firebasestorage.googleapis.com/v0/b/olissy-app.appspot.com/o/icone%2Favatar.png?alt=media&token=6b83f0ac-4a70-45c1-ba79-70f52e8f9b64"

  public phoneMask: any = {
    mask: '(00) 0000-0000',
    lazy: false
  }

  public cellPhoneMask: any = {
    mask: '(00) 0 0000-0000',
    lazy: false
  }

  public cnpjMask: any = {
    mask: '00.000.000/0000-00',
    lazy: false
  }

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

  public formStores: FormGroup = new FormGroup({
    'FOREIGN_KEY':new FormControl(null),
    'PRIMARY_KEY':new FormControl(null),
    'storeRating':new FormControl(0),
    'storeImagePath': new FormControl(null),
    'storeImageUrl': new FormControl(null),
    'imageDisplay': new FormControl(null),
    'imageNew': new FormControl(null),
    'storeName': new FormControl(null,Validators.required),
    'storeHours':new FormControl(null,Validators.required),
    'storeDeliveryEstimate':new FormControl(null,Validators.required),
    'storeCategory':new FormControl(null,Validators.required),
    'storeAbout':new FormControl(null,Validators.required),
    'storeNeighborhood':new FormControl(null,Validators.required),
    'storeStreet':new FormControl(null,Validators.required),
    'storeCellPhone':new FormControl(null,Validators.required),
    'storeEmail':new FormControl(null),
    'storeTelephone':new FormControl(null,Validators.required),
    'storeCNPJ':new FormControl(null,Validators.required),
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

  constructor(private comercioService: StorePanelService,
              private authService:AuthService) {}

  ngOnInit() {
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.comercioService.getByFOREIGN_KEY('store', res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((user:any)=>{
        
        this.formStores.patchValue({
          FOREIGN_KEY: user[0].FOREIGN_KEY,
          PRIMARY_KEY: user[0].PRIMARY_KEY,
          imageDisplay: user[0].storeImageUrl,
          storeImagePath: user[0].storeImagePath,
          storeImageUrl: user[0].storeImageUrl,
          storeAbout: user[0].storeAbout,
          storeCategory: user[0].storeCategory,
          storeCellPhone: user[0].storeCellPhone,
          storeCity: user[0].storeCity,
          storeDeliveryEstimate: user[0].storeDeliveryEstimate,
          storeEmail: user[0].storeEmail,
          storeHours: user[0].storeHours,
          storeName: user[0].storeName,
          storeNeighborhood: user[0].storeNeighborhood,
          storeRating: user[0].storeRating,
          storeStreet: user[0].storeStreet,
          storeTelephone: user[0].storeTelephone,
          storeCNPJ : user[0].storeCNPJ,
          storeCEP : user[0].storeCEP,
          storeState : user[0].storeState,
          money: user[0].money,
          debit:  user[0].debit,
          credit:  user[0].credit,
          negotiateRateLivery: user[0].negotiateRateLivery,
          onlyInNeighborhood: user[0].onlyInNeighborhood,
          deliveryFreeAbove: user[0].deliveryFreeAbove,
          deliveryBy: user[0].deliveryBy,
        })

        this.checkPayment[0].checked = user[0].money
        this.checkPayment[1].checked = user[0].debit
        this.checkPayment[2].checked = user[0].credit

        this.TaxaDelivery[0].checked = user[0].negotiateRateLivery.status
        this.TaxaDelivery[1].checked = user[0].onlyInNeighborhood.status
        this.TaxaDelivery[2].checked = user[0].deliveryFreeAbove.status
        this.TaxaDelivery[2].km = user[0].deliveryFreeAbove.km
        this.TaxaDelivery[2].taxa = user[0].deliveryFreeAbove.taxa
        this.TaxaDelivery[2].description = `Entrega grátis acima de R$${user[0].deliveryFreeAbove.taxa} por ${user[0].deliveryFreeAbove.km}/km`
        this.TaxaDelivery[3].checked = user[0].deliveryBy.status
        this.TaxaDelivery[3].taxa = user[0].deliveryBy.taxa
        this.TaxaDelivery[3].description = `Entrega por R$${user[0].deliveryBy.taxa}/KM`

        for (const uf in this.states) {
          if (this.states[uf].sigla == user[0].storeState) {
            this.citys = this.states[uf].cidades
          }
        }

      })
    })
  }

  onCheckChange(event) {

    if(event.target.value == "money"){
      this.formStores.patchValue({
        money: event.target.checked
      })
    }

    if(event.target.value == "debit"){
      this.formStores.patchValue({
        debit: event.target.checked
      })
    }

    if(event.target.value == "credit"){
      this.formStores.patchValue({
        credit: event.target.checked
      })
    }

    if(this.formStores.get('money').value || this.formStores.get('debit').value || this.formStores.get('credit').value){
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
      this.formStores.patchValue({
        deliveryFreeAbove: { status:false, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
      })
      if(this.formStores.get('deliveryFreeAbove').value.taxa > 0 && this.formStores.get('deliveryFreeAbove').value.km > 0){
        this.taxaDeliveryStatus = true
        $("#deliveryFreeAbove").prop("checked", true)
        this.formStores.patchValue({
          deliveryFreeAbove: { status:true, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
        })
      }
    }else{
      $("#deliveryFreeAbove").prop("checked", false)
      let text = `Entrega grátis acima de R$${this.TaxaDelivery[2].taxa} por 0/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].km = 0
      this.formStores.patchValue({
        deliveryFreeAbove: { status:false, taxa:this.TaxaDelivery[2].taxa, km:0 }
      })
      if(!this.formStores.get('negotiateRateLivery').value.status &&
         !this.formStores.get('onlyInNeighborhood').value.status && 
         !this.formStores.get('deliveryFreeAbove').value.status && 
         !this.formStores.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }

  public setTaxaDeliveryAbobeTaxa(value){
    if(parseFloat(value) > 0 ){
      let text = `Entrega grátis acima de R$${value} por ${this.TaxaDelivery[2].km}/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].taxa = parseFloat(value)
      this.formStores.patchValue({
        deliveryFreeAbove: { status:false, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
      })
      if(this.formStores.get('deliveryFreeAbove').value.taxa > 0 && this.formStores.get('deliveryFreeAbove').value.km > 0){
        this.taxaDeliveryStatus = true
        $("#deliveryFreeAbove").prop("checked", true)
        this.formStores.patchValue({
          deliveryFreeAbove: { status:true, taxa:this.TaxaDelivery[2].taxa, km:this.TaxaDelivery[2].km }
        })
      }
    }else{
      $("#deliveryFreeAbove").prop("checked", false)
      let text = `Entrega grátis acima de R$0 por ${this.TaxaDelivery[2].km}/km`
      this.TaxaDelivery[2].description = text
      this.TaxaDelivery[2].taxa = 0
      this.formStores.patchValue({
        deliveryFreeAbove: { status:false, taxa:0, km:this.TaxaDelivery[2].km }
      })
      if(!this.formStores.get('negotiateRateLivery').value.status &&
         !this.formStores.get('onlyInNeighborhood').value.status && 
         !this.formStores.get('deliveryFreeAbove').value.status && 
         !this.formStores.get('deliveryBy').value.status){
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
      this.formStores.patchValue({
        deliveryBy: { status:true, taxa:this.TaxaDelivery[3].taxa}
      })
    }else{
      $("#deliveryBy").prop("checked", false)
      let text = `Entrega por R$0/KM`
      this.TaxaDelivery[3].description = text
      this.TaxaDelivery[3].taxa = 0
      this.formStores.patchValue({
        deliveryBy: { status:false, taxa:0}
      })
      if(!this.formStores.get('negotiateRateLivery').value.status &&
         !this.formStores.get('onlyInNeighborhood').value.status && 
         !this.formStores.get('deliveryFreeAbove').value.status && 
         !this.formStores.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }


  public setTaxaDelivery(event){

    if(event.target.value == "negotiateRateLivery"){
      this.formStores.patchValue({
        negotiateRateLivery: { status:event.target.checked }
      })
    }

    if(event.target.value == "onlyInNeighborhood"){
      this.formStores.patchValue({
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

    if(this.formStores.get('negotiateRateLivery').value.status || this.formStores.get('onlyInNeighborhood').value.status || this.formStores.get('deliveryFreeAbove').value.status || this.formStores.get('deliveryBy').value.status){
      this.taxaDeliveryStatus = true
    }else{
      this.taxaDeliveryStatus = false
    }
  }

  public alterarCadastroLoja(){
    if((this.formStores.get('money').value || this.formStores.get('debit').value || this.formStores.get('credit').value) &&
      (this.formStores.get('negotiateRateLivery').value.status || this.formStores.get('onlyInNeighborhood').value.status || this.formStores.get('deliveryFreeAbove').value.status || this.formStores.get('deliveryBy').value.status)){
      this.checkPaymentStatus = true
      this.taxaDeliveryStatus = true
      this.markAsTouched()
      if(this.formStores.status === "VALID"){
        this.loading = true
        if(this.formStores.get('imageNew').value === null){
          this.comercioService.alterarCadastroLoja(this.formStores.value).then(()=>{
            this.loading = false
            this.markAsUntouched()
          })
        }else{
          this.comercioService.setImagemStorage(`user/${this.formStores.get('PRIMARY_KEY').value}.jpg`, this.formStores.get('imageNew').value).then((url:any)=>{
            this.formStores.patchValue({
              clientImageUrl : url,
              clientImagePath : `user/${this.formStores.get('PRIMARY_KEY').value}.jpg`
            })
            this.comercioService.alterarCadastroLoja(this.formStores.value).then(()=>{
              this.loading = false
              this.markAsUntouched()
            })
          })
        }
      }
    }else{
      if(!this.formStores.get('money').value && !this.formStores.get('debit').value && !this.formStores.get('credit').value) {
        this.checkPaymentStatus = false
      }
      if(!this.formStores.get('negotiateRateLivery').value.status && !this.formStores.get('onlyInNeighborhood').value.status && !this.formStores.get('deliveryFreeAbove').value.status && !this.formStores.get('deliveryBy').value.status){
        this.taxaDeliveryStatus = false
      }
    }
  }

  public markAsUntouched(){
    this.formStores.get('storeHours').markAsUntouched()
    this.formStores.get('storeName').markAsUntouched()
    this.formStores.get('storeDeliveryEstimate').markAsUntouched()
    this.formStores.get('storeCategory').markAsUntouched()
    this.formStores.get('storeAbout').markAsUntouched()
    this.formStores.get('storeCity').markAsUntouched()
    this.formStores.get('storeNeighborhood').markAsUntouched()
    this.formStores.get('storeStreet').markAsUntouched()
    this.formStores.get('storeCellPhone').markAsUntouched()
    this.formStores.get('storeEmail').markAsUntouched()
    this.formStores.get('storeAbout').markAsUntouched()
    this.formStores.get('storeTelephone').markAsUntouched()
  }

  public markAsTouched(){
    this.formStores.get('storeHours').markAsTouched()
    this.formStores.get('storeName').markAsTouched()
    this.formStores.get('storeDeliveryEstimate').markAsTouched()
    this.formStores.get('storeCategory').markAsTouched()
    this.formStores.get('storeAbout').markAsTouched()
    this.formStores.get('storeCity').markAsTouched()
    this.formStores.get('storeNeighborhood').markAsTouched()
    this.formStores.get('storeStreet').markAsTouched()
    this.formStores.get('storeCellPhone').markAsTouched()
    this.formStores.get('storeEmail').markAsTouched()
    this.formStores.get('storeAbout').markAsTouched()
    this.formStores.get('storeTelephone').markAsTouched()
  }


  public uploadFileImagem(event: Event){
    this.fileImagem(event)
  }

  public fileImagem(event: Event){
    var file = (<HTMLInputElement>event.target).files[0]
    if ((<HTMLInputElement>event.target).files[0] && (<HTMLInputElement>event.target)) {
      var reader = new FileReader();
      reader.onload = ()=> {
        this.formStores.patchValue({
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
    this.formStores.patchValue({
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
    this.formStores.patchValue({
      storeCity : null
    })
    this.formStores.get('storeCity').markAsTouched()
  }

  setCep(caracter){
    let caracterUnderline = caracter.replace(/_/g, ''); 
    let caracterSubtrair = caracterUnderline.replace(/-/g, ''); 
    let cep = caracterSubtrair
    if(cep.length == 8){
      this.comercioService.getCEP(cep).subscribe((cepResponse:any)=>{
        if(cepResponse.cep == caracterUnderline){
           this.formStores.patchValue({
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
