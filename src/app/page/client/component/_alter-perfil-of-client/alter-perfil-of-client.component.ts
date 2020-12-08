import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
//import { FormGroup, FormBuilder, FormControl, FormArray }  from '@angular/forms';
import { View } from '../../../../shared/view.shared';
import { ClientService, Client } from '../../../../service/client.service';
import { UserService } from '../../../../service/user.service';
import stateCity from "./state-city.type";

import { Subject } from 'rxjs';
//import { map } from 'rxjs/operators';
//import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators'

import IMask from 'imask';
import { DateFormat }  from '../../../../shared/dateformater.shared';

@Component({
  selector: 'alter-perfil-of-client',
  templateUrl: './alter-perfil-of-client.component.html',
  styleUrls: ['./alter-perfil-of-client.component.css']
})

export class AlterPerfilOfClientComponent implements OnInit, OnDestroy {


    private unsubscribe$ = new Subject();

    public clientForm: FormGroup = this.createForm(this.clientService.client, this.userService.user);

    public stateCity = stateCity;

    private clientImageIconUrl = {
      uploadImage : false
    }

    public active = {
      text: "",
      message: false,
    };
  
    public imageNew: Blob | Uint8Array | ArrayBuffer;
  
    public imageDisplay: any = 'assets/img/avatar.png'
  
    public phoneMask: any = {
      mask: "(00) 0000-0000",
      lazy: false,
    };
  
    public cellphoneMask: any = {
      mask: "(00) 0 0000-0000",
      lazy: false,
    };
  
    public birth: any = {
      mask: Date,
      lazy: false,
      overwrite: true,
      autofix: true,
      blocks: {
        d: {mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2},
        m: {mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2},
        Y: {mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: 2999, maxLength: 4}
      }
    };
  
    public cepMask: any = {
      mask: "00000-000",
      lazy: false,
    };

    constructor( 
      private view: View,
      private clientService: ClientService,
      private userService: UserService,
      //private fb: FormBuilder,
      private dateFormat:DateFormat
    ){}

    private createForm (client, user): FormGroup { 
      var userGroup = {};
      var clientGroup = {};

      for (const key in client) {
        clientGroup[key] = new FormControl(client[key]);
      }

      for (const key in user) {
        userGroup[key] = new FormControl(user[key]);
      }
    
      return new FormGroup({
        user: new FormGroup(userGroup),
        client: new FormGroup(clientGroup),
      });
    }

    public addForm(){
      this.userService.getUserInState().pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{
        if(Object.keys(res).length >= 1){
          this.clientForm.patchValue({user: res[0] })
        }
     })

