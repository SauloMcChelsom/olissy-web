import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { AdminPaymentService } from './admin-payment.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public clock = {
    data:"dd/mm/yyyy",
    time:"00:00:00",
    timeZone:null
  }

  public createOnePaymentByDate:boolean = true
  public lateOnePaymentByDate:boolean = true

  public paymentList:any = []

  public formPayment: FormGroup = new FormGroup({
    'PRIMARY_KEY':new FormControl(null),
    'indexDay':new FormControl(null),
    'statusPayment':new FormControl('openPayment'),
    'openPaymentDay':new FormControl(null),
    'closedPaymentDay':new FormControl(null),
    'inPaymentDay': new FormControl(null),
    'receivedPaymentDay': new FormControl(null),
    'latePaymentDay': new FormControl(null),
    'listStore': new FormControl([]),
    'value': new FormControl(0),
    'openPaymentStore':new FormControl(0),
    'receivedPaymentStore':new FormControl(0),
    'InPaymentStore':new FormControl(0),
    'latePaymentStore':new FormControl(0),
  })

  public loading:boolean = true

   constructor(private adminPaymentService:AdminPaymentService) {
    setInterval(() => {
      this.setClock()
      this.createNewPayment()
      this.paymentInLate()
    },1000)
  }

  ngOnInit() {
    //this.adminPaymentService.getTimeZone().pipe(takeUntil(this.unsubscribe$)).subscribe((times:any)=>{
      //this.clock.timeZone =  new Date(times.datetime)//
    //})
    this.startPayment()
  }

  public startPayment(){
    this.adminPaymentService.getAdminPayment().pipe(takeUntil(this.unsubscribe$)).subscribe((payment:any)=>{
      if(Object.keys(payment).length == 0){
        this.startPrimaryPayment()
      }else{
        this.paymentList = payment
        this.getStatusPayment(payment)
      }
    })
  }

  public createNewPayment(){
    if(Object.keys(this.paymentList).length != 0){
      if(new Date() > new Date(this.paymentList[0].inPaymentDay) && this.createOnePaymentByDate && this.paymentList[0].statusPayment == "openPayment"){
        this.createOnePaymentByDate = false
        this.setNewDateFormPayment()
        this.adminPaymentService.updateStatusPayment(this.paymentList[0].PRIMARY_KEY, {statusPayment:'inPayment'}).then((payment:any)=>{
          this.adminPaymentService.setAdminPayment(this.formPayment.value)
        })
      }
    }
  }

  public paymentInLate(){ 
    if(this.paymentList[1]){
      if(new Date() > new Date(this.paymentList[1].latePaymentDay) && this.lateOnePaymentByDate && this.paymentList[1].statusPayment == "inPayment"){
        this.lateOnePaymentByDate = false
        this.adminPaymentService.updateStatusPayment(this.paymentList[1].PRIMARY_KEY, {statusPayment:'latePayment'})
      }
    }
  }

  public setNewDateFormPayment(){
    var date = new Date();
    var nextMonth = new Date();

    var openPaymentDay:any = new Date(date.getFullYear(), date.getMonth(), 1);
    var closedPaymentDay:any = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        closedPaymentDay.setHours(23)
        closedPaymentDay.setMinutes(59)
        closedPaymentDay.setSeconds(59)
    var inPaymentDay:any = null
    const latePaymentDay = new Date(date.setDate(46));
          latePaymentDay.setHours(23)
          latePaymentDay.setMinutes(59)
          latePaymentDay.setSeconds(59)

    if(nextMonth.getMonth() == 11){
      inPaymentDay = new Date(nextMonth.getFullYear() + 1, 0, 1);
    }else{
      inPaymentDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
    }

    this.formPayment.patchValue({
      openPaymentDay:openPaymentDay.toString(),
      closedPaymentDay:closedPaymentDay.toString(),
      inPaymentDay: inPaymentDay.toString(),
      latePaymentDay: latePaymentDay.toString(),
      indexDay: new Date()
    })
  }


  public formatterDateForPayment(date){
    var data = new Date(date);
    var dia  = data.getDate().toString();
    var diaF = (dia.length == 1) ? '0'+dia : dia;
    var mes  = (data.getMonth()+1).toString();
    var mesF = (mes.length == 1) ? '0'+mes : mes;
    var anoF = data.getFullYear();
    var formatter = diaF+"/"+mesF+"/"+anoF
    return formatter
  }

  public setClock() {
    var time = new Date();

    var dia  = time.getDate().toString();
    var diaF = (dia.length == 1) ? '0'+dia : dia;
    var mes  = (time.getMonth()+1).toString();
    var mesF = (mes.length == 1) ? '0'+mes : mes;
    var anoF = time.getFullYear();

    var hours = time.getHours().toString();
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();

    this.clock.data = diaF+"/"+mesF+"/"+anoF;
    this.clock.time = hours+":"+minutes+":"+seconds;
    this.clock.timeZone = time.setSeconds(time.getSeconds() + 1);
  }

  public getStatusPayment(payment){
    for (const pay in payment) {
      this.adminPaymentService.getStoreListStatePayment(payment[pay].PRIMARY_KEY,'openPayment').pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        payment[pay].openPaymentStore = store.length
      })
      this.adminPaymentService.getStoreListStatePayment(payment[pay].PRIMARY_KEY,'receivedPayment').pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        payment[pay].receivedPaymentStore = store.length
      })
      this.adminPaymentService.getStoreListStatePayment(payment[pay].PRIMARY_KEY,'inPayment').pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        payment[pay].InPaymentStore = store.length
      })
      this.adminPaymentService.getStoreListStatePayment(payment[pay].PRIMARY_KEY,'latePayment').pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
        payment[pay].latePaymentStore = store.length
      })
    }
  }

  public loadingPlusPayment(){
    this.loading = false
    setTimeout(() => {
      this.loading = true
    }, 1000);
  }

  startPrimaryPayment(){
    this.setNewDateFormPayment()
    this.adminPaymentService.setAdminPayment(this.formPayment.value)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
