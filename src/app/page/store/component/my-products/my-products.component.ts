import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

import { HostListener } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'mt-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})

export class MyProductsComponent implements OnInit {

  private unsubscribe$ = new Subject();
  
  public products = []

  public productSelect = {}

  public emVendas = [true,false];

  public modal = true

  public productForm: FormGroup = this.createForm(this.productService.product)

  public currencyMask : any = {
    mask: '$num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ' '
      }
    }
  };

  constructor(
    private locationStrategy: LocationStrategy,
    private view:View,
    private clientService:ClientService,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
    private fb: FormBuilder
  ){
    this.preventBackButton()
  }

  private createForm (product: Product): FormGroup { 
    return this.fb.group(product); 
  }

  private getForm():Product {
    return this.productForm.value
  }

  private updateForm(product: Partial<Product>): void {
    this.productForm.patchValue(product)
  }

  public ngOnInit() {
    this.view.setLoader(false)
    window.scroll(0, 0);
    this.getAds()
  }

  public getAds(){
    const PRIMARY_KEY = 'mw6QcFXgT1Qxzx681n8x'
    let store = this.productService.product
        store.FOREIGN_KEY_STORE = PRIMARY_KEY
    this.productService.getProductByForeignKeyStoreInApi(store).pipe(takeUntil(this.unsubscribe$)).subscribe((resultProduct:Product[])=>{
        this.products = resultProduct
        let warehouse = this.warehouseService.warehouse
        for (const key in this.products) {
          warehouse.PRIMARY_KEY = this.products[key].FOREIGN_KEY_WAREHOUSE
          this.warehouseService.getWarehouseByPrimaryKeyInApi(warehouse).subscribe((resultWarehouse:Warehouse[])=>{
            this.products[key].warehouse = resultWarehouse[0]
          })
        }
    })
  }

  public selectProductUpdate(product){
    this.productSelect = product
    this.updateForm(product)
  }

  public cancelUpdateProduct(){
    this.productSelect = []
    this.productForm.reset()
  }

  public saveUpdateProduct(){
    console.log(this.getForm())
    console.log( this.productSelect)
  }

  public selectProductDelete(product){
    this.productSelect = product
    this.updateForm(product)
  }

  public cancelDeleteProduct(){
    this.productSelect = []
    this.productForm.reset()
  }

  public deletarProduct(){
    console.log(this.getForm())
    console.log( this.productSelect)
  }

  public publishForSale(product){
    console.log(product)
  }

  @HostListener('window:popstate', ['$event'])
  public onBackButton(event) {
   this.disableScrolling()
   $("#selectProductUpdate").modal("hide");
   $("#selectProductDelete").modal("hide")
  }

  @HostListener('mousewheel', ['$event']) 
  public onMousewheel(event) {
    this.enableScrolling()
  }

  @HostListener('touchmove', ['$event']) 
  public onTouchMove(event) {
    this.enableScrolling()
  }
  @HostListener('touchend', ['$event']) 
  public onTouchEnd(event) {
    this.enableScrolling()
  }

  public preventBackButton(){
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  public disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }

  public enableScrolling(){
    window.onscroll=function(){};
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
