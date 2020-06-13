import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public produtos = [];
  public products = [];
  public ListaProdutosPesquisado: any = [];
  public pedido: any = [];
  public router_app_componet = 'usuario';
  public routeParams = "/"
}

/*
    public token:string = "token_is_null";
    public pedido:any = []
    public produtos:any = []


    public httpOptions = {
        headers: new HttpHeaders({
          'Content-Type' :  'application/json',
          'Authorization': this.token
        })
      };

    private LogarUsuarioNavegarParaUrl = {
        url:null,
        navegar:false
    }

    constructor(private http: HttpClient){}

    public setLogarUsuarioNavegarParaUrl(URL:string):Observable<boolean[]>{
        this.LogarUsuarioNavegarParaUrl.navegar = true
        this.LogarUsuarioNavegarParaUrl.url = URL
        return  Observable.create( (observer:Observer<boolean>)=>{
            observer.next(true)
        })
    }
    public setLogarUsuarioNavegarParaUrlFalse():Observable<boolean[]>{
        return  Observable.create( (observer:Observer<boolean>)=>{
            observer.next(true)
        })
    }

    public getLogarUsuarioNavegarParaUrl():Observable<boolean[]>{
        return Observable.create( (observer:Observer<any>)=>{
            observer.next(this.LogarUsuarioNavegarParaUrl)
        })
    }

    public setPedido(pedido:any):Observable<boolean[]>{
        this.pedido = pedido
        return  Observable.create( (observer:Observer<boolean>)=>{
            observer.next(true)
        })
    }

    public getPedido():Observable<any[]>{
        return Observable.create( (observer:Observer<any>)=>{
            observer.next(this.pedido)
        })
    }

    public comercios():Observable<Comercio[]>{
        return this.http.get<Comercio[]>(MEAT_API)
    }

    public comercioById(PK: string):Observable<Comercio[]>{
        return this.http.get<Comercio[]>(`${MEAT_API}?PK=${PK}`)
    }

    public comentarioComercio(PK: string):Observable<Comentario[]>{
        return this.http.get<Comentario[]>(`http://localhost:3000/reviews?PK=${PK}`)

    }

    public ComercioItemPorId(PK: string):Observable<Menu[]>{
        return this.http.get<Menu[]>(`http://localhost:3000/produto?PK=${PK}`)
    }

    public enviarPedido(pedido:any){
        return this.http.post('http://localhost:3000/pedido',
                              JSON.stringify(pedido),this.httpOptions)
    }

    public logarUsuario(usuario:Usuario):Observable<any>{
        return this.http.post('http://localhost:3000/Authentication',
                              JSON.stringify({email:usuario.email, senha:usuario.senha}),
                              this.httpOptions)
    }

    public loginData(token):Observable<any>{
        this.token = token
        return this.http.get('http://localhost:3000/comercio/data/login',this.httpOptions )
    }

    public GetDateCliente(id:any):Observable<any>{
        let httpOptions = {headers: new HttpHeaders({ 'Content-Type' : 'application/json' })};
        return this.http.get<any>(`http://localhost:3000/cliente?PK=${id}`, httpOptions).pipe(retry(10))
    }

    public GetDateUsuario(id:any):Observable<any>{
        let httpOptions = {headers: new HttpHeaders({ 'Content-Type' : 'application/json' })};
        return this.http.get<any>(`http://localhost:3000/usuario?id=${id}`, httpOptions).pipe(retry(10))
    }

    public AtualizarProdutosPorId(id:any, valores:any):Observable<any>{
        return this.http.patch(`http://localhost:3000/produto/${id}`, JSON.stringify(valores), this.httpOptions).pipe(retry(10))
    }

    public DeletarProdutosPorId(id:any, valores:any):Observable<any>{
        let body =  JSON.stringify(valores)
        let httpOptions = {headers: new HttpHeaders({ 'Content-Type' : 'application/json','body': body })};
        return this.http.delete(`http://localhost:3000/produto/${id}`, httpOptions ).pipe(retry(10))
    }
*/
