import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Subject, Observable } from 'rxjs';

import { View } from '../../../../shared/view.shared';
import { UserService } from "../../../../service/user.service";
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';
import { async } from 'rxjs/internal/scheduler/async';

declare var $ :any;

@Component({
  selector: 'mt-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit {

  public warehouses = []

  public active = {
    text: "",
    message: false,
    loading:false
  };

  public selectedProduct:Warehouse = null

  public currencyMask : any = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ' '
      }
    }
  };

  public productForm: FormGroup = new FormGroup({
    AUTOINCREMENT: new FormControl(null),
    DATE: new FormControl(null),
    PRIMARY_KEY: new FormControl(null),
    FOREIGN_KEY_USER:new FormControl(null),
    FOREIGN_KEY_WAREHOUSE: new FormControl(null),
    FOREIGN_KEY_STORE: new FormControl(null),
    price: new FormControl(null),
    productForSale: new FormControl('false'),
    quantities: new FormControl(0),
    totalOfLove: new FormControl(0),
    totalOfSale:new FormControl(0),
    totalOfComment: new FormControl(0)
  })

  constructor(
    private view:View,
    private userService: UserService,
    private clientService:ClientService,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
  ){}

  public ngOnInit() {
    this.view.putLoader()
    this.warehouseService.getWarehouseByIndexInApi().subscribe((warehouse:any[])=>{
  
      for (const key in warehouse) {
        this.productService.product.FOREIGN_KEY_WAREHOUSE = warehouse[key].PRIMARY_KEY
        this.productService.getProductByForeignKeyWarehouseInApi(this.productService.product).subscribe((p)=>{
          if(Object.keys(p).length == 0 ){
            warehouse[key].registration = true
          }else{
            warehouse[key].registration = false
          }
        })
      }

      this.warehouses = warehouse
    
    })
  }

  public selectProduct(product:Warehouse){
    this.selectedProduct = product
    
    this.productForm.patchValue({
      FOREIGN_KEY_USER: this.userService.pullUserInState().PRIMARY_KEY,
      FOREIGN_KEY_WAREHOUSE: product.PRIMARY_KEY,
      FOREIGN_KEY_STORE: this.storeService.pullStoreInState().PRIMARY_KEY,
      price:product.price,
      quantities:0,
      productForSale:'false',
      totalOfLove:0,
      totalOfSale:0,
      totalOfComment:0
    })
  }

  public cancelSelectProduct(){
    this.selectedProduct = null
    this.active.message = false;
    this.productForm.reset()
  }

  public validateForm() {
    this.active.message = false;

    this.productForm.get("quantities").markAsTouched();

    if (this.productForm.get('quantities').value <= 0) {
      this.active.text = "*Quantidades";
      this.active.message = true;
    }

    if (this.productForm.get('price').value <= 0) {
      this.active.text = "*Preço";
      this.active.message = true;
    }

    if(this.productForm.get('price').value > 0 && this.productForm.get('quantities').value > 0){
      this.typing()
      this.active.loading = true
    }

    $('#selectProduct').animate({ scrollTop: 0 }, 'fast');
    
  }

  public typing(){
    this.productService.product = {
      AUTOINCREMENT: null,
      DATE:  null,
      PRIMARY_KEY:  null,
      FOREIGN_KEY_USER: this.productForm.get('FOREIGN_KEY_USER').value,
      FOREIGN_KEY_WAREHOUSE:  this.productForm.get('FOREIGN_KEY_WAREHOUSE').value,
      FOREIGN_KEY_STORE:  this.productForm.get('FOREIGN_KEY_STORE').value,
      price:  this.productForm.get('price').value,
      productForSale:  (this.productForm.get('productForSale').value === 'true'),
      quantities:  this.productForm.get('quantities').value,
      totalOfLove:  this.productForm.get('totalOfLove').value,
      totalOfSale:  this.productForm.get('totalOfSale').value,
      totalOfComment:  this.productForm.get('totalOfComment').value,
    }

    this.createProduct()
  }

  public createProduct(){
    this.productService.createNewProductInApi(this.productService.product).then( async(product)=>{
      this.storeService.updateQuantityOfProductInStoreForPlusInApi(this.storeService.pullStoreInState()).then((update)=>{
        this.active.loading = false
        $('#selectProduct').modal('hide')
      })
    })
  }

}
