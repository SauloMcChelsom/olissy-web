import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.css']
})
export class BusinessRuleComponent implements OnInit {

  constructor(private metaTagService: Meta, private titleService: Title,) { }

  ngOnInit() {
    this.searchEngineOptimization()
  }

  public searchEngineOptimization(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'olissy' },
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle('Regra de negocios - Olissy delivery');
    this.metaTagService.updateTag(
      { name: 'description', content: 'A Olissy delivery e um marketplace, ou seja, uma espécie de um shopping online, onde a loja farmacêutica fisica, cadastra seu produto na plataforma Olissy' }
    );
  }

}
