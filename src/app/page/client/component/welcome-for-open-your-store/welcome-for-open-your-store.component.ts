import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-for-open-your-store',
  templateUrl: './welcome-for-open-your-store.component.html',
  styleUrls: ['./welcome-for-open-your-store.component.css']
})
export class WelcomeForOpenYourStoreComponent {
  public ngOnInit() {
    window.scroll(0,0);
  }
}