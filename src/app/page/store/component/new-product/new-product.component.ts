import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder }  from '@angular/forms';

import { HostListener } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { StoreService, Store } from '../../../../service/store.service';
import { ProductService, Product } from '../../../../service/product.service';
import { WarehouseService, Warehouse } from '../../../../service/warehouse.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare var $ :any;

@Component({
  selector: 'mt-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
 
export class NewProductComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public warehouses = []

  public showSection

  public active = {
    text: "",
    message: false,
    loading:false
  };

  public emVendas = [true,false];

  public product:Product = this.productService.product

  public productForm: FormGroup = this.createForm(this.productService.product)

  public warehouseSelectedProduct:Warehouse

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
    private view:View,
    private locationStrategy: LocationStrategy,
    private userService: UserService,
    private storeService:StoreService,
    private productService:ProductService,
    private warehouseService:WarehouseService,
    private fb: FormBuilder
  ){
    this.preventBackButton()
  }

  private createForm (product: Product): FormGroup { 
    return this.fb.group (product); 
  }

  private updateForm(product: Partial<Product>): void {
    this.productForm.patchValue(product)
  }

  private getForm():Product {
    return this.productForm.value
  }

  public ngOnInit(){
    this.view.putLoader()
    window.scroll(0, 0);
    this.getWarehouse()
  }

  public getWarehouse(){
    this.warehouseService.getWarehouseByIndexInApi().pipe(takeUntil(this.unsubscribe$)).subscribe((warehouse:any[])=>{
      for (const key in warehouse){
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

  public selectProduct(warehouse:Warehouse){
    this.warehouseSelectedProduct = warehouse
    this.productForm.patchValue({
      FOREIGN_KEY_USER: this.userService.pullUserInState().PRIMARY_KEY,
      FOREIGN_KEY_WAREHOUSE: warehouse.PRIMARY_KEY,
      FOREIGN_KEY_STORE: this.storeService.pullStoreInState().PRIMARY_KEY,
      price:warehouse.price,
      quantities:0,
      productForSale:'false',
      totalOfLove:0,
      totalOfSale:0,
      totalOfComment:0
    })
  }

  public cancelSelectProduct(){
    this.warehouseSelectedProduct = null
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

    if (this.productForm.get('price').value <= 0 || this.productForm.get('price').value == '' || this.productForm.get('price').value == '0') {
      this.active.text = "*Preço";
      this.active.message = true;
    }

    if(this.productForm.get('price').value > 0 && this.productForm.get('quantities').value > 0){
      this.createProduct()
      this.active.loading = true
    }
    $('#selectProduct').animate({ scrollTop: 0 }, 'fast');
  }

  public async createProduct(){
    let product:Product = this.getForm()
    product.productForSale = (String(product.productForSale) == "true")
    await this.productService.createNewProductInApi(product)
    await  this.storeService.updateQuantityOfProductInStoreForPlusInApi(this.storeService.pullStoreInState())
    this.active.loading = false
    this.warehouseSelectedProduct = null
    $('#selectProduct').modal('hide')
  }

  @HostListener('window:popstate', ['$event'])
  public onBackButton(event) {
   this.disableScrolling()
   this.productForm.reset()
   this.warehouseSelectedProduct = null
   $("#selectProduct").modal("hide");
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
