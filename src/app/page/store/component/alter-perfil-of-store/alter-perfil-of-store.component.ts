import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder }  from '@angular/forms';

import stateCity from "./state-city.type";

import { View } from "../../../../shared/view.shared";
import { UserService, User } from "../../../../service/user.service";
import { StoreService, Store } from "../../../../service/store.service";

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: "app-alter-perfil-of-store",
  templateUrl: "./alter-perfil-of-store.component.html",
  styleUrls: ["./alter-perfil-of-store.component.css"],
})
export class AlterPerfilOfStoreComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public stateCity = stateCity; 

  public active = {
    text: "",
    message: false,
  };

  public loading:boolean = true

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

  public cnpjMask: any = {
    mask: "00.000.000/0000-00",
    lazy: false,
  };

  public cepMask: any = {
    mask: "00000-000",
    lazy: false,
  };

  public checkPayment = [
    { description: "Dinheiro", value: "money", checked: false },
    { description: "Débito", value: "debit", checked: false },
    { description: "Crédito", value: "credit", checked: false },
  ];

  public TaxaDelivery = [
    {
      description: "Negociar taxa de entrega",
      rule: false,
      value: "negotiateRateDelivery",
      checked: false,
    },
    {
      description: "Entrega somente no bairro (Grátis)",
      rule: false,
      value: "onlyInNeighborhood",
      checked: false,
    },
    {
      description: "Entrega grátis acima de R$0.00 por 0/km",
      taxa: 0.0,
      km: 0,
      rule: true,
      value: "deliveryFreeAbove",
      checked: false,
    },
    {
      description: "Entrega por R$0.00/KM",
      taxa: 0.0,
      rule: true,
      value: "deliveryBy",
      checked: false,
    },
  ];

  public checkPaymentStatus: any = "clean";

  public taxaDeliveryStatus: any = "clean";

  private clientImageIconUrl = {
    uploadImage : false
  }

  public storeForm: FormGroup = this.createForm(this.storeService.store)

  constructor(
    private view: View,
    private userService: UserService,
    private storeService: StoreService,
    private fb: FormBuilder
  ) {}

  private createForm (store: Store): FormGroup { 
    return this.fb.group(store); 
  }

  private getForm():Store {
    return this.storeForm.value
  }

  private updateForm(store: Partial<Store>): void {
    this.storeForm.patchValue(store)
  }

  public ngOnInit() {
    this.view.setLoader(false)
    window.scroll(0, 0);
    this.getStore()
  }

  public getStore(){
    this.storeService.getStoreInState().pipe(takeUntil(this.unsubscribe$)).subscribe((store)=>{
      if(Object.keys(store).length != 0){
        let stores:Store = store[0]
        this.convertURLtoFile(stores.imageIconUrl)
        this.storeForm.patchValue(stores)

        if(stores.money){
          this.checkPayment[0].checked = stores.money
          this.onCheckChange({target:{value:'money', checked:true}})
          this.checkPaymentStatus = true
        }

        if(stores.debit){
          this.checkPayment[1].checked = stores.debit
          this.onCheckChange({target:{value:'debit', checked:true}})
          this.checkPaymentStatus = true
        }

        if(stores.credit){
          this.checkPayment[2].checked = stores.credit
          this.onCheckChange({target:{value:'credit', checked:true}})
          this.checkPaymentStatus = true
        }

        this.TaxaDelivery[0].checked = stores.negotiateRateDelivery.status
        this.TaxaDelivery[1].checked = stores.onlyInNeighborhood.status
        this.TaxaDelivery[2].checked = stores.deliveryFreeAbove.status
        this.TaxaDelivery[3].checked = stores.deliveryBy.status

        this.setTaxaDeliveryAboveKmValue(stores.deliveryFreeAbove.km) 
        this.setTaxaDeliveryAbobeTaxa(stores.deliveryFreeAbove.taxa) 
        this.setTaxaDeliveryByKmValue(stores.deliveryBy.taxa) 

        this.loading = false
      }
    })
  }

  public onCheckChange(event) {
    if (event.target.value == "money") {
      this.storeForm.patchValue({
        money: event.target.checked,
      });
    }

    if (event.target.value == "debit") {
      this.storeForm.patchValue({
        debit: event.target.checked,
      });
    }

    if (event.target.value == "credit") {
      this.storeForm.patchValue({
        credit: event.target.checked,
      });
    }

    if (
      this.storeForm.get("money").value ||
      this.storeForm.get("debit").value ||
      this.storeForm.get("credit").value
    ) {
      this.checkPaymentStatus = true;
    } else {
      this.checkPaymentStatus = false;
    }
  }

  public setTaxaDeliveryAboveKmValue(value) {
    if (parseFloat(value) > 0) {
      let text = `Entrega grátis acima de R$${this.TaxaDelivery[2].taxa} por ${value}/km`;
      this.TaxaDelivery[2].description = text;
      this.TaxaDelivery[2].km = parseFloat(value);
      this.storeForm.patchValue({
        deliveryFreeAbove: {
          status: false,
          taxa: this.TaxaDelivery[2].taxa,
          km: this.TaxaDelivery[2].km,
        },
      });
      if (
        this.storeForm.get("deliveryFreeAbove").value.taxa > 0 &&
        this.storeForm.get("deliveryFreeAbove").value.km > 0
      ) {
        this.taxaDeliveryStatus = true;
        $("#deliveryFreeAbove").prop("checked", true);
        this.storeForm.patchValue({
          deliveryFreeAbove: {
            status: true,
            taxa: this.TaxaDelivery[2].taxa,
            km: this.TaxaDelivery[2].km,
          },
        });
      }
    } else {
      $("#deliveryFreeAbove").prop("checked", false);
      let text = `Entrega grátis acima de R$${this.TaxaDelivery[2].taxa} por 0/km`;
      this.TaxaDelivery[2].description = text;
      this.TaxaDelivery[2].km = 0;
      this.storeForm.patchValue({
        deliveryFreeAbove: {
          status: false,
          taxa: this.TaxaDelivery[2].taxa,
          km: 0,
        },
      });
      if (
        !this.storeForm.get("negotiateRateDelivery").value.status &&
        !this.storeForm.get("onlyInNeighborhood").value.status &&
        !this.storeForm.get("deliveryFreeAbove").value.status &&
        !this.storeForm.get("deliveryBy").value.status
      ) {
        this.taxaDeliveryStatus = false;
      }
    }
  }

  public setTaxaDeliveryAbobeTaxa(value) {
    if (parseFloat(value) > 0) {
      let text = `Entrega grátis acima de R$${value} por ${this.TaxaDelivery[2].km}/km`;
      this.TaxaDelivery[2].description = text;
      this.TaxaDelivery[2].taxa = parseFloat(value);
      this.storeForm.patchValue({
        deliveryFreeAbove: {
          status: false,
          taxa: this.TaxaDelivery[2].taxa,
          km: this.TaxaDelivery[2].km,
        },
      });
      if (
        this.storeForm.get("deliveryFreeAbove").value.taxa > 0 &&
        this.storeForm.get("deliveryFreeAbove").value.km > 0
      ) {
        this.taxaDeliveryStatus = true;
        $("#deliveryFreeAbove").prop("checked", true);
        this.storeForm.patchValue({
          deliveryFreeAbove: {
            status: true,
            taxa: this.TaxaDelivery[2].taxa,
            km: this.TaxaDelivery[2].km,
          },
        });
      }
    } else {
      $("#deliveryFreeAbove").prop("checked", false);
      let text = `Entrega grátis acima de R$0 por ${this.TaxaDelivery[2].km}/km`;
      this.TaxaDelivery[2].description = text;
      this.TaxaDelivery[2].taxa = 0;
      this.storeForm.patchValue({
        deliveryFreeAbove: {
          status: false,
          taxa: 0,
          km: this.TaxaDelivery[2].km,
        },
      });
      if (
        !this.storeForm.get("negotiateRateDelivery").value.status &&
        !this.storeForm.get("onlyInNeighborhood").value.status &&
        !this.storeForm.get("deliveryFreeAbove").value.status &&
        !this.storeForm.get("deliveryBy").value.status
      ) {
        this.taxaDeliveryStatus = false;
      }
    }
  }

  public setTaxaDeliveryByKmValue(value) {
    if (parseFloat(value) > 0) {
      $("#deliveryBy").prop("checked", true);
      this.taxaDeliveryStatus = true;
      let text = `Entrega por R$${value}/KM`;
      this.TaxaDelivery[3].description = text;
      this.TaxaDelivery[3].taxa = parseFloat(value);
      this.storeForm.patchValue({
        deliveryBy: { status: true, taxa: this.TaxaDelivery[3].taxa },
      });
    } else {
      $("#deliveryBy").prop("checked", false);
      let text = `Entrega por R$0/KM`;
      this.TaxaDelivery[3].description = text;
      this.TaxaDelivery[3].taxa = 0;
      this.storeForm.patchValue({
        deliveryBy: { status: false, taxa: 0 },
      });
      if (
        !this.storeForm.get("negotiateRateDelivery").value.status &&
        !this.storeForm.get("onlyInNeighborhood").value.status &&
        !this.storeForm.get("deliveryFreeAbove").value.status &&
        !this.storeForm.get("deliveryBy").value.status
      ) {
        this.taxaDeliveryStatus = false;
      }
    }
  }
 
  public setTaxaDelivery(event) {

    if (event.target.value == "negotiateRateDelivery") {
      this.storeForm.patchValue({
        negotiateRateDelivery: { status: event.target.checked },
      });
    }

    if (event.target.value == "onlyInNeighborhood") {
      this.storeForm.patchValue({
        onlyInNeighborhood: { status: event.target.checked },
      });
    }

    if (
      event.target.value == "deliveryFreeAbove" &&
      this.TaxaDelivery[2].taxa <= 0 &&
      this.TaxaDelivery[2].km <= 0
    ) {
      $("#deliveryFreeAbove").prop("checked", false);
    } else {
      if (event.target.value == "deliveryFreeAbove") {
        $("#deliveryFreeAbove").prop("checked", true);
      }
    }
    
    if (event.target.value == "deliveryBy" && this.TaxaDelivery[3].taxa <= 0) {
      $("#deliveryBy").prop("checked", false);
    } else {
      if (event.target.value == "deliveryBy") {
        $("#deliveryBy").prop("checked", true);
      }
    }

    if (
      this.storeForm.get("negotiateRateDelivery").value.status ||
      this.storeForm.get("onlyInNeighborhood").value.status ||
      this.storeForm.get("deliveryFreeAbove").value.status ||
      this.storeForm.get("deliveryBy").value.status
    ) {
      this.taxaDeliveryStatus = true;
    } else {
      this.taxaDeliveryStatus = false;
    }
  }

  public async validateCep(caracter) {
    let caracterUnderline = caracter.replace(/_/g, "");
    let caracterSubtrair = caracterUnderline.replace(/-/g, "");
    let cep = caracterSubtrair;
    if (cep.length == 8) {
      const postal = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => resp.json());

      if (postal.erro) {
        this.storeForm.get("cep").markAsTouched();
      } else {
        this.setCep(postal);
      }
    }
  }

  public setCep(postal) {
    this.storeForm.patchValue({
      neighborhood: postal.bairro,
      city: postal.localidade,
      street: postal.logradouro,
      stateFederal: postal.uf,
    });

    this.storeForm.get("neighborhood").markAsTouched();
    this.storeForm.get("city").markAsTouched();
    this.storeForm.get("street").markAsTouched();
    this.storeForm.get("stateFederal").markAsTouched();
    this.storeForm.get("cep").markAsTouched();
  }

  public setCity(value){
    for (const key in stateCity) {
        if (stateCity[key].sigla == value){
            this.storeForm.patchValue({city:stateCity[key].cidades[0]})
        }
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

  public validateForm() {
    this.active.message = false;

    if (this.checkPaymentStatus == "clean") {
      this.checkPaymentStatus = false;
    }

    if (this.taxaDeliveryStatus == "clean") {
      this.taxaDeliveryStatus = false;
    }

    this.storeForm.get("stateFederal").markAsTouched();
    this.storeForm.get("city").markAsTouched();
    this.storeForm.get("cep").markAsTouched();
    this.storeForm.get("email").markAsTouched();
    this.storeForm.get("name").markAsTouched();
    this.storeForm.get("neighborhood").markAsTouched();
    this.storeForm.get("street").markAsTouched();
    this.storeForm.get("hoursOfWork").markAsTouched();
    this.storeForm.get("cellPhone").markAsTouched();
    this.storeForm.get("telephone").markAsTouched();
    this.storeForm.get("about").markAsTouched();
    this.storeForm.get("cnpj").markAsTouched();
    this.storeForm.get("credit").markAsTouched();
    this.storeForm.get("debit").markAsTouched();
    this.storeForm.get("money").markAsTouched();
    this.storeForm.get("negotiateRateDelivery").markAsTouched();
    this.storeForm.get("onlyInNeighborhood").markAsTouched();
    this.storeForm.get("deliveryFreeAbove").markAsTouched();
    this.storeForm.get("deliveryBy").markAsTouched();

    if (this.storeForm.get("telephone").invalid) {
      this.active.text = "*Telefone";
      this.active.message = true;
    }

    if (this.storeForm.get("cellPhone").invalid) {
      this.active.text = "*Celular";
      this.active.message = true;
    }

    if (this.storeForm.get("street").invalid) {
      this.active.text = "*Rua";
      this.active.message = true;
    }

    if (this.storeForm.get("neighborhood").invalid) {
      this.active.text = "*Bairro";
      this.active.message = true;
    }

    if (this.taxaDeliveryStatus == false) {
      this.active.text = "*Taxa de Entrega";
      this.active.message = true;
    }

    if (this.checkPaymentStatus == false) {
      this.active.text = "*Forma de Pagamentos";
      this.active.message = true;
    }

    if (this.storeForm.get("about").invalid) {
      this.active.text = "*Sobre sua farmacia";
      this.active.message = true;
    }

    if (this.storeForm.get("hoursOfWork").invalid) {
      this.active.text = "*Horário de funcionamento";
      this.active.message = true;
    }

    if (this.storeForm.get("name").invalid) {
      this.active.text = "*Nome da Farmacia";
      this.active.message = true;
    }

    if (this.storeForm.get("cnpj").invalid) {
      this.active.text = "*CNPJ";
      this.active.message = true;
    }

    if (!this.imageNew) {
      this.active.text = "Insira o logo da farmacia";
      this.active.message = true;
    }

    if (
      this.storeForm.valid &&
      this.taxaDeliveryStatus &&
      this.checkPaymentStatus &&
      this.imageNew
    ) {
      this.view.setLoader(true);
      this.salve();
    }

    window.scroll(0, 0);
    console.log(this.storeForm.value);
  }

  public async salve(){
    if(this.clientImageIconUrl.uploadImage){
      if(this.storeForm.get("imageIconPath").value == 'google' || this.storeForm.get("imageIconPath").value == 'email')
      await this.sendImagemStorage()

      await this.putImagemStorage()
    } 

    const store:Store = this.storeForm.value
    await this.storeService.putStoreByUidInApi(store)
    this.storeService.setStoreInState(store)

    this.view.setLoader(false);
  }

  public async putImagemStorage(){
    await this.storeService.putImagemStorageInApi(this.storeForm.get("imageIconPath").value,this.imageNew).then(async (url: any) => {
      this.storeForm.patchValue({ imageIconUrl : await url })
    });
  }

  public async sendImagemStorage(){
    const data = new Date();
    this.storeForm.patchValue({
      imageIconPath: `icon/${data.getFullYear()}${data.getMonth()+1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}.jpg`,
    });
    await this.storeService.sendImagemStorageInApi(this.storeForm.get("imageIconPath").value,this.imageNew).then(async (url: any) => {
      this.storeForm.patchValue({ imageIconUrl : await url })
    });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}