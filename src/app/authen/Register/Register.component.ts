import { Component, OnInit } from '@angular/core';
import { RegisterService } from './Register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  email: any;
  password: any;
  confirmPassWord: any;
  first__name: any;
  last__name: any;
  date: any;
  genderNam: any;
  phonenumber: any;
  type: any;
  avatar: any;

  constructor(private registerService: RegisterService,private router: Router, private toastr: ToastrService, private datePipe: DatePipe) { }

  ngOnInit() {
  }

  private parseDate(input: string): Date | null {
    const parts = input.split('/');
    if (parts.length !== 3) return null;
  
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Tháng trong JavaScript Date bắt đầu từ 0
    const year = parseInt(parts[2], 10);
  
    return new Date(year, month, day);
  }

  signin() {
    if(this.first__name === undefined || this.first__name === ''){
      this.toastr.error('Vui lòng nhập họ');
      return;
    }
    if(this.last__name === undefined || this.last__name === ''){
      this.toastr.error('Vui lòng nhập tên');
      return;
    }
    if(this.email === undefined || this.email === ''){
      this.toastr.error('Vui lòng nhập email');
      return;
    }
    if(this.phonenumber === undefined || this.phonenumber === ''){
      this.toastr.error('Vui lòng nhập số điện thoại');
      return;
    }
    if(this.password === undefined || this.password === ''){
      this.toastr.error('Vui lòng nhập mật khẩu');
      return;
    }
    if(this.confirmPassWord === undefined || this.confirmPassWord === ''){
      this.toastr.error('Vui lòng nhập lại mật khẩu');
      return;
    }
    if(this.date === undefined || this.date === ''){
      this.toastr.error('Vui lòng nhập ngày sinh');
      return;
    }
    if(this.genderNam === undefined || this.genderNam === ''){
      this.toastr.error('Vui lòng chọn giới tính');
      return;
    }
    if(this.type === undefined || this.type === ''){
      this.toastr.error('Vui lòng chọn loại tài khoản');
      return;
    }

    if(this.password !== this.confirmPassWord) {
      this.toastr.error('Mật khẩu không trùng khớp');
      return;
    }

    if(this.avatar === undefined || this.avatar === ''){
      this.avatar = (
        this.genderNam === 'Nam' ? 
        'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000'
        :"https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png"
      );
    }

    if(this.password === this.confirmPassWord) {
      this.registerService.register({
        firstName: this.first__name,
        lastName: this.last__name,
        email: this.email,
        phoneNumber: this.phonenumber,
        password: this.password,
        confirmPassword: this.confirmPassWord,
        typeAccount: this.type,
        gender: this.genderNam,
        dateOfBirth: this.date,
        avata: this.avatar
      }).subscribe((res: any) => {
        if(res.status === "Đăng ký thành công") {
          this.toastr.success('Đăng ký thành công');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Đăng ký thất bại');
        }
      });
    }
  }

}
