import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  environment: any;
  constructor( private _http: HttpClient, injector: Injector) {
    this.environment = environment.apiDomain.devEndpoint

  }

  Login(model: any){
    const apiUrl = `${this.environment}/Users/SignIn`;
    return this._http.post(apiUrl, model);
  }

}
