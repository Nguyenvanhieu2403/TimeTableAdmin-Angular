import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePassWordService } from './ChangePassWord.service';

@Component({
  selector: 'app-ChangePassWord',
  templateUrl: './ChangePassWord.component.html',
  styleUrls: ['./ChangePassWord.component.css']
})
export class ChangePassWordComponent implements OnInit {

  token: any = localStorage.getItem('login');
  typePassword: any = 'password';
  check: any;
  // Param Call API
  passWordOld: any;
  passWordNew: any;
  confirmPassWord: any;

  constructor(private changePassWordService: ChangePassWordService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  Save() {
    this.changePassWordService
      .Save(
        {
          passWordHas: this.passWordOld, 
          newPassword: this.passWordNew, 
          confirmNewPassword: this.confirmPassWord, 
        },
        this.token
      )
      .subscribe((res: any) => {
      if(res.statusCode == 200){
        this.toastr.success('Thay đổi mật khẩu thành công');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
      else {
        this.toastr.error('Thay đổi mật khẩu thất bại: '+ res.result);
      }
    });
  }

  showPassword() {
    if (this.check == 'true') {
     this.typePassword = 'text';
    } else  {
      this.typePassword = 'password';
    }
  }

}
