import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AdminPaymentListService } from './admin-payment-list.service'

@Component({
  selector: 'app-admin-payment-list',
  templateUrl: './admin-payment-list.component.html',
  styleUrls: ['./admin-payment-list.component.css']
})
export class AdminPaymentListComponent implements OnInit {

  public paymentList = []
  
  public loading:boolean = true

  public url:String = "/"

  constructor(private route:ActivatedRoute, private adminPaymentListService:AdminPaymentListService) { 
    this.url = this.route.snapshot.params['id']
  }

  ngOnInit() {
    if(this.url != "/"){
      this.adminPaymentListService.getStorePayment(this.url).subscribe((store:any)=>{
        this.paymentList = store
      })
    }
  }

  public loadingPlusPayment(){
    this.loading = false
      setTimeout(() => {
        this.loading = true
      }, 1000);
  }

}
