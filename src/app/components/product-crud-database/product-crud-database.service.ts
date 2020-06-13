import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';
import '@firebase/storage';
import '@firebase/firestore';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ProductCrudDatabaseService {

  constructor(private db: AngularFirestore, private http: HttpClient){}

  private url = environment.apiOlissyMongoDB

  public async createNewProvider(provider) {
    await this.db.collection("provider").add(provider)
  }

  public getByNameProvider(provider) {
    return this.db.collection('provider', ref =>ref.where('providerNameQuery', '==', provider)).valueChanges();
  }

  public getAllProvider(){
    return this.db.collection('provider').valueChanges()
  }

  public async sendImagemStorage(imageName, imagem){
    var res:any = false
    await firebase.storage().ref().child(imageName).put(imagem).then(async (r:any) =>{
      res = await this.obterImagemStorage(r.metadata.fullPath)
    })
    return res
  }

  public async obterImagemStorage(path){
    var res:any = false
    await firebase.storage().ref().child(path).getDownloadURL().then( r =>{
      res = r
    })
    return res
  }

  public async createProduto(collection, data) {
    delete data.imageDisplay
    delete data.imageNew
    return await this.db.collection(collection).add(data).then( async(res) => {
      return await this.update(collection, res.id, { PRIMARY_KEY:res.id }).then(async(update)=>{
        await update
         let product = data
             product.PRIMARY_KEY = res.id
         this.createMongoDB(product).subscribe(()=>{
          this.productDataBaseQuantity()
         })
      })
    })
  }

  public async update(collection:string, pk:string, data:any) {
    var res:any = false
    await this.db.collection(collection).doc(pk).update(data).then( r =>{
      res = r
    })
    return res
  }

  public async productDataBaseQuantity() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('countOf').doc("0FPh9yLyy34ldMYC8l8t").update({ productDataBase : increment })
  }

  public getByIdMongoDB(id: string) {
    return this.http.get<any>(this.url + '/' + id);
  }

  public getAllMongoDB() {
    return this.http.get<any[]>(this.url);
  }

  public createMongoDB(product: any) {
    return this.http.post(this.url, product);
  }

  public updateMongoDB(product: any) {
    return this.http.put(this.url + '/' + product.PRIMARY_KEY, product);
  }

  public deleteMongoDB(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
