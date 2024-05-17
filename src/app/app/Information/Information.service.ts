import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  environment: any;
  email: any;

constructor(private _http: HttpClient, injector: Injector) { 
  this.environment = environment.apiDomain.devEndpoint
}

GetInformation(email: string){
  const apiUrl = `${this.environment}/Users/Info?email=${email}`;
  return this._http.get(apiUrl);
}

}
