import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import firebase from "@firebase/app";
import "@firebase/storage";
import stateCity from "./state-city.type";

import { View } from "../../../../shared/view.shared";
import { UserService } from "../../../../service/user.service";
import { StoreService } from "../../../../service/store.service";
declare var $: any;

@Component({
  selector: "app-open-my-store",
  templateUrl: "./open-my-store.component.html",
  styleUrls: ["./open-my-store.component.css"],
})
export class OpenMyStoreComponent implements OnInit {
  public stateCity = stateCity;

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
      value: "negotiateRateLivery",
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

  public storeForm: FormGroup = new FormGroup({
    AUTOINCREMENT: new FormControl(""),
    DATE: new FormControl(""),
    PRIMARY_KEY: new FormControl(""),
    FOREIGN_KEY_USER: new FormControl(""),
    name: new FormControl(null),
    imageIconPath: new FormControl(""),
    imageIconUrl: new FormControl(null),
    imageBackGroundPath: new FormControl("/plataform/wallpaper.jpg"),
    imageBackGroundUrl: new FormControl("https://firebasestorage.googleapis.com/v0/b/olissy-web-test.appspot.com/o/plataform%2Fwallpaper.jpg?alt=media&token=828ad8dd-dc7c-41de-9c31-3378a8e8ecee"),
    country: new FormControl("Brazil"),
    stateFederal: new FormControl("AC"),
    city: new FormControl("Acrelândia"),
    neighborhood: new FormControl(null),
    street: new FormControl(null),
    cep: new FormControl(null),
    hoursOfWork: new FormControl(null),
    email: new FormControl(null),
    cellPhone: new FormControl(null),
    telephone: new FormControl(null),
    about: new FormControl(null),
    cnpj: new FormControl(null),
    quantityOfProduct: new FormControl(0),
    follow: new FormControl(0),
    storeOpenOrClosed: new FormControl(false),
    totalOfSale: new FormControl(0),
    authorizationForOpenStore: new FormControl(true),
    credit: new FormControl(null),
    debit: new FormControl(null),
    money: new FormControl(null),
    negotiateRateLivery: new FormControl({ status: false }),
    onlyInNeighborhood: new FormControl({ status: false }),
    deliveryFreeAbove: new FormControl({ status: false, taxa: 0, km: 0 }),
    deliveryBy: new FormControl({ status: false, taxa: 0 }),
  });

  constructor(
    private view: View,
    private userService: UserService,
    private storeService: StoreService
  ) {}

  public ngOnInit() {
    window.scroll(0, 0);
    this.storeForm.patchValue({
      email: this.userService.pullUserInState().email,
      FOREIGN_KEY_USER: this.userService.pullUserInState().PRIMARY_KEY,
    });
    this.setImageDisplay();
  }

  private async setImageDisplay() {
    if (!localStorage.getItem("avatar")) {
      await firebase
        .storage()
        .ref("plataform/avatar.png")
        .getDownloadURL()
        .then((url) => localStorage.setItem("avatar", url));
    }
    this.imageDisplay = localStorage.getItem("avatar");
  }

  onCheckChange(event) {
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
        !this.storeForm.get("negotiateRateLivery").value.status &&
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
        !this.storeForm.get("negotiateRateLivery").value.status &&
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
        !this.storeForm.get("negotiateRateLivery").value.status &&
        !this.storeForm.get("onlyInNeighborhood").value.status &&
        !this.storeForm.get("deliveryFreeAbove").value.status &&
        !this.storeForm.get("deliveryBy").value.status
      ) {
        this.taxaDeliveryStatus = false;
      }
    }
  }

  public setTaxaDelivery(event) {
    if (event.target.value == "negotiateRateLivery") {
      this.storeForm.patchValue({
        negotiateRateLivery: { status: event.target.checked },
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
      this.storeForm.get("negotiateRateLivery").value.status ||
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

  public uploadImage(event: Event) {
    var file = (<HTMLInputElement>event.target).files[0];
    if (
      (<HTMLInputElement>event.target).files[0] &&
      <HTMLInputElement>event.target
    ) {
      var reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result;
        this.imageNew = file;
      };
      reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
    }
  }

  public validateForm() {
    this.active.message = false;

    const data = new Date();

    this.storeForm.patchValue({
      imageIconPath: `icon/${data.getFullYear()}${
        data.getMonth() + 1
      }${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}.jpg`,
    });

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
    this.storeForm.get("negotiateRateLivery").markAsTouched();
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
      this.formTypeStore();
    }

    window.scroll(0, 0);
    console.log(this.storeForm.value);
  }

  public formTypeStore() {
    this.storeService.store = {
      AUTOINCREMENT: this.storeForm.get("AUTOINCREMENT").value,
      DATE: this.storeForm.get("DATE").value,
      FOREIGN_KEY_USER: this.storeForm.get("FOREIGN_KEY_USER").value,
      PRIMARY_KEY: this.storeForm.get("PRIMARY_KEY").value,
      about: this.storeForm.get("about").value,
      authorizationForOpenStore: this.storeForm.get("authorizationForOpenStore").value,
      cellPhone: this.storeForm.get("cellPhone").value,
      cep: this.storeForm.get("cep").value,
      city: this.storeForm.get("city").value,
      cnpj: this.storeForm.get("cnpj").value,
      country: this.storeForm.get("country").value,
      credit: this.storeForm.get("credit").value,
      debit: this.storeForm.get("debit").value,
      deliveryBy: this.storeForm.get("deliveryBy").value,
      deliveryFreeAbove: this.storeForm.get("deliveryFreeAbove").value,
      email: this.storeForm.get("email").value,
      follow: this.storeForm.get("follow").value,
      hoursOfWork: this.storeForm.get("hoursOfWork").value,
      imageBackGroundPath: this.storeForm.get("imageBackGroundPath").value,
      imageBackGroundUrl: this.storeForm.get("imageBackGroundUrl").value,
      imageIconPath: this.storeForm.get("imageIconPath").value,
      imageIconUrl: this.storeForm.get("imageIconUrl").value,
      money: this.storeForm.get("money").value,
      name: this.storeForm.get("name").value,
      negotiateRateLivery: this.storeForm.get("negotiateRateLivery").value,
      neighborhood: this.storeForm.get("neighborhood").value,
      onlyInNeighborhood: this.storeForm.get("onlyInNeighborhood").value,
      quantityOfProduct: this.storeForm.get("quantityOfProduct").value,
      stateFederal: this.storeForm.get("stateFederal").value,
      storeOpenOrClosed: this.storeForm.get("storeOpenOrClosed").value,
      street: this.storeForm.get("street").value,
      telephone: this.storeForm.get("telephone").value,
      totalOfSale: this.storeForm.get("totalOfSale").value,
    };
    this.createNewStore();
  }

  createNewStore() {
    this.storeService
      .sendImagemStorageInApi(
        this.storeForm.get("imageIconPath").value,
        this.imageNew
      )
      .then(async (url: any) => {
        this.storeService.store.imageIconUrl = await url;

        this.storeService
          .createNewStoreInApi(this.storeService.store)
          .then((store: any) => {
            this.userService.user.type = 2;
            this.userService
              .putUserByUidInApi(this.userService.user)
              .then((user: any) => {
                this.view.setUser("store");
                this.view.redirectPageFor("/home-store");
              });
          });
      });
  }
}