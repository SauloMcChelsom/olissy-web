import { Injectable } from '@angular/core'; 
import numeral  from 'numeral';
//http://numeraljs.com/

@Injectable({providedIn: 'root'})
export class Money {

    constructor(){}

	public multiply(value, mul){
		const  number = numeral(value);
		       number.multiply(mul);
		return number.value()
	}

	public addition(value, mul){
		const  number = numeral(value);
		       number.add(mul);
		return number.value()
	}

	public subtract(value, mul){
		const  number = numeral(value);
		       number.subtract(mul);
		return number.value()
	}

	public divide(value, mul){
		const  number = numeral(value);
		       number.divide(mul);
		return number.value()
	}

	public money(m){
		var number = numeral(m)
		return number.format('0,0.00')
	}
} 
