import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './Login.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  userName: any;
  passWord: any;
  typePassword: any;
  check: boolean=false;
  alert: any
  private storageSub= new Subject<string>();
  
  constructor( private _loginservice: LoginService, private router: Router, private toastr: ToastrService) { 
  }
  
  ngOnInit() {
    this.showPassword()
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  login() {
    this._loginservice
      .Login({email: this.userName, passWordHas: this.passWord})
      .subscribe((res: any) => {
          if (res.status == 'Thành công') {
            this.toastr.success('Đăng nhập thành công');
            localStorage.setItem("login",res.token);
            // Thực hiện các hành động khác sau khi đăng nhập thành công
            const namelogin = res.name;
            localStorage.setItem("fullname",namelogin);
            localStorage.setItem("email",res.email);
            localStorage.setItem("avata",res.avata);
            this.storageSub.next('login');
            if(res.status === "Thành công") {
                this.router.navigate(['/index']);
            }
          }
          else {
            this.toastr.error('Đăng nhập thất bại');
          
          }
      })
  };
  showPassword() {
    if (this.check == true) {
     this.typePassword = 'text';
    } else  {
      this.typePassword = 'password';
    }
  }

}
