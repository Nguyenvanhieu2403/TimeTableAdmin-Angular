import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePassWordService {

  environment: any;

  constructor(private _http: HttpClient, injector: Injector) { 
    this.environment = environment.apiDomain.devEndpoint
  }

  Save(module: any, token: string) {
    const apiUrl = `${this.environment}/ChangerPassWord?token=${token}`;
    return this._http.put(apiUrl, module);
  }

}
