import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

	constructor(private _http: Http){
		console.log('Employee service Initialize');
	}

	getEmployees (){
		return this._http.get("/api/employees")
		 .map(result => result.json());
	}
}