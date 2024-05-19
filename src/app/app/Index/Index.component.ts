import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Index',
  templateUrl: './Index.component.html',
  styleUrls: ['./Index.component.css']
})
export class IndexComponent implements OnInit {

  toShow:boolean=false;
  StyleInfor: any;
  click: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('hasReloaded')) {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }

  getInformation() {
    this.router.navigate(['/information']);
  }

  ShowchangInfor() {
    this.router.navigate(['/changeInfor']);
  }
  ShowchangPassword() {
    this.router.navigate(['/changePassWord']);
  }

  ShowLectureSchedule() {
    this.router.navigate(['/lectureSchedule']);
  }

  Show() {
    this.click = !this.click;
    if (this.click) {
      this.StyleInfor= "display: block;";
    }
    else {
      this.StyleInfor= "display: none;";
    }
  }

  Logout(){
    localStorage.removeItem("login");
    this.toShow=false;
  }  

}
