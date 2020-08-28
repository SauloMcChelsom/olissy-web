import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  }  from '@angular/forms';
import { Observable } from 'rxjs';
import firebase from '@firebase/app';
import '@firebase/storage';
import werehouseType  from './werehouse.type'
import { Core, Company } from '../../../../shared/core'
declare var $ :any;

@Component({
  selector: 'warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})

export class WarehouseComponent implements OnInit {

  public werehouseType = werehouseType

  public active:any = {
    screenRegistering:false,
    screenForm:true,
    loading:false,
    message:false,
    text: '',
    log:[]
  }

  public imageNew: Blob | Uint8Array | ArrayBuffer

  public imageDisplay:any = localStorage.getItem('imageDisplay')

  public andGeneric = ['Sim','Não'];

  public companyList: Observable<Company[]> = this.core.companyService().getCompany()

  public currencyMask : any = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ' '
      }
    }
  };

  public werehouseForm: FormGroup = new FormGroup({
    AUTOINCREMENT: new FormControl(null),
    DATE: new FormControl(null),
    PRIMARY_KEY: new FormControl(null),
    imageUrl: new FormControl([]),
    imagePath: new FormControl([]),
    price: new FormControl(0),
    name: new FormControl(null),
    description: new FormControl(null),
    session: new FormControl(null),
    category: new FormControl(null),
    type: new FormControl(null),
    nameForSearch: new FormControl(null),
    descriptionForSearch: new FormControl(null),
    andGeneric: new FormControl(null),
    company: new FormControl(null),
  })

  constructor(
    private core:Core
  ){}

  public ngOnInit() {
    this.setImageDisplay()
    this.startEditorOfDescription()
  }

  private async setImageDisplay(){
    if(!localStorage.getItem('imageDisplay')){
      await firebase.storage().ref('plataform/product.png').getDownloadURL().then(url => localStorage.setItem('imageDisplay', url) )
    }
    this.imageDisplay = localStorage.getItem('imageDisplay')
  }

  public createNewCompany(name){
    this.core.company.name = name
    this.core.company.nameSearch = this.removeAccent(name.trim())
    this.core.companyService().getCompanyByName(this.core.company).subscribe((company)=>{
      if(Object.keys(company).length == 0 ){
        this.core.companyService().createNewCompanyInApi(this.core.company)
      }
    })
  }

  public createNewItemInWerehouse(){
    this.active = {
      screenRegistering:true,
      loading:true,
      screenForm:false,
      message:false,
      text: '',
      log:''
    }
    const data = new Date()
    const nameOfImage = `werehouse/${data.getFullYear()}${data.getMonth()+1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}.jpg`

    this.werehouseForm.get('name').markAsTouched()
    this.werehouseForm.get('description').markAsTouched()
    this.werehouseForm.get('price').markAsTouched()

    this.core.warehouse = {
      AUTOINCREMENT: '',
      DATE: '',
      PRIMARY_KEY: '',
      imageUrl: [this.werehouseForm.get('imageUrl').value],
      imagePath: [nameOfImage],
      price: this.werehouseForm.get('price').value,
      name: this.werehouseForm.get('name').value,
      description: this.werehouseForm.get('description').value,
      session: this.werehouseForm.get('session').value,
      category: this.werehouseForm.get('category').value,
      type: this.werehouseForm.get('type').value,
      nameForSearch: this.removeAccent(this.werehouseForm.get('name').value),
      descriptionForSearch: this.removeAccent(this.werehouseForm.get('description').value),
      andGeneric: this.werehouseForm.get('andGeneric').value ? true : false,
      company: this.werehouseForm.get('company').value,
    }

    this.core.warehouseService().sendImagemStorageInApi(nameOfImage, this.imageNew).then(async (url:any)=>{

      this.core.warehouse.imageUrl[0] = await url
      
      this.core.warehouseService().createNewWarehouseInApi(this.core.warehouse).then(async(creating)=>{
        await creating
        this.werehouseForm.reset()
        this.setImageDisplay()
        this.active = {
          screenRegistering:true,
          screenForm:false,
          loading:false,
          message:true,
          text: 'Produto criado com sucesso',
          log:creating
        }
      })
    })
  }

  public removeAccent(text){
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;
  }

  public startEditorOfDescription(){
    $(function () {
      $('.textarea').wysihtml5()
    })
  }

  public setEditDescription(DescricaoProduto){
    this.werehouseForm.patchValue({
      description: DescricaoProduto
    })
  }

  public comeBack(){
    this.active = {
      screenRegistering:false,
      screenForm:true,
      loading:false,
      message:false,
      text: '',
      log:''
    }  
  }

  public uploadImage(event: Event){
    var file = (<HTMLInputElement>event.target).files[0]
    if ((<HTMLInputElement>event.target).files[0] && (<HTMLInputElement>event.target)) {
      var reader = new FileReader();
      reader.onload = ()=> {
        this.imageDisplay = reader.result
        this.imageNew = file
      }
      reader.readAsDataURL((<HTMLInputElement>event.target).files[0])
    }
  }
}
