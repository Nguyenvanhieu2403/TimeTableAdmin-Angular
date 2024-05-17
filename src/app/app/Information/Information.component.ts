import { Component, OnInit } from '@angular/core';
import { InformationService } from './Information.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Information',
  templateUrl: './Information.component.html',
  styleUrls: ['./Information.component.css']
})
export class InformationComponent implements OnInit {

  email:any;
  //
  userName: any;
  passWord: any;
  fullName: any;
  dateOfBirth: any;
  Gender: any;
  emailFill: any;
  pipe: any;

  constructor(private inforService: InformationService, private toastr: ToastrService) { 
    this.email = localStorage.getItem('email');
    this.pipe = new DatePipe('en-US')
  }

  ngOnInit() {
    this.inforService.
      GetInformation(this.email)
      .subscribe((res: any) => {
      if(res.id != null){
        console.log(res);
        this.userName = res.userName;
        this.passWord = res.passWord;
        this.fullName = res.lastName + ' ' + res.firstName;
        this.dateOfBirth = res.dateOfBirth;
        this.Gender = (res.Gender == 1 ? 'Nam' : 'Nữ');
        this.emailFill = res.email;
      }
      else {
        this.toastr.error('Lỗi trong quá trình gọi API');
      }
    });
  }

}
