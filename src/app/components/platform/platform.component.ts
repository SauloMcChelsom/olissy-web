import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  constructor(private metaTagService: Meta, private titleService: Title) { }

  ngOnInit() {
    this.searchEngineOptimization()
  }

  public searchEngineOptimization(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'olissy, olissy farmacia, olissy delivery, Por que ultilizar a plataforma olissy, Para quem é a Olissy' },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle('Por que ultilizar a plataforma olissy delivery');
    this.metaTagService.updateTag(
      { name: 'description', content: 'A Olissy delivery ajuda de verdade sua loja a vender mais. Deixamos seus produtos disponíveis a muito mais clientes em uma vitrine gigantesca, além de oferecermos vários benefícios exclusivos:' }
    );
  }

}
