import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerSubjectsService {

  environment: any;

  constructor(private _http: HttpClient, injector: Injector) {
    this.environment = environment.apiDomain.devEndpoint
  }

  getAllClass(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/Subject?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  getClassById(classId: any, pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/Subject/Id?id=${classId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  saveClassById(classId: any, token:any, model:any){
    const apiUrl = `${this.environment}/Subject?id=${classId}&token=${token}`;
    return this._http.put(apiUrl,model);
  }

  AddClass( token:any, model:any){
    const apiUrl = `${this.environment}/Subject?token=${token}`;
    return this._http.post(apiUrl,model);
  }

  deleteClassById(classId: any){
    const apiUrl = `${this.environment}/Subject?id=${classId}`;
    return this._http.delete(apiUrl);
  }

  ExportExcel() {
    const apiUrl = `${this.environment}/Subject/Excel`;
    return this._http.get(apiUrl);
  }

}
