import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { View } from '../../../../shared/view.shared';
import { UserService } from "../../../../service/user.service";
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';

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

  public product:Product = this.productService.product

  public productForm: FormGroup = this.createForm(this.product)
  constructor(
    private view:View,
    private userService: UserService,
    private clientService:ClientService,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
    private fb: FormBuilder
  ){}

  private createForm (product: Product): FormGroup { 
    return this.fb.group (product); 
  }

  private updateForm(product: Partial<Product>): void {
    this.productForm.patchValue(product)
  }

  public ngOnInit() {
    this.view.putLoader()
    this.warehouseService.getWarehouseByIndexInApi().subscribe((warehouse:any[])=>{
  
      for (const key in warehouse) {
        this.product.FOREIGN_KEY_WAREHOUSE = warehouse[key].PRIMARY_KEY
        this.productService.getProductByForeignKeyWarehouseInApi(this.product).subscribe((p)=>{
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
      this.createProduct()
      this.active.loading = true
    }

    $('#selectProduct').animate({ scrollTop: 0 }, 'fast');
    
  }

  public createProduct(){
    this.productService.createNewProductInApi(this.productForm.value).then( async(product)=>{
      this.storeService.updateQuantityOfProductInStoreForPlusInApi(this.storeService.pullStoreInState()).then((update)=>{
        this.active.loading = false
        $('#selectProduct').modal('hide')
      })
    })
  }

}
