import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  environment: any;
  constructor( private _http: HttpClient, injector: Injector) {
    this.environment = environment.apiDomain.devEndpoint
  }

  register(model: any){
    const apiUrl = `${this.environment}/Users/SignUp`;
    return this._http.post(apiUrl, model);
  }

}
