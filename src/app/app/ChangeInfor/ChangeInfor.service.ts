import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangeInforService {
  
  environment: any;

constructor(private _http: HttpClient, injector: Injector) { 
  this.environment = environment.apiDomain.devEndpoint
}
  Save(module: any, token: string) {
    const apiUrl = `${this.environment}/EditAccount?token=${token}`;
    return this._http.put(apiUrl, module);
  }

  GetInformation(email: string){
    const apiUrl = `${this.environment}/Users/Info?email=${email}`;
    return this._http.get(apiUrl);
  }

}
