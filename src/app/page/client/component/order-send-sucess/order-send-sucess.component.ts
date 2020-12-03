import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

import { View } from '../../../../shared/view.shared';

@Component({
  selector: 'app-order-send-sucess',
  templateUrl: './order-send-sucess.component.html',
  styleUrls: ['./order-send-sucess.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrderSendSucessComponent {

  constructor(
    private view:View,
    private zone: NgZone
  ){
    this.view.setLoader(false)
  }

  options: AnimationOptions = {
    path: '/assets/animated/sendOrder.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '300px',
    margin: '0 auto',
  };


  public animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    animationItem.loop = false
  }

  public onLoopComplete(event): void {
    NgZone.assertNotInAngularZone();
      if(NgZone.isInAngularZone() == false){
        this.zone.run(() => {
          this.view.redirectPageFor(`/client-order-list`)
      });
    }
  }
  
}
