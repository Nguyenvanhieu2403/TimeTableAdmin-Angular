import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerAccountService {

  environment: any;

  constructor(private _http: HttpClient, injector: Injector) {
    this.environment = environment.apiDomain.devEndpoint
  }

  getAllClass(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/UserManager?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  getClassById(classId: any, pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/UserManager/Id?id=${classId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  saveClassById(classId: any, token:any, model:any){
    const apiUrl = `${this.environment}/EditAccount/Manager?id=${classId}&token=${token}`;
    return this._http.put(apiUrl,model);
  }

  AddClass( token:any, model:any){
    const apiUrl = `${this.environment}/UserManager?token=${token}`;
    return this._http.post(apiUrl,model);
  }

  deleteClassById(classId: any){
    const apiUrl = `${this.environment}/UserManager?id=${classId}`;
    return this._http.delete(apiUrl);
  }

  lockAccount(classId: any, usedStated: any){
    const apiUrl = `${this.environment}/UserManager?id=${classId}&usedStated=${usedStated}`;
    return this._http.put(apiUrl,null);
  }

  LockAccountType(TypeAccount: any, usedStated: any){
    const apiUrl = `${this.environment}/UserManager/LoclAccount?TypeAccount=${TypeAccount}&usedStated=${usedStated}`;
    return this._http.put(apiUrl,null);
  }

}
