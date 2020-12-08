import { Injectable } from '@angular/core'; 
import { format } from 'date-fns'
//https://date-fns.org/docs/Getting-Started

@Injectable({providedIn: 'root'})
export class DateFormat {

    constructor(){}
    
    public to_ptBR(date){
        return format(new Date(date), 'dd.MM.yyyy')
    }

} 
