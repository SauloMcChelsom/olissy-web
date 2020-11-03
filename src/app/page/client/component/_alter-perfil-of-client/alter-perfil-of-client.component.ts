import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';
import { View } from '../../../../shared/view.shared';
import { ClientService, Client } from '../../../../service/client.service';
import { UserService, User } from '../../../../service/user.service';
import stateCity from "./state-city.type";

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'alter-perfil-of-client',
  templateUrl: './alter-perfil-of-client.component.html',
  styleUrls: ['./alter-perfil-of-client.component.css'],
  
})

export class AlterPerfilOfClientComponent implements OnInit, OnDestroy {


    private unsubscribe$ = new Subject();

    public clientForm: FormGroup = this.createForm(this.clientService.client);

    public stateCity = stateCity;

    private clientImageIconUrl = {
      uploadImage : false
    }

    public active = {
      text: "",
      message: false,
    };
  
    public imageNew: Blob | Uint8Array | ArrayBuffer;
  
    public imageDisplay: any = localStorage.getItem("avatar");
  
    public phoneMask: any = {
      mask: "(00) 0000-0000",
      lazy: false,
    };
  
    public cellPhoneMask: any = {
      mask: "(00) 0 0000-0000",
      lazy: false,
    };
  
    public birth: any = {
      mask: "00/00/0000",
      lazy: false,
    };
  
    public cepMask: any = {
      mask: "00000-000",
      lazy: false,
    };

    constructor(
      private view:View,
      private clientService:ClientService,
      private userService:UserService,
      private fb: FormBuilder
    ){}

    private createForm (client: Client): FormGroup { 
      return this.fb.group (client); 
    }
    
    private updateForm(client: Partial<Client>): void {
      this.clientForm.patchValue(client)
    }
    
    private getForm():Client {
      return this.clientForm.value
    }
      
    public ngOnInit(){
      window.scroll(0,0);
      this.getClient()
    }

    public  getClient(){
      this.clientService.getClientInState().pipe(takeUntil(this.unsubscribe$)).subscribe(c=>{
        this.view.putLoader()
        if(Object.keys(c).length != 0){
          let client:Client = c[0]
          this.convertURLtoFile(client.imageIconUrl)

          if(client.email == ''){
            client.email = this.userService.pullUserInState().email
          }

          if(client.stateFederal == ''){
            client.stateFederal = 'AC'
          }

          if(client.city == ''){
            client.city = 'Acrelândia'
          }

          if(client.country == ''){
            client.country = 'Brazil'
          }

          if(client.sex == ''){
            client.sex = 'male'
          }
          this.updateForm(client)
        } 
      })
    }

    public identifyMyselfAs(sex:String){
        if(sex == 'other'){
            this.clientForm.patchValue({sex:''})
           setTimeout(() => {document.getElementById("identifyMyselfAsSex").focus(),100});
        }

        if(sex == 'removeSexOther'){
            this.clientForm.patchValue({sex:'male'})
        }
    }

    public setCity(value){
        for (const key in stateCity) {
            if (stateCity[key].sigla == value){
                this.clientForm.patchValue({city:stateCity[key].cidades[0]})
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
            this.clientForm.get("cep").markAsTouched();
          } else {
            this.setCep(postal);
          }
        }
      }

    public setCep(postal) {
        this.clientForm.patchValue({
          neighborhood: postal.bairro,
          city: postal.localidade,
          street: postal.logradouro,
          stateFederal: postal.uf,
        });
    
        this.clientForm.get("neighborhood").markAsTouched();
        this.clientForm.get("city").markAsTouched();
        this.clientForm.get("street").markAsTouched();
        this.clientForm.get("stateFederal").markAsTouched();
        this.clientForm.get("cep").markAsTouched();
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
  
      //this.clientForm.get("stateFederal").markAsTouched();
     // this.clientForm.get("city").markAsTouched();
      //this.clientForm.get("cep").markAsTouched();
      //this.clientForm.get("email").markAsTouched();
      this.clientForm.get("name").markAsTouched();
      //this.clientForm.get("neighborhood").markAsTouched();
      //this.clientForm.get("street").markAsTouched();
      //this.clientForm.get("cellPhone").markAsTouched();
      //this.clientForm.get("telephone").markAsTouched();
      //this.clientForm.get("lastName").markAsTouched();
      //this.clientForm.get("birth").markAsTouched();
      this.clientForm.get("sex").markAsTouched();

     /* if (this.clientForm.get("telephone").invalid) {
        this.active.text = "*Telefone";
        this.active.message = true;
      }
  
      if (this.clientForm.get("cellPhone").invalid) {
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

      if (this.clientForm.get("sex").invalid) {
        this.active.text = "*Me identifico como";
        this.active.message = true;
      }

     /* if (this.clientForm.get("birth").invalid) {
        this.active.text = "*Meu Aniversario é";
        this.active.message = true;
      }

      if (this.clientForm.get("lastName").invalid) {
        this.active.text = "*Faltou o seu SOBRENOME";
        this.active.message = true;
      }*/
  
      if (this.clientForm.get("name").invalid) {
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
        console.log(this.clientForm.value);
      }
  
      window.scroll(0, 0);
    }

    public async salve(){

      if(this.clientImageIconUrl.uploadImage){
        if(this.clientForm.get("imageIconPath").value == 'google' || this.clientForm.get("imageIconPath").value == 'email')
        await this.sendImagemStorage()

        await this.putImagemStorage()
      } 

      const client:Client = this.clientForm.value
      await this.clientService.putClientByUidInApi(client)

      this.view.setLoader(false);
    }

    public async putImagemStorage(){
      await this.clientService.putImagemStorageInApi(this.clientForm.get("imageIconPath").value,this.imageNew).then(async (url: any) => {
        this.clientForm.patchValue({ imageIconUrl : await url })
      });
    }

    public async sendImagemStorage(){
      const data = new Date();
      this.clientForm.patchValue({
        imageIconPath: `icon/${data.getFullYear()}${data.getMonth()+1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}.jpg`,
      });
      await this.clientService.sendImagemStorageInApi(this.clientForm.get("imageIconPath").value,this.imageNew).then(async (url: any) => {
        this.clientForm.patchValue({ imageIconUrl : await url })
      });
    }

    public ngOnDestroy(){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}