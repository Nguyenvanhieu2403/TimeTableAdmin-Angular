import { Component, OnInit } from '@angular/core';
import { ChangeInforService } from './ChangeInfor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ChangeInfor',
  templateUrl: './ChangeInfor.component.html',
  styleUrls: ['./ChangeInfor.component.css']
})
export class ChangeInforComponent implements OnInit {

  email: any = localStorage.getItem('email');
  token: any = localStorage.getItem('login');
  //Call API
  firstName: any;
  lastName: any;
  dateOfBirth: any;
  Gender: any;
  Avatar: any;

  constructor(private ChangeService: ChangeInforService, private toastr: ToastrService) { }

  ngOnInit() {
    this.ChangeService.
      GetInformation(this.email)
      .subscribe((res: any) => {
      if(res.id != null){
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.dateOfBirth = res.dateOfBirth;
        this.Gender = (res.gender == "1" ? 'Nam' : 'Nữ');
        this.Avatar = res.avata;
      }
      else {
        this.toastr.error('Lỗi trong quá trình gọi API');
      }
    });
  }

  Save() {
    this.ChangeService
      .Save(
        {
          firstName: this.firstName, 
          lastName: this.lastName, 
          email: "string",
          numberPhone: 0,
          gender: (this.Gender == "Nam" ? 1 : 0),
          dateOfBirth: this.dateOfBirth,
          avata: this.Avatar, 
          usedStated: 0,
          description: "",
        },
        this.token
      )
      .subscribe((res: any) => {
      if(res.statusCode == 200){
        this.toastr.success('Cập nhật thông tin thành công');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
      else {
        this.toastr.error('Cập nhật thông tin thất bại');
      }
    });
  }

}
