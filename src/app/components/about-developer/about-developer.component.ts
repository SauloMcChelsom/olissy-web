import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-developer',
  templateUrl: './about-developer.component.html',
  styleUrls: ['./about-developer.component.css']
})
export class AboutDeveloperComponent implements OnInit {

  constructor(private metaTagService: Meta, private titleService: Title,) { }

  ngOnInit() {
    this.searchEngineOptimization()
  }

  public searchEngineOptimization(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'olissy, Sobre Mim, Saulo Silva Front End Developer, saulo olissy' },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle('Sobre Mim - Saulo Silva Front End Developer');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Graduado em Ciências da Computação, sou desenvolvedor junior desde o início de 2017, atualmente trabalhando neste projeto, como Full Stack com foco no Frond end. Eu Sempre fiquei preocupado com a experiência do usuário, por isso resolvir desenvolver este produto para, facilitar as compras através de uma plataforma web/mobile, onde um usuário Vendedor pode oferecer seus próprios produtos e/ou serviços diretamente a usuários Compradores.' }
    );
  }

}
