import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerClassRoomService {

  environment: any;

  constructor(private _http: HttpClient, injector: Injector) {
    this.environment = environment.apiDomain.devEndpoint
  }

  getAllClassRoom(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/ClassRoom?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  getClassRoomById(classId: any, pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/ClassRoom/Id?id=${classId}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  saveClassRoomById(classId: any, token:any, model:any){
    const apiUrl = `${this.environment}/ClassRoom?idroom=${classId}&token=${token}`;
    return this._http.put(apiUrl,model);
  }

  AddClassRoom( token:any, model:any){
    const apiUrl = `${this.environment}/ClassRoom?token=${token}`;
    return this._http.post(apiUrl,model);
  }

  deleteClassRoomById(classId: any){
    const apiUrl = `${this.environment}/ClassRoom?id=${classId}`;
    return this._http.delete(apiUrl);
  }

  ExportExcel() {
    const apiUrl = `${this.environment}/ClassRoom/Excel`;
    return this._http.get(apiUrl);
  }

}