     this.clientService.getClientInState().pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{

        if(Object.keys(res).length >= 1){
          
          let client:Client = res[0]

          this.convertURLtoFile(client.image_icon_url)

          if(client.state_federal == null || client.state_federal == ''){
            client.state_federal = 'AC'
          }

          if(client.city == null || client.city == ''){
            client.city = 'Acrelândia'
          }

          if(client.country == null || client.country == ''){
            client.country = 'Brazil'
          }

          if(client.sex == null || client.sex == ''){
            client.sex = 'male'
          }

          if(client.birth != null || client.birth != ''){
            client.birth = this.dateFormat.to_ptBR(client.birth)
          }

          this.clientForm.patchValue({client: client })
          this.view.setLoader(false)
        }
      })
    }
    
    private getForm() {
      return this.clientForm.value
    }
      
    public ngOnInit(){
      window.scroll(0,0);
      this.addForm()
    }

    public identifyMyselfAs(sex:String){
      if(sex == 'other'){
        this.clientForm.patchValue({client:{sex:''}})
        setTimeout(() => {document.getElementById("identifyMyselfAsSex").focus(),100});
      }

      if(sex == 'removeSexOther'){
        this.clientForm.patchValue({client:{sex:'male'}})
      }
    }

    public setCity(value){
      for (const key in stateCity) {
        if (stateCity[key].sigla == value){
          this.clientForm.patchValue({client:{city:stateCity[key].cidades[0]}})
        }
      }
    }

    public async validateCep(caracter) {
      let caracterUnderline = caracter.replace(/_/g, "");
      let caracterSubtrair = caracterUnderline.replace(/-/g, "");
      let cep = caracterSubtrair;
      if (cep.length == 8) {
        const postal = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => resp.json());
  
        if (postal.erro) {
          this.clientForm.get("client").get("cep").markAsTouched();
        } else {
          this.setCep(postal);
        }
      }
    }

    public setCep(postal) {
      this.clientForm.patchValue({client:{
        neighborhood: postal.bairro,
        city: postal.localidade,
        street: postal.logradouro,
        state_federal: postal.uf,
      }})
  
      this.clientForm.get("client").get("neighborhood").markAsTouched();
      this.clientForm.get("client").get("city").markAsTouched();
      this.clientForm.get("client").get("street").markAsTouched();
      this.clientForm.get("client").get("state_federal").markAsTouched();
      this.clientForm.get("client").get("cep").markAsTouched();
    }

    public uploadImage(event: Event) {
      var file = (<HTMLInputElement>event.target).files[0];
      if ((<HTMLInputElement>event.target).files[0] && <HTMLInputElement>event.target) {
        var reader = new FileReader();
        reader.onload = () => {
          this.imageDisplay = reader.result;
          this.imageNew = file;
          this.clientImageIconUrl.uploadImage = true
        };
        reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
      }
    }

    public async convertURLtoFile(url){
      let response = await fetch(url);
      let data = await response.blob();

      let metadata = {
        type: 'image/jpeg'
      };

      const time = new Date();
      let file = new File([data], `${time.getFullYear()}${time.getMonth()+1}${time.getDate()}${time.getHours()}${time.getMinutes()}${time.getSeconds()}${time.getMilliseconds()}.jpg`, metadata);

      var reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result;
        this.imageNew = file;
      };
      reader.readAsDataURL(file);
    }

    public validateForm() {
      this.active.message = false;
  
      //this.clientForm.get("state_federal").markAsTouched();
     // this.clientForm.get("city").markAsTouched();
      //this.clientForm.get("cep").markAsTouched();
      //this.clientForm.get("email").markAsTouched();
      this.clientForm.get("client").get("name").markAsTouched();
      //this.clientForm.get("neighborhood").markAsTouched();
      //this.clientForm.get("street").markAsTouched();
      //this.clientForm.get("cellphone").markAsTouched();
      //this.clientForm.get("telephone").markAsTouched();
      //this.clientForm.get("last_name").markAsTouched();
      //this.clientForm.get("birth").markAsTouched();
      this.clientForm.get("client").get("sex").markAsTouched();

     /* if (this.clientForm.get("telephone").invalid) {
        this.active.text = "*Telefone";
        this.active.message = true;
      }
  
      if (this.clientForm.get("cellphone").invalid) {
        this.active.text = "*Celular";
        this.active.message = true;
      }
  
      if (this.clientForm.get("street").invalid) {
        this.active.text = "*Rua";
        this.active.message = true;
      }
  
      if (this.clientForm.get("neighborhood").invalid) {
        this.active.text = "*Bairro";
        this.active.message = true;
      }*/

      if (this.clientForm.get("client").get("sex").invalid) {
        this.active.text = "*Me identifico como";
        this.active.message = true;
      }

     /* if (this.clientForm.get("birth").invalid) {
        this.active.text = "*Meu Aniversario é";
        this.active.message = true;
      }

      if (this.clientForm.get("last_name").invalid) {
        this.active.text = "*Faltou o seu SOBRENOME";
        this.active.message = true;
      }*/
  
      if (this.clientForm.get("client").get("name").invalid) {
        this.active.text = "*Qual o seu nome?";
        this.active.message = true;
      }
  
      if (!this.imageNew) {
        //this.active.text = "Adicione uma imagem";
        //this.active.message = true;
      }
  
      if (this.clientForm.valid && this.imageNew) {
        this.view.setLoader(true);
        this.salve()
       //console.log(this.clientForm.value);
      }
  
      window.scroll(0, 0);
    }

    public async salve(){
      /*
      if(this.clientImageIconUrl.uploadImage){
        if(this.clientForm.get("client").get("image_icon_path").value == 'google' || this.clientForm.get("client").get("image_icon_path").value == 'email')
        await this.sendImagemStorage()

        await this.putImagemStorage()
      } 
      */
      const client:Client = this.clientForm.get("client")  .value
      await this.clientService.putClientByUidInApi(client)

      this.view.setLoader(false);
    }

    public async putImagemStorage(){
      await this.clientService.putImagemStorageInApi(this.clientForm.get("client").get("image_icon_path").value,this.imageNew).then(async (url: any) => {
        this.clientForm.patchValue({client:{ image_icon_url : await url }})
      });
    }

    public async sendImagemStorage(){
      const data = new Date();
      this.clientForm.patchValue({client:{
        image_icon_path: `icon/${data.getFullYear()}${data.getMonth()+1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}.jpg`,
      }})
      await this.clientService.sendImagemStorageInApi(this.clientForm.get("client").get("image_icon_path").value,this.imageNew).then(async (url: any) => {
        this.clientForm.patchValue({client:{ image_icon_url : await url }})
      })
    }

    public ngOnDestroy(){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}