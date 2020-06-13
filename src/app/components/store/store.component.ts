import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from './store.service'
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {

  public loading:boolean = true

  public LIMIT:number = 50

  public stores: Observable<any[]>

  constructor(private metaTagService: Meta, private titleService: Title,private storeListService:StoreService) {}

  ngOnInit() {
    this.searchEngineOptimization()
    this.loading = false
    setTimeout(() => {
      this.stores = this.storeListService.obterTodosComercioPorCategoria(this.LIMIT)
      this.loading = true
    }, 1000);
  }

  public searchEngineOptimization(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'olissy, olissy farmacia, olissy delivery' },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle('olissy farmacias');
    this.metaTagService.updateTag(
      { name: 'description', content: 'A olissy delivery trata-se de uma Marketplace local de compras e vendas de produtos. No ambiente online isso se traduz em um espaço virtual onde a farmacia empresa permite que outros lojistas anunciem seus produtos e serviços através da plataforma da olissy.' }
    );
  }
}
