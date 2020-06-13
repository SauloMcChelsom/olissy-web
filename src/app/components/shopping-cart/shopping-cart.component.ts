import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service'

@Component({
  selector: 'mt-carrinho',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {

  public produtos:any = []

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.produtos = this.appService.produtos
  }

  public TotalValorDoPedido(){
    return this.produtos.reduce( (sum, item:any)=>{
      return new Number(sum).valueOf() + new Number(item.productPrice).valueOf()
    },0)
  }

  public removerItemCarrinho(menu_PRIMARY_KEY, itemDecrement_PRIMARY_KEY, quantities ){
    if(menu_PRIMARY_KEY == itemDecrement_PRIMARY_KEY && quantities == 0){
      for (const index in this.appService.produtos) {
        if(this.appService.produtos[index].PRIMARY_KEY == itemDecrement_PRIMARY_KEY){
          this.appService.produtos[index].productPrice = this.appService.produtos[index].productPriceOrigin
          this.appService.produtos[index].quantities = 0
          this.appService.produtos.splice(Number(index), 1)
        }
      }
    }
  }

  public removerProdutoCarrinho(item){
    for (const index in this.appService.produtos) {
      if(this.appService.produtos[index].PRIMARY_KEY == item.PRIMARY_KEY){
        this.removerItemCarrinho(this.appService.produtos[index].PRIMARY_KEY, item.PRIMARY_KEY, 0)
      }
    }
  }

  public decrementarItemCarrinho(item){
    for (const key in this.produtos) {
      if(this.produtos[key].PRIMARY_KEY == item.PRIMARY_KEY){
        this.produtos[key].quantities--
        
        if(this.produtos[key].quantities > 0){
          this.produtos[key].productPrice = (this.produtos[key].productPrice - this.produtos[key].productPriceOrigin)
        }
      }
      this.removerItemCarrinho(this.produtos[key].PRIMARY_KEY, item.PRIMARY_KEY, this.produtos[key].quantities)
    }
  }

  public incrementarItemCarrinho(item) {
    const foundItem: any = this.appService.produtos.find(items => items.PRIMARY_KEY === item.PRIMARY_KEY);
    if(foundItem){
      if( item.quantities < item.productQuantities ){
        foundItem.quantities++;
        foundItem.productPrice = foundItem.productPriceOrigin * foundItem.quantities;
      }
    }else{
      item.quantities = 1;
      item.productPriceOrigin = new Number(item.productPrice).valueOf();
      this.appService.produtos.push(item);
    }
  }
}


