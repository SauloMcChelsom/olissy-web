import { Component, OnInit, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl }  from '@angular/forms';
import { PaymentListService } from './payment-list.service'
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { AuthService  } from '../../AuthService';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})

export class PaymentListComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  private subscription = new Subscription();

  public createOnePaymentByDate:boolean = true

  public token

  public DateTimeZone = null

  public storePayment = []

  public adminPayment = []

  public loading:boolean = true

  public loadingPayment:boolean = true

  public lateOnePaymentByDate:boolean = true

  public formStoreListStatePayment: FormGroup = new FormGroup({
    'PRIMARY_KEY' :new FormControl(null),
    'FOREIGN_KEY_STORE' :new FormControl(null),
    'PRIMARY_KEY_ADMIN_PAYMENT' :new FormControl(null),
    'statusPayment' :new FormControl('openPayment')
  })

  public formPayment: FormGroup = new FormGroup({
    'PRIMARY_KEY' :new FormControl(null),
    'PRIMARY_KEY_ADMIN_PAYMENT' :new FormControl(null),
    'FOREIGN_KEY_STORE' :new FormControl(null),
    'indexDay' :new FormControl(null),
    'statusPayment' :new FormControl('openPayment'),
    'openPaymentDay' :new FormControl(null),
    'closedPaymentDay' :new FormControl(null),
    'inPaymentDay' : new FormControl(null),
    'receivedPaymentDay' : new FormControl(null),
    'latePaymentDay' : new FormControl(null),
    'client' : new FormControl([]),
    'totalPayment' : new FormControl('0.00'),
    'storeName' : new FormControl(null),
    'imageUrlStore' : new FormControl(null),
    'storeCity' : new FormControl(null),
    'storeStreet' : new FormControl(null),
    'storeNeighborhood' : new FormControl(null),
    'storeCellPhone' : new FormControl(null),
    'storeEmail' : new FormControl(null),
    'plataformaName' : new FormControl('olissy.com'),
    'plataformaCity' : new FormControl('Vitoria'),
    'bank': new FormControl('Bradesco'),
    'agency': new FormControl('00000-01'),
    'account': new FormControl('123456'),
    'plataformaStreet' : new FormControl('av.Vitoria'),
    'plataformaNeighborhood' : new FormControl('Vitoria-Brasil'),
    'plataformaCellPhone' : new FormControl('27 99904-1192'),
    'plataformaEmail' : new FormControl('olissy.app@gmail.com')
  })
 
  constructor(private authService: AuthService, private paymentListService:PaymentListService) { 
    setInterval(() => {
      //this.updateDateTimeZone()
      this.paymentInOpen()
      this.paymentInLate()
    },1000)
  }

  public ngOnInit() {
    //this.paymentListService.getTimeZone().pipe(takeUntil(this.unsubscribe$)).subscribe((times:any)=>{
      //this.DateTimeZone =  new Date(times.time)
    //})
    this.authService.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((token:any)=>{
      this.getPayment(token.uid)
      this.setInfoAdmin()
      this.setInfoStore(token.uid)
      this.loadingPayment = false
    })
  }

  public updateDateTimeZone(){
    let d = new Date();
    this.DateTimeZone = d.setSeconds(d.getSeconds() + 1);
  }

  public getPayment(token){
    this.paymentListService.getStorePayment(token).subscribe((payment:any)=>{
      this.storePayment = payment
    })
  }

  public setInfoAdmin(){
    this.paymentListService.getAdminPayment().subscribe((payment:any)=>{

      this.adminPayment = payment

      this.formStoreListStatePayment.patchValue({
        PRIMARY_KEY_ADMIN_PAYMENT : payment[0].PRIMARY_KEY,
      })

      this.formPayment.patchValue({
        PRIMARY_KEY_ADMIN_PAYMENT : payment[0].PRIMARY_KEY,
        openPaymentDay : payment[0].openPaymentDay,
        closedPaymentDay : payment[0].closedPaymentDay,
        inPaymentDay : payment[0].inPaymentDay,
        receivedPaymentDay : payment[0].receivedPaymentDay,
        latePaymentDay : payment[0].latePaymentDay,
        indexDay : new Date()
      })
    })
  }

  public setInfoStore(token){
    this.paymentListService.getByFOREIGN_KEY('store', token).subscribe((store:any)=>{
      
      this.formStoreListStatePayment.patchValue({
        FOREIGN_KEY_STORE : store[0].FOREIGN_KEY,
      })

      this.formPayment.patchValue({
        storeName : store[0].storeName,
        imageUrlStore : store[0].storeImageUrl,
        storeCity : store[0].storeCity,
        storeStreet : store[0].storeStreet,
        storeNeighborhood : store[0].storeNeighborhood,
        storeCellPhone : store[0].storeCellPhone,
        storeEmail : store[0].storeEmail,
        FOREIGN_KEY_STORE : store[0].FOREIGN_KEY
      })
    })
  }

  public paymentInOpen(){

    if(Object.keys(this.storePayment).length != 0){
      if(new Date() >= new Date(this.storePayment[0].inPaymentDay) && this.storePayment[0].statusPayment == "openPayment"){
        this.setFormPayment(this.adminPayment)
        this.paymentListService.updateStatusPayment(this.storePayment[0].PRIMARY_KEY, {statusPayment:'inPayment'})
        this.subscription = this.paymentListService.getByPRIMARY_KEY_ADMIN_PAYMENT(this.storePayment[0].PRIMARY_KEY_ADMIN_PAYMENT, this.storePayment[0].FOREIGN_KEY_STORE).subscribe((res:any)=>{
          this.subscription.unsubscribe()
          this.paymentListService.updateStoreListStatePayment(res[0].PRIMARY_KEY, {statusPayment:'inPayment'})
        })
      }
    }
  }

  public paymentInLate(){
    if(this.storePayment[0]){
      if(new Date() > new Date(this.storePayment[0].latePaymentDay) && this.storePayment[0].statusPayment == "inPayment"){
        this.paymentListService.updateStatusPayment(this.storePayment[0].PRIMARY_KEY, {statusPayment:'latePayment'})
        this.subscription = this.paymentListService.getByPRIMARY_KEY_ADMIN_PAYMENT(this.storePayment[0].PRIMARY_KEY_ADMIN_PAYMENT, this.storePayment[0].FOREIGN_KEY_STORE).subscribe((res:any)=>{
          this.subscription.unsubscribe()
          this.paymentListService.updateStoreListStatePayment(res[0].PRIMARY_KEY, {statusPayment:'latePayment'})
        })
      }
    } 
    if(this.storePayment[1]){
      if(new Date() > new Date(this.storePayment[1].latePaymentDay) && this.storePayment[1].statusPayment == "inPayment"){
        this.paymentListService.updateStatusPayment(this.storePayment[1].PRIMARY_KEY, {statusPayment:'latePayment'})
        this.subscription = this.paymentListService.getByPRIMARY_KEY_ADMIN_PAYMENT(this.storePayment[1].PRIMARY_KEY_ADMIN_PAYMENT, this.storePayment[0].FOREIGN_KEY_STORE).subscribe((res:any)=>{
          this.subscription.unsubscribe()
          this.paymentListService.updateStoreListStatePayment(res[0].PRIMARY_KEY, {statusPayment:'latePayment'})
        })
      }
    }
  }

  public formatterDateForPayment(date){
    let data = new Date(date),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        formatter = diaF+"/"+mesF

    return formatter
  }

  public setFormPayment(payment){
    var closedPaymentDay = new Date(payment[0].closedPaymentDay);
        closedPaymentDay.setHours(23)
        closedPaymentDay.setMinutes(59)
        closedPaymentDay.setSeconds(59)

    var latePaymentDay = new Date(payment[0].latePaymentDay);
        latePaymentDay.setHours(23)
        latePaymentDay.setMinutes(59)
        latePaymentDay.setSeconds(59)

    this.formPayment.patchValue({
      PRIMARY_KEY_ADMIN_PAYMENT : payment[0].PRIMARY_KEY,
      openPaymentDay : payment[0].openPaymentDay,
      closedPaymentDay : closedPaymentDay.toString(), 
      inPaymentDay : payment[0].inPaymentDay,
      receivedPaymentDay : payment[0].receivedPaymentDay,
      latePaymentDay : latePaymentDay.toString(),
      indexDay : new Date()
    })
  }

  public addPayment(PRIMARY_KEY_INVOICE, name, price): Promise<any>{

    let data = [];
    
    let store = {
      PRIMARY_KEY_INVOICE : PRIMARY_KEY_INVOICE,
      data : new Date().toString(),
      name : name,
      price : price
    }

    return new Promise(resolve => {
      this.subscription = this.paymentListService.getOneStorePayment(this.formPayment.value.PRIMARY_KEY_ADMIN_PAYMENT, this.formPayment.value.FOREIGN_KEY_STORE ).subscribe((payment:any)=>{
        this.subscription.unsubscribe()
        if(Object.keys(payment).length == 0){
          this.paymentListService.AddStoreListStatePayment(this.formStoreListStatePayment.value).then(res => {
            data.push(res)
            this.createClientPayment(store).then(res => {
              data.push(res)
              resolve(data)
            })
          })
        }else{
          this.paymentListService.AddStoreListPayment(payment[0].PRIMARY_KEY, store).then(res => {
            data.push(res)
            this.paymentListService.addTaxingAdmin(payment[0].PRIMARY_KEY_ADMIN_PAYMENT).then(res => {
              data.push(res)
              resolve(data)
            })
          })
        }
      })
    });
  }

  public loadingPlusPayment(){
    this.loading = false
      setTimeout(() => {
        this.loading = true
      }, 1000);
  }

  public createClientPayment(store): Promise<any>{
    let data = [];
    return new Promise(resolve => {
      this.paymentListService.setStorePayment(this.formPayment.value).then((res)=>{
        this.subscription = this.paymentListService.getOneStorePayment(this.formPayment.value.PRIMARY_KEY_ADMIN_PAYMENT, this.formPayment.value.FOREIGN_KEY_STORE).subscribe((payment:any)=>{
          data.push(res)
          this.subscription.unsubscribe()
          this.paymentListService.AddStoreListPayment(payment[0].PRIMARY_KEY, store).then(res => {
            data.push(res)
            this.paymentListService.addTaxingAdmin(payment[0].PRIMARY_KEY_ADMIN_PAYMENT).then(res => {
              data.push(res)
              resolve(data)
            })
          })
        })
      })
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
