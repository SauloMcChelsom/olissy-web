import { Component, OnInit, OnDestroy, Output,Input, EventEmitter  } from '@angular/core'
import { Router } from '@angular/router'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { SearchProductService } from './search-product.service'
declare var $ :any
 
@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject()

  @Output() searchProductDB_Output:any = new EventEmitter()

  @Input() boscar_por:string

  public Digite_tres_ou_mais_caracteres_total = 3

  public digite = true

  public suggestion:string = "name-suggestion"

  public enter = false

  public aguarde = false

  public desculpe = false

  public produto = false

  public suggestedProductList = []

  public interval;

  constructor(private search:SearchProductService, private router: Router) {}

  ngOnInit() {
    this.autoFocus()
  }

  public SearchBySuggestions(suggestion, event){

    if(event.key != 'Enter' && event.key != 'Backspace' && this.Digite_tres_ou_mais_caracteres_total <= 3 && this.Digite_tres_ou_mais_caracteres_total > 0){
      if(suggestion != false){
        this.Digite_tres_ou_mais_caracteres_total --
      }
    }

    if(event.key == 'Backspace' && suggestion.length <= 2 && this.Digite_tres_ou_mais_caracteres_total <= 2 ){
      this.digite = true
      this.aguarde = false
      this.desculpe = false
      this.produto = false
      this.Digite_tres_ou_mais_caracteres_total ++
    }

    if(suggestion.length == 0){
      this.Digite_tres_ou_mais_caracteres_total = 3
    }

    if((this.Digite_tres_ou_mais_caracteres_total <= 0 && suggestion.length >= 2) ||  (suggestion.length >= 3)){
      this.Digite_tres_ou_mais_caracteres_total = 0
      this.produto  = false
      this.digite   = false
      this.desculpe = false
      this.aguarde  = false
      this.enter = true
      clearInterval(this.interval);
    }else{
      this.digite = true
      this.desculpe = false
      this.enter = false
    }

    if(Object.keys(this.suggestedProductList).length != 0){
      this.produto  = true
      this.enter = false
    }
  }

  public searchByTyping(suggestion, event){
    if((this.Digite_tres_ou_mais_caracteres_total <= 0 && suggestion.length >= 2) ||  (suggestion.length >= 3)){
      this.aguarde  = true
      this.enter = false
      this.produto  = false
      this.validateRepetedSuggestionOfUser()
    }
  }

  public validateRepetedSuggestionOfUser(){
    let suggestion = $("#input-buscar-produto").val() 
    if(this.suggestion != suggestion && suggestion.length >= 3){
      this.suggestion = suggestion
      let wordSuggestion = suggestion.split(" ")
      let wordSuggestionFilter = wordSuggestion.filter( (el) =>  el != null && el != "");
      this.sendSearchSuggestion(wordSuggestionFilter)
    }else{
      if(Object.keys(this.suggestedProductList).length == 0){
        this.desculpe = true
        this.produto = false
        this.aguarde = false
      }else{
        this.produto = true
        this.aguarde = false
        this.desculpe = false
      }
    }
  }

  public sendSearchSuggestion(wordSuggestion){
    this.suggestedProductList = []
    for (const word of wordSuggestion) {
      this.search.searchProductsByRegex(word).pipe(takeUntil(this.unsubscribe$)).subscribe((resposta:any)=>{
        if(Object.keys(resposta).length != 0){
          this.searchProductOfProductDB(wordSuggestion, resposta)
        }else{
          this.desculpe = true
          this.produto = false
          this.aguarde = false
        }
      })
    }
  }

  public searchProductOfProductDB(wordSuggestion, productDB){
    let cout = 1
    for(let index in productDB){
      this.search.productForProductDB(productDB[index].PRIMARY_KEY).subscribe((product:any)=>{
        if(Object.keys(product).length != 0 ){
          var filtered = this.suggestedProductList.filter(value=> value.PRIMARY_KEY == productDB[index].PRIMARY_KEY);
          if(Object.keys(filtered).length == 0){
            this.suggestedProductList.push(productDB[index])
          }
          this.produto = true
          this.aguarde = false
          this.desculpe = false
          $("#input-buscar-produto").blur();
        }
        if(cout == wordSuggestion.length && Object.keys(this.suggestedProductList).length == 0){
          this.desculpe = true
          this.produto = false
          this.aguarde = false
        }
        cout++
      })
    }
  }

  public selectSuggestion(suggestion){
    this.router.navigate(['/'])
    this.searchProductDB_Output.emit({search:'suggestion', product:suggestion})
  }

  public selectAllSuggestion(){
    this.router.navigate(['/'])
    this.searchProductDB_Output.emit({search:'typing', product:this.suggestedProductList})
  }

  public autoFocus(){
    this.interval = setInterval(() => {
      $("#input-buscar-produto").focus()
    },1000)
  }

  public clearTextSearch(){

    (<HTMLInputElement>document.getElementById('input-buscar-produto')).value;

    $("#input-buscar-produto").focus()

    $('#input-buscar-produto').val('')

    this.Digite_tres_ou_mais_caracteres_total = 3

    this.digite = true
      
    this.aguarde = false

    this.desculpe = false

    this.produto = false

    this.suggestedProductList = []

    this.suggestion = ""

    this.enter = false
  }

  ngOnDestroy(){
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}

