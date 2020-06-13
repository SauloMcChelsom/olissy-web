import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { AuthService } from '../../AuthService';
import { StoreUserChangeRegistrationService } from './store-user-change-registration.service';
import { client } from '../../interfaces';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import IMask from 'imask';
import estadosCidades from '../../../assets/estados-cidades'

@Component({
  selector: 'app-store-user-change-registration',
  templateUrl: './store-user-change-registration.component.html',
  styleUrls: ['./store-user-change-registration.component.css']
})

export class StoreUserChangeRegistrationComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject

  public loading:boolean = false

  public states = estadosCidades.endereco[0].estados
  public citys = estadosCidades.endereco[0].estados[0].cidades

  public avatar:any = "/assets/plataform/avatar.png"

  public getNameImagem = ""

  public cepMask: any = {
    mask: '00000-000',
    lazy: false
  };

  public timestampMask: any = {
    mask: Date,
    lazy: false,
    overwrite: true,
    autofix: true,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: "d",
        from: 1,
        to: 31,
        maxLength: 2
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: "m",
        from: 1,
        to: 12,
        maxLength: 2
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: "y",
        from: 1900,
        to: 2999,
        maxLength: 4
      }
    }
  };

  public phoneMask: any = {
    mask: '(00) 0000-0000',
    lazy: false
  };

  public cellPhoneMask: any = {
    mask: '(00) 0 0000-0000',
    lazy: false
  };

  public formularioCliente: FormGroup = new FormGroup({
    'FOREIGN_KEY': new FormControl(null,Validators.required),
    'PRIMARY_KEY':new FormControl(null,Validators.required),
    'clientNeighborhood': new FormControl(null),
    'clientCellPhone': new FormControl(null),
    'clientEmail': new FormControl(null,Validators.required),
    'imageNew': new FormControl(null),
    'imageDisplay': new FormControl(this.avatar,Validators.required),
    'clientImagePath': new FormControl(null),
    'clientImageUrl': new FormControl(null),
    'clientBirth':new FormControl(null),
    'clientName':new FormControl(null,Validators.required),
    'clientStreet':new FormControl(null),
    'clientSex':new FormControl(null),
    'clientLastName':new FormControl(null,Validators.required),
    'clientTelephone':new FormControl(null),
    'clientCountry': new FormControl('Brazil'),
    'clientCity': new FormControl('Acrelândia'),
    'clientState': new FormControl('AC'),
    'clientCEP': new FormControl(null),
  })

  constructor(private authService:AuthService,
              private comercioUsuarioService:StoreUserChangeRegistrationService) { }

  ngOnInit() {
    this.cliente()
  }

  setState(state){
    for (const uf in this.states) {
      if (this.states[uf].sigla == state) {
        this.citys = this.states[uf].cidades
      }
    }
    this.formularioCliente.patchValue({
      clientCity : null
    })
    this.formularioCliente.get('clientCity').markAsTouched()
  }
  
  setCep(caracter){
    let caracterUnderline = caracter.replace(/_/g, ''); 
    let caracterSubtrair = caracterUnderline.replace(/-/g, ''); 
    let cep = caracterSubtrair
    if(cep.length == 8){
      this.comercioUsuarioService.getCEP(cep).subscribe((cepResponse:any)=>{
        if(cepResponse.cep == caracterUnderline){
           this.formularioCliente.patchValue({
            clientNeighborhood : cepResponse.bairro,
            clientCity : cepResponse.localidade,
            clientStreet : cepResponse.logradouro,
            clientState : cepResponse.uf,
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

  public cliente(){
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      this.authService.getByFOREIGN_KEY("client", res.uid).pipe(takeUntil(this.unsubscribe$)).subscribe((user:[client])=>{
        this.formularioCliente.patchValue({
          FOREIGN_KEY : user[0].FOREIGN_KEY,
          PRIMARY_KEY : user[0].PRIMARY_KEY,
          clientNeighborhood : user[0].clientNeighborhood,
          clientCellPhone : user[0].clientCellPhone,
          clientCity : user[0].clientCity,
          clientEmail : user[0].clientEmail,
          clientImagePath : user[0].clientImagePath,
          clientImageUrl: user[0].clientImageUrl,
          imageDisplay: user[0].clientImageUrl,
          clientBirth : user[0].clientBirth,
          clientName : user[0].clientName,
          clientStreet : user[0].clientStreet,
          clientSex : user[0].clientSex,
          clientLastName : user[0].clientLastName,
          clientTelephone :user[0].clientTelephone,
          clientCEP : user[0].clientCEP,
          clientState : user[0].clientState
        })

        for (const uf in this.states) {
          if (this.states[uf].sigla == user[0].clientState) {
            this.citys = this.states[uf].cidades
          }
        }

        //se nao existir chave
        if(!user[0].PRIMARY_KEY){
          //executa funcao para obeter chave e inserir no formlulario
          this.setIdDocInformularioCliente(res.uid)
        }
      })
    })
  }

  public setIdDocInformularioCliente(FOREIGN_KEY){
    this.comercioUsuarioService.getIdDocByFOREIGN_KEY("client", FOREIGN_KEY).get().pipe(takeUntil(this.unsubscribe$)).subscribe( (res)=> {
      let PRIMARY_KEY = ""
      res.forEach(function (doc) {
        //console.log(doc.id, ' => ', doc.data());
        PRIMARY_KEY = doc.id
      });
      this.formularioCliente.patchValue({
        PRIMARY_KEY : PRIMARY_KEY
      })
    })
  }

  public alterarCadastroCliente(){
    this.markAsTouched()
    if(this.formularioCliente.status === "VALID"){
      this.loading = true
      if(this.formularioCliente.get('imageNew').value === null){
        this.comercioUsuarioService.alterarDadosCliente(this.formularioCliente.get('PRIMARY_KEY').value, this.formularioCliente.value)
        this.loading = false
        this.markAsUntouched()
      }else{
        this.comercioUsuarioService.setImagemStorage(`user/${this.formularioCliente.get('PRIMARY_KEY').value}.jpg`, this.formularioCliente.get('imageNew').value).then((url:any)=>{
          this.formularioCliente.patchValue({
            clientImageUrl : url,
            clientImagePath : `user/${this.formularioCliente.get('PRIMARY_KEY').value}.jpg`
          })
          this.comercioUsuarioService.alterarDadosCliente(this.formularioCliente.get('PRIMARY_KEY').value, this.formularioCliente.value)
          this.loading = false
          this.markAsUntouched()
        })
      }
    }
  }

  public markAsUntouched(){
    this.formularioCliente.get('clientImagePath').markAsUntouched()
    this.formularioCliente.get('clientName').markAsUntouched()
    this.formularioCliente.get('clientLastName').markAsUntouched()
    this.formularioCliente.get('clientEmail').markAsUntouched()
    this.formularioCliente.get('clientBirth').markAsUntouched()
    this.formularioCliente.get('clientSex').markAsUntouched()
    this.formularioCliente.get('clientCity').markAsUntouched()
    this.formularioCliente.get('clientCellPhone').markAsUntouched()
    this.formularioCliente.get('clientNeighborhood').markAsUntouched()
    this.formularioCliente.get('clientStreet').markAsUntouched()
  }

  public markAsTouched(){
    this.formularioCliente.get('clientImagePath').markAsTouched()
    this.formularioCliente.get('clientName').markAsTouched()
    this.formularioCliente.get('clientLastName').markAsTouched()
    this.formularioCliente.get('clientEmail').markAsTouched()
    this.formularioCliente.get('clientBirth').markAsTouched()
    this.formularioCliente.get('clientSex').markAsTouched()
    this.formularioCliente.get('clientCity').markAsTouched()
    this.formularioCliente.get('clientCellPhone').markAsTouched()
    this.formularioCliente.get('clientNeighborhood').markAsTouched()
    this.formularioCliente.get('clientStreet').markAsTouched()
  }

  public uploadFileAtualizar(event: Event){
    this.uploadFile(event, 2)
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
    this.formularioCliente.patchValue({
      imageDisplay:Base64,
      imageNew: blob
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
