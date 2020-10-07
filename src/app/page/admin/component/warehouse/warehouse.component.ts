import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

import { Observable } from 'rxjs';
import firebase from '@firebase/app';
import '@firebase/storage';

import { View } from '../../../../shared/view.shared';
import { CompanyService, Company } from '../../../../service/company.service';
import { StoreService } from '../../../../service/store.service';
import { ProductService } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';

import werehouseType  from './werehouse.type'

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

  public companyList: Observable<Company[]> = this.companyService.getCompany()

  public currencyMask : any = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ' '
      }
    }
  };

  public werehouse:Warehouse = this.warehouseService.warehouse

  public company: Company = this.companyService.company

  public werehouseForm: FormGroup = this.createForm(this.werehouse)

  constructor(
    private view:View,
    private companyService:CompanyService,
    private warehouseService:WarehouseService,
    private fb: FormBuilder
  ){}

  private createForm (wh: Warehouse): FormGroup { 
    return this.fb.group (wh); 
  }

  private updateForm(user: Partial<Warehouse>): void {
    this.werehouseForm.patchValue(user)
  }

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
    this.company.name = name
    this.company.nameSearch = this.removeAccent(name.trim())
    this.companyService.getCompanyByName(this.company).subscribe((company)=>{
      if(Object.keys(company).length == 0 ){
        this.companyService.createNewCompanyInApi(this.company)
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

    this.werehouseForm.patchValue({
      imagePath: [nameOfImage],
      nameForSearch: this.removeAccent(this.werehouseForm.get('name').value),
      descriptionForSearch: this.removeAccent(this.werehouseForm.get('description').value),
      andGeneric: this.werehouseForm.get('andGeneric').value ? true : false,
    })

    this.warehouseService.sendImagemStorageInApi(nameOfImage, this.imageNew).then(async (url:any)=>{
      this.werehouseForm.patchValue({
        imageUrl : await url
      })
      
      this.warehouseService.createNewWarehouseInApi(this.werehouse).then(async(creating)=>{
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
