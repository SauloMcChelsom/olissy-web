import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators  }  from '@angular/forms';
import { AboutService } from './about.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public email:boolean = true
  public mensagem:boolean = false

  public formularioEnviarEmail: FormGroup = new FormGroup({
    'nome':new FormControl(null,Validators.required),
    'email':new FormControl(null,Validators.required),
    'assunto':new FormControl(null,Validators.required),
    'mensagem':new FormControl(null,Validators.required)
  })

  constructor(private metaTagService: Meta, private titleService: Title, private aboutService:AboutService) {}

  ngOnInit() {
    this.searchEngineOptimization()
  }

  public searchEngineOptimization(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'olissy, Sebre Olissy'},
      { name: 'robots', content: 'index, follow' },
      { charset: 'UTF-8' }
    ]);
    this.titleService.setTitle('Sobre Olissy');
    this.metaTagService.updateTag(
      { name: 'description', content: ' Olissy trata-se de uma Marketplace, local de compras e vendas de produtos, no ambiente online, isso se traduz em um espaço virtual, aonde a olissy permite que farmácias e drogarias anunciem seus produtos e serviços através da plataforma da olissy. Assim, a olissy, é como se fosse um shopping center virtual, onde vários lojistas vendem seus produtos e serviços diretamente aos consumidores.' }
    );
  }

  public setEmail(){
    if(this.email){
      this.email = false
      this.copy()
    }else{
      this.email = true
    }
  }

  public copy(){
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', "olissy.app@gmail.com");
      e.preventDefault();
    });
    document.execCommand('copy');
  }

  public sendMensagem(){
    if(this.formularioEnviarEmail.valid){
      this.aboutService.sendMensagem(this.formularioEnviarEmail.value)
      this.mensagem = true
      this.formularioEnviarEmail.reset()
    }
  }

}
