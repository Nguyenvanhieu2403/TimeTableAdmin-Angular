import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LectureScheduleService {

  environment: any;

  constructor(private _http: HttpClient, injector: Injector) {
    this.environment = environment.apiDomain.devEndpoint
  }

  // Lấy thông tin lớp học
  getClass(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/Class?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }
  // Lấy thông tin phòng học
  getClassRoom(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/ClassRoom?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }
  // Lấy thông tin môn học
  getSubject(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/Subject?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this._http.get(apiUrl);
  }

  //Call api thuật toán sắp xếp lịch
  postSchedule(model: any){
    const apiUrl = `${this.environment}/Lecture_ScheduleManager/Scheduling`;
    return this._http.post(apiUrl, model);
  }

  // Lấy thông tin lịch chưa đăng ký
  getSchedule(pageIndex: any, pageSize: any){
    const apiUrl = `${this.environment}/LectureSchedule/Registered_Calendar?pageIndex=${pageIndex}&pageSize=${pageSize}&check=${0}&Name=${'string'}`;
    return this._http.get(apiUrl);
  }

}
