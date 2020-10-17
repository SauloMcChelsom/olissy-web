import { Component } from '@angular/core';
import { View } from '../../../../shared/view.shared';

@Component({
  selector: 'app-welcome-for-open-your-store',
  templateUrl: './welcome-for-open-your-store.component.html',
  styleUrls: ['./welcome-for-open-your-store.component.css']
})
export class WelcomeForOpenYourStoreComponent {
  constructor(
    private view:View,
  ){
    this.view.setLoader(false)
    window.scroll(0,0);
  }
}